(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,t,n){e.exports=n(46)},44:function(e,t,n){},46:function(e,t,n){"use strict";n.r(t);n(28);var a=n(1),r=n(9),c=n(5),o=n(50),i=n(49),s=n(48),u=n(7),l=n(47);var h=n(18),d="http://localhost:3000/api";function m(){var e=this;return function(t,n){return c.b(e,void 0,void 0,function(){var e,a,r,o;return c.c(this,function(i){switch(i.label){case 0:if(e=n().locationsCache,a=e.locations,e.isFetching||a)return[3,4];t({type:"FetchTransactionsStart",reducer:function(e){return c.a({},e,{locationsCache:{isFetching:!0}})}}),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,h.get(d+"/locations")];case 2:return r=i.sent(),a=r.body,t(function(e){return{type:"FetchLocationsSuccess",reducer:function(t){return c.a({},t,{locationsCache:{isFetching:!1,locations:e}})}}}(a)),[3,4];case 3:return o=i.sent(),t((s=o,{type:"FetchLocationsFailure",reducer:function(e){return c.a({},e,{locationsCache:{isFetching:!1,error:s}})}})),[3,4];case 4:return[2]}var s})})}}var f=n(12);var p=Object(f.b)(function(e){return{cache:e.locationsCache}},function(e){var t=this;return{onInit:function(){return c.b(t,void 0,void 0,function(){return c.c(this,function(t){return[2,e(m())]})})}}})(function(e){var t=e.cache;(0,e.onInit)();var n=t.isFetching,r=t.locations;return r?a.createElement(u.b,null,a.createElement("h2",null,"Empresas(",r.length,")"),a.createElement("p",null,"Clique sobre uma linha para abrir as transa\xe7\xf5es da empresa desejada."),a.createElement(u.c,{style:{opacity:n?.5:1}},r.map(function(e,t){return a.createElement(u.d,{key:t},a.createElement(l.a,{to:"/transactions?companyLocation="+e.code},a.createElement(u.e,null,a.createElement(u.a,{md:"3"},e.email),a.createElement(u.a,{md:"3"},e.federalTaxId),a.createElement(u.a,{md:"3"},function(e){var t=e.address.cityName,n=e.address.state;return t?t+" - "+n:n}(e)),a.createElement(u.a,{md:"3"},e.address.phone))))}))):a.createElement("h2",null,"Carregando...")}),E=n(10),v=n(25);function b(e,t){return void 0===e&&(e={locationsCache:{isFetching:!1},transactionsCache:{isFetching:!1}}),t.reducer?t.reducer(e):e}var g,F=(void 0===g&&(g={locationsCache:{isFetching:!1},transactionsCache:{isFetching:!1}}),Object(E.c)(b,g,Object(E.a)(v.a)));n(44);r.render(a.createElement(function(){return a.createElement(f.a,c.a({},{store:F}),a.createElement(o.a,null,a.createElement("div",null,a.createElement(i.a,{exact:!0,path:"/",render:(e="/locations",function(){return a.createElement(s.a,{to:e})})}),a.createElement(i.a,{path:"/locations",component:p}))));var e},null),document.getElementById("root"))}},[[27,2,1]]]);
//# sourceMappingURL=main.44a0a44a.chunk.js.map