(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n(59)},57:function(e,t,n){},59:function(e,t,n){"use strict";n.r(t);n(34);var a=n(1),r=n(9),c=n(3),l=n(62),i=n(64),u=n(63),o=n(61),s=n(7),m=n(60);function h(e){if(e){var t=e.address.cityName,n=e.address.state;return t?t+" - "+n:n}return""}var E=n(21),d=n(28),p="http://localhost:3000/api";function f(){var e=this;return function(t,n){return c.b(e,void 0,void 0,function(){var e,a,r,l;return c.c(this,function(i){switch(i.label){case 0:if((e=n().locationsCache).isFetching||e.locations)return[3,4];t({type:"FetchTransactionsStart",reducer:function(e){return c.a({},e,{locationsCache:{isFetching:!0}})}}),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,E.get(p+"/locations")];case 2:return a=i.sent(),r=a.body,t(function(e){return{type:"FetchLocationsSuccess",reducer:function(t){return c.a({},t,{locationsCache:{isFetching:!1,locations:e}})}}}(r)),[3,4];case 3:return l=i.sent(),t((u=l,{type:"FetchLocationsFailure",reducer:function(e){return c.a({},e,{locationsCache:{isFetching:!1,error:u}})}})),[3,4];case 4:return[2]}var u})})}}function y(e){var t=this;return function(n,a){return c.b(t,void 0,void 0,function(){var t,r,l,i;return c.c(this,function(u){switch(u.label){case 0:if((t=a().transactionsCache).isFetching||t.transactions&&d.isEqual(t.query,e))return[3,4];n(function(e){return{type:"FetchTransactionsStart",reducer:function(t){return c.a({},t,{transactionsCache:{isFetching:!0,query:e}})}}}(e)),u.label=1;case 1:return u.trys.push([1,3,,4]),[4,E.get(p+"/transactions").query(e)];case 2:return r=u.sent(),l=r.body,n(function(e){return{type:"FetchTransactionsSuccess",reducer:function(t){return c.a({},t,{transactionsCache:{query:t.transactionsCache.query,isFetching:!1,transactions:e}})}}}(l)),[3,4];case 3:return i=u.sent(),n((o=i,{type:"FetchTransactionsFailure",reducer:function(e){return c.a({},e,{transactionsCache:{isFetching:!1,error:o}})}})),[3,4];case 4:return[2]}var o})})}}var v=n(10);var g=Object(v.b)(function(e){return{cache:e.locationsCache}},function(e){var t=this;return{onInit:function(){return c.b(t,void 0,void 0,function(){return c.c(this,function(t){return[2,e(f())]})})}}})(function(e){var t=e.cache;(0,e.onInit)();var n=t.isFetching,r=t.locations;return r?a.createElement(s.b,null,a.createElement("h2",null,"Empresas(",r.length,")"),a.createElement("p",null,"Clique sobre uma linha para abrir as transa\xe7\xf5es da empresa desejada."),a.createElement(s.c,{style:{opacity:n?.5:1}},r.map(function(e,t){return a.createElement(s.d,{key:t},a.createElement(m.a,{to:"/transactions?companyLocation="+e.code},a.createElement(s.e,null,a.createElement(s.a,{md:"3"},e.email),a.createElement(s.a,{md:"3"},e.federalTaxId),a.createElement(s.a,{md:"3"},h(e)),a.createElement(s.a,{md:"3"},e.address.phone))))}))):a.createElement("h2",null,"Carregando...")}),b=n(11),C=n(31);function F(e,t){return void 0===e&&(e={locationsCache:{isFetching:!1},transactionsCache:{isFetching:!1}}),t.reducer?t.reducer(e):e}var T=n(16),x=n.n(T),I=n(32);function S(e){var t=e.name,n=e.value,r=e.currency,c=void 0===r?"BRL":r;return a.createElement("span",{style:{textAlign:"left"}},t,a.createElement("span",{style:{float:"right"}},n.toLocaleString("pt-BR",{style:"currency",currency:c})))}function q(e){var t=e.title,n=e.entity;return a.createElement("div",null,a.createElement("h4",null,t),n&&a.createElement("div",null,n.federalTaxId,a.createElement("br",null),h(n),a.createElement("br",null),n.taxRegime&&a.createElement("span",null,n.taxRegime,a.createElement("br",null)),n.type&&a.createElement("span",null,n.type,a.createElement("br",null)),n.suframa&&"Suframa: "+n.suframa))}function w(e){var t=e.transaction,n=t.header,r=n.currency,l=t.calculatedTaxSummary;return a.createElement(s.e,null,a.createElement(x.a,{lg:"4"},a.createElement("h3",null,n.transactionType),a.createElement(q,{title:"Empresa",entity:n.location})),a.createElement(x.a,{lg:"4"},a.createElement("p",null,I(n.transactionDate).format("DD/MM/YYYY")),a.createElement(q,{title:"Contraparte",entity:n.entity})),a.createElement(x.a,{lg:"4"},a.createElement("p",null,"C\xf3digo: ",n.documentCode),a.createElement("h4",null,"Resumo"),a.createElement(S,c.a({},{name:"Subtotal:",value:l.subtotal,currency:r})),a.createElement("br",null),a.createElement(S,c.a({},{name:"IEC:",value:l.taxByType.iec.tax,currency:r})),a.createElement("br",null),a.createElement(S,c.a({},{name:"IST:",value:l.taxByType.ist.tax,currency:r})),a.createElement("br",null),a.createElement(S,c.a({},{name:"ISC:",value:l.taxByType.isc.tax,currency:r})),a.createElement("br",null),a.createElement("hr",null),a.createElement(S,c.a({},{name:"TOTAL GERAL:",value:l.grandTotal,currency:r}))))}var L=n(23);var j,B=Object(v.b)(function(e,t){var n=e.transactionsCache,a=t.location.search,r=L.parse(a);return{cache:n,page:Number(r.page||"1")}},function(e,t){var n=this,a=t.location.search,r=L.parse(a);return delete r.page,{onInit:function(){return c.b(n,void 0,void 0,function(){return c.c(this,function(t){return[2,e(y(r))]})})}}})(function(e){var t=e.page,n=e.cache;(0,e.onInit)();var r=n.isFetching,l=n.transactions;if(l){var i=10*(t-1),u=Math.min(10*t,l.length);return a.createElement(s.b,null,a.createElement("h2",null,"Transa\xe7\xf5es ",i+1," a ",u," de ",l.length),a.createElement("p",null,"Clique sobre uma linha para abrir a transa\xe7\xe3o desejada."),a.createElement(s.c,{style:{opacity:r?.5:1}},l.slice(i,u).map(function(e,t){return a.createElement(s.d,{key:t},a.createElement(m.a,{to:"/transactions?companyTransaction="+e},a.createElement(w,c.a({},{transaction:e}))))})))}return a.createElement("h2",null,"Carregando...")}),R=(void 0===j&&(j={locationsCache:{isFetching:!1},transactionsCache:{isFetching:!1}}),Object(b.c)(F,j,Object(b.a)(C.a)));n(57);r.render(a.createElement(function(){return a.createElement(v.a,c.a({},{store:R}),a.createElement(l.a,null,a.createElement(i.a,null,a.createElement(u.a,{exact:!0,path:"/",render:(e="/locations",function(){return a.createElement(o.a,{to:e})})}),a.createElement(u.a,{path:"/locations",component:g}),a.createElement(u.a,{path:"/transactions",component:B}))));var e},null),document.getElementById("root"))}},[[33,2,1]]]);
//# sourceMappingURL=main.2bb052fc.chunk.js.map