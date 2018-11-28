import reduxMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import reduxThunk, { ThunkDispatch } from 'redux-thunk';
import { State } from './State';
import { Action, fetchLocations } from './Actions';
import { reducer } from './reducer';

let storeCreator: MockStoreCreator<State, ThunkDispatch<State, null, Action>>;
let store: MockStoreEnhanced<State, ThunkDispatch<State, null, Action>>;

describe('Locations Store', () => {
  beforeAll(async () => {
    storeCreator = reduxMockStore([reduxThunk]);
  });

  describe('when cache is not present', () => {
    beforeEach(async () => {
      store = storeCreator({
        locationsCache: { isFetching: false },
        transactionsCache: { isFetching: false }
      });
    });

    it('should fetch locations', async () => {
      await store.dispatch(fetchLocations());
      let state = store.getState();
      const actions = store.getActions() as Action[];
      state = reducer(state, actions[0]);
      let cache = state.locationsCache;
      expect(cache.isFetching)
        .toBe(true);
      state = reducer(state, actions[1]);
      cache = state.locationsCache;
      expect(cache.isFetching)
        .toBe(false);
      expect(cache.locations!.length)
        .toBeGreaterThan(0);
    });
  });

  describe('when cache is present', () => {
    beforeEach(async () => {
      store = storeCreator({
        locationsCache: {
          isFetching: false,
          locations: [{
            companyId: '75106750-1ae4-4872-9d9b-562d94ea324f',
            code: '27227668000203',
            federalTaxId: '27.227.668/0002-03',
            taxRegime: 'realProfit',
            address: {
              cityCode: 3550308,
              cityName: 'São Paulo',
              state: 'SP'
            }
          }]
        },
        transactionsCache: { isFetching: false }
      });
    });

    it('should not fetch locations', async () => {
      await store.dispatch(fetchLocations());
      const actions = store.getActions() as Action[];
      expect(actions.length)
        .toBe(0);
    });
  });

  describe('when cache is fetching', () => {
    beforeEach(async () => {
      store = storeCreator({
        locationsCache: { isFetching: true },
        transactionsCache: { isFetching: false }
      });
    });

    it('should not fetch locations', async () => {
      await store.dispatch(fetchLocations());
      const actions = store.getActions() as Action[];
      expect(actions.length)
        .toBe(0);
    });
  });
});
