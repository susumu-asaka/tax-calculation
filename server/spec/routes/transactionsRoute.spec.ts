import { Model, Document } from 'express-cassandra';
import express from 'express';
import * as http from 'http';
import httpStatus from 'http-status';
import * as superagent from 'superagent';
import { FakeLogger } from '../FakeLogger';
import { TransactionDoc, Transaction } from '../../models/Transaction';
import { LocationDoc } from '../../models/Entity';
import { ItemDoc } from '../../models/Item';
import { getModelInstances } from '../../getModelInstances';
import { getTransactionsRouter } from '../../routes/getTransactionsRouter';
import { locations, items, transactions } from '../testDB';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { HttpError } from '../../httpErrors';
import { getErrorHandler } from '../../routes/getErrorHandler';

const URL_ROOT = 'http://localhost:3000';
let server: http.Server;
let fakeLogger: FakeLogger;
let transactionModel: Model<TransactionDoc>;
let locationModel: Model<LocationDoc>;
let itemModel: Model<ItemDoc>;

async function create(model: Model<Document>, values: any[]): Promise<void> {
  for (const value of values) {
    const document = new model(value);
    await document.saveAsync();
  }
}

describe('Transactions route', () => {
  beforeAll(async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    const modelInstances = await getModelInstances();
    transactionModel = modelInstances['Transaction'] as Model<TransactionDoc>;
    locationModel = modelInstances['Location'] as Model<LocationDoc>;
    itemModel = modelInstances['Item'] as Model<ItemDoc>;
    app.use(
      '/transactions',
      getTransactionsRouter(transactionModel, locationModel, itemModel)
    );
    fakeLogger = new FakeLogger();
    app.use(getErrorHandler(fakeLogger));
    server = app.listen(3000);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    await transactionModel.truncateAsync();
    await locationModel.truncateAsync();
    await itemModel.truncateAsync();
    await create(locationModel, locations);
    await create(itemModel, items);

    for (const transaction of transactions) {
      const transactionDB = { ...transaction, ...transaction.header };
      delete transactionDB.header;
      const transactionDoc = new transactionModel(transactionDB);
      await transactionDoc.saveAsync();
    }
  });

  it('should complete and save transaction', async () => {
    const given: Transaction = {
      header: {
        documentCode: '123456',
        transactionType: 'Sale',
        transactionDate: '2018-11-25',
        companyLocation: '27227668000122',
        entity: {
          type: 'cityGovernment',
          address: { cityName: 'São Paulo', state: 'SP' }
        }
      },
      lines: [
        {
          numberOfItems: 2,
          itemPrice: 45,
          otherCostAmount: 10,
          lineDiscount: 10,
          itemCode: 'VENTILADOR-DIGITAL-001'
        }
      ]
    };
    const url = `${URL_ROOT}/transactions`;
    const res = await superagent.post(url)
      .send(given);
    expect(res.status)
      .toBe(httpStatus.OK);
    const response = res.body as Transaction;
    expect(response.calculatedTaxSummary.totalTax)
      .toBe(12.88);
    const transactionDocument = await transactionModel.findOneAsync(
      {
        companyLocation: '27227668000122',
        transactionDate: '2018-11-25',
        documentCode: '123456'
      },
      { raw: true }
    );
    expect(transactionDocument.calculatedTaxSummary.totalTax)
      .toBe(12.88);
  });

  it('should raise BAD_REQUEST when no transaction specified', async () => {
    fakeLogger.clearErrorLog();
    await (async () => {
      try {
        await superagent.post(`${URL_ROOT}/transactions`);
        fail('No transaction, but error not caught.');
      } catch (err) {
        // Error should have been logged on server side
        const lastError = fakeLogger.lastError;
        expect(lastError.message)
          .toBe('No transaction specified.');
        // Error should have been received on client side
        const error = (err as superagent.ResponseError).response.body as
          HttpError;
        expect(error.message)
          .toBe('No transaction specified.');
      }
    })();
  });

  it('should raise BAD_REQUEST when transaction is invalid', async () => {
    const given: Transaction = {
      header: {
        transactionType: 'Purchase',
        companyLocation: '27227668000122',
        // entity (emitter) taxRegime is undefined: transaction invalid
        entity: {
          address: { cityName: 'Jundiaí', state: 'SP' }
        }
      },
      lines: [
        {
          numberOfItems: 2,
          itemPrice: 45,
          otherCostAmount: 10,
          lineDiscount: 10,
          itemCode: 'VENTILADOR-DIGITAL-001'
        }
      ]
    };
    fakeLogger.clearErrorLog();
    await (async () => {
      try {
        await superagent.post(`${URL_ROOT}/transactions`)
          .send(given);
        fail('Invalid transaction, but error not caught.');
      } catch (err) {
        // Error should have been logged on server side
        const lastError = fakeLogger.lastError;
        expect(lastError.message)
          .toBe('Invalid Tax Regime.');
        // Error should have been received on client side
        const error = (err as superagent.ResponseError).response.body as
          HttpError;
        expect(error.message)
          .toBe('Invalid Tax Regime.');
      }
    })();
  });

  it('should retrieve transaction by location.code', async () => {
    const locationCode = '27227668000122';
    const res = await superagent.get(
      `${URL_ROOT}/transactions?companyLocation=${locationCode}`
    );
    expect(res.status)
      .toBe(httpStatus.OK);
    const actual = res.body as Transaction[];
    const expected = transactions.filter(
      transaction => transaction.header.companyLocation === locationCode
    );
    expected.sort(
      (a, b) => -a.header.transactionDate.localeCompare(b.header.transactionDate)
    );
    expect(actual.length)
      .toBe(expected.length);
    for (let i = 0; i < actual.length; i += 1) {
      expect(actual[i].header.documentCode)
        .toBe(expected[i].header.documentCode);
    }
  });
});
