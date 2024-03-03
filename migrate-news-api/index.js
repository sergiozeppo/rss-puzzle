(()=>{"use strict";var e={96:(e,n,t)=>{t.d(n,{c:()=>a});var r=t(500),o=t.n(r),s=t(312),i=t.n(s)()(o());i.push([e.id,".news__item {\n    display: flex;\n    flex-direction: column;\n    margin: 1rem auto;\n    margin-bottom: 1.6%;\n    background: #fff;\n    color: #333;\n    line-height: 1.4;\n    font-family: Arial, sans-serif;\n    border-radius: 5px;\n    overflow: hidden;\n}\n\n.news__item:hover .news__meta-photo {\n    transform: scale(1.3) rotate(3deg);\n}\n\n.news__item .news__meta {\n    position: relative;\n    height: 200px;\n}\n\n.news__item .news__meta-photo {\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    background-size: cover;\n    background-position: center;\n    transition: transform 0.2s;\n}\n\n.news__item .news__meta-details,\n.news__item .news__meta-details ul {\n    margin: auto;\n    padding: 0;\n    list-style: none;\n}\n\n.news__item .news__meta-details {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: -120%;\n    margin: auto;\n    transition: left 0.2s;\n    background: rgba(0, 0, 0, 0.6);\n    color: #fff;\n    padding: 10px;\n    width: 100%;\n    font-size: 0.9rem;\n}\n\n.news__item .news__description {\n    padding: 1rem;\n    background: #fff;\n    position: relative;\n    z-index: 1;\n}\n\n.news__item .news__description h2 {\n    line-height: 1;\n    margin: 0;\n    font-size: 1.7rem;\n}\n\n.news__item .news__description h3 {\n    font-size: 1rem;\n    font-weight: 300;\n    text-transform: uppercase;\n    color: #a2a2a2;\n    margin-top: 5px;\n}\n\n.news__item .news__description .news__read-more {\n    text-align: right;\n}\n\n.news__item .news__description .news__read-more a {\n    color: #5ad67d;\n    display: inline-block;\n    position: relative;\n    text-decoration: none;\n    font-weight: 800;\n}\n\n.news__item .news__description .news__read-more a:after {\n    content: '→';\n    margin-left: -10px;\n    opacity: 0;\n    vertical-align: middle;\n    transition: margin 0.3s, opacity 0.3s;\n}\n\n.news__item .news__description .news__read-more a:hover:after {\n    margin-left: 5px;\n    opacity: 1;\n}\n\n.news__item p {\n    margin: 1rem 0 0;\n}\n\n.news__item p:first-of-type {\n    margin-top: 1.25rem;\n    position: relative;\n}\n\n.news__item p:first-of-type:before {\n    content: '';\n    position: absolute;\n    height: 5px;\n    background: #5ad67d;\n    width: 35px;\n    top: -0.75rem;\n    border-radius: 3px;\n}\n\n.news__item:hover .news__meta-details {\n    left: 0%;\n}\n\n@media (min-width: 640px) {\n    .news__item {\n        flex-direction: row;\n        max-width: 700px;\n    }\n\n    .news__item .news__meta {\n        flex-basis: 40%;\n        height: auto;\n    }\n\n    .news__item .news__description {\n        flex-basis: 60%;\n    }\n\n    .news__item .news__description:before {\n        -webkit-transform: skewX(-3deg);\n        transform: skewX(-3deg);\n        content: '';\n        background: #fff;\n        width: 30px;\n        position: absolute;\n        left: -10px;\n        top: 0;\n        bottom: 0;\n        z-index: -1;\n    }\n\n    .news__item.alt {\n        flex-direction: row-reverse;\n    }\n\n    .news__item.alt .news__description:before {\n        left: inherit;\n        right: -10px;\n        -webkit-transform: skew(3deg);\n        transform: skew(3deg);\n    }\n\n    .news__item.alt .news__meta-details {\n        padding-left: 25px;\n    }\n}\n",""]);const a=i},376:(e,n,t)=>{t.d(n,{c:()=>a});var r=t(500),o=t.n(r),s=t(312),i=t.n(s)()(o());i.push([e.id,".sources {\n  display: flex;\n  flex-wrap: nowrap;\n  width: 100%;\n  height: 120px;\n  overflow: auto;\n  align-items: center;\n  font:\n    300 1em 'Fira Sans',\n    sans-serif;\n}\n\n.source__item {\n  background: none;\n  border: 2px solid #f3e2c3;\n  font: inherit;\n  line-height: 1;\n  margin: 0.5em;\n  padding: 1em 2em;\n  color: #f3e2c3;\n  transition: 0.25s;\n  cursor: pointer;\n}\n\n.source__item:hover,\n.source__item:focus {\n  border-color: #3fcc59;\n  color: #69db7e;\n  box-shadow: 0 0.5em 0.5em -0.4em #3fcc59;\n  transform: translateY(-0.25em);\n}\n\n.source__item-name {\n  font-weight: 400;\n  white-space: nowrap;\n}\n",""]);const a=i},308:(e,n,t)=>{t.d(n,{c:()=>m});var r=t(500),o=t.n(r),s=t(312),i=t.n(s),a=t(536),c=t.n(a),l=new URL(t(172),t.b),u=new URL(t(95),t.b),d=i()(o()),p=c()(l),f=c()(u);d.push([e.id,`body {\n  color: #fff;\n  background: #17181c;\n  font-family: sans-serif;\n}\n\nheader {\n  padding: 10px 30px;\n  text-align: center;\n  color: #f3e2c3;\n}\n\nheader h1 {\n  font-size: 40px;\n  font-weight: 800;\n}\n\nfooter {\n  display: flex;\n  height: 100px;\n  padding: 15px 60px 15px 20px;\n  align-items: flex-end;\n  gap: 20px;\n  justify-content: space-between;\n}\nsvg {\n  stroke: none;\n  fill: #fff;\n  fill-opacity: 1;\n}\n.footer-link {\n  display: flex;\n}\n.footer-icon {\n  display: block;\n  height: 30px;\n}\n.footer-icon-github {\n  width: 30px;\n  background: center center no-repeat url(${p});\n}\n.footer-icon-rsschool {\n  width: 90px;\n  background: center center no-repeat url(${f});\n}\nfooter .copyright {\n  font-size: 14px;\n  color: #f3e2c3;\n  text-align: center;\n}\nfooter .copyright a {\n  color: #f3e2c3;\n}\nfooter .copyright a:hover {\n  color: #555;\n}\nfooter .copyright:before {\n  content: '©';\n}\n`,""]);const m=d},312:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,s){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(r)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var u=[].concat(e[l]);r&&i[u[0]]||(void 0!==s&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=s),t&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=t):u[2]=t),o&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=o):u[4]="".concat(o)),n.push(u))}},n}},536:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},500:e=>{e.exports=function(e){return e[1]}},596:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var s={},i=[],a=0;a<e.length;a++){var c=e[a],l=r.base?c[0]+r.base:c[0],u=s[l]||0,d="".concat(l," ").concat(u);s[l]=u+1;var p=t(d),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var m=o(f,r);r.byIndex=a,n.splice(a,0,{identifier:d,updater:m,references:1})}i.push(d)}return i}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var s=r(e=e||[],o=o||{});return function(e){e=e||[];for(var i=0;i<s.length;i++){var a=t(s[i]);n[a].references--}for(var c=r(e,o),l=0;l<s.length;l++){var u=t(s[l]);0===n[u].references&&(n[u].updater(),n.splice(u,1))}s=c}}},176:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},808:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},120:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},520:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var s=t.sourceMap;s&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},936:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},172:(e,n,t)=>{e.exports=t.p+"4288ba6847f43e7a0f8e.svg"},95:(e,n,t)=>{e.exports=t.p+"f373d97ad3238fe1b88e.svg"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var s=n[r]={id:r,exports:{}};return e[r](s,s.exports,t),s.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!e;)e=r[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t.nc=void 0,(()=>{var e,n,r;function o(e){if(!e)throw new Error(`${e} is not defined`)}!function(e){e[e.ar=0]="ar",e[e.de=1]="de",e[e.en=2]="en",e[e.es=3]="es",e[e.fr=4]="fr",e[e.he=5]="he",e[e.it=6]="it",e[e.nl=7]="nl",e[e.no=8]="no",e[e.pt=9]="pt",e[e.ru=10]="ru",e[e.sv=11]="sv",e[e.ud=12]="ud",e[e.zh=13]="zh"}(e||(e={})),function(e){e[e.ae=0]="ae",e[e.ar=1]="ar",e[e.at=2]="at",e[e.au=3]="au",e[e.be=4]="be",e[e.bg=5]="bg",e[e.br=6]="br",e[e.ca=7]="ca",e[e.ch=8]="ch",e[e.cn=9]="cn",e[e.co=10]="co",e[e.cu=11]="cu",e[e.cz=12]="cz",e[e.de=13]="de",e[e.eg=14]="eg",e[e.fr=15]="fr",e[e.gb=16]="gb",e[e.gr=17]="gr",e[e.hk=18]="hk",e[e.hu=19]="hu",e[e.id=20]="id",e[e.ie=21]="ie",e[e.il=22]="il",e[e.in=23]="in",e[e.it=24]="it",e[e.jp=25]="jp",e[e.kr=26]="kr",e[e.lt=27]="lt",e[e.lv=28]="lv",e[e.ma=29]="ma",e[e.mx=30]="mx",e[e.my=31]="my",e[e.ng=32]="ng",e[e.nl=33]="nl",e[e.no=34]="no",e[e.nz=35]="nz",e[e.ph=36]="ph",e[e.pl=37]="pl",e[e.pt=38]="pt",e[e.ro=39]="ro",e[e.rs=40]="rs",e[e.ru=41]="ru",e[e.sa=42]="sa",e[e.se=43]="se",e[e.sg=44]="sg",e[e.si=45]="si",e[e.sk=46]="sk",e[e.th=47]="th",e[e.tr=48]="tr",e[e.tw=49]="tw",e[e.ua=50]="ua",e[e.us=51]="us",e[e.ve=52]="ve",e[e.za=53]="za"}(n||(n={})),function(e){e.ok="ok",e.error="error"}(r||(r={}));const s=class{constructor(e,n){this.baseLink=e,this.options=n}getResp({endpoint:e,options:n={}},t=(()=>{console.error("No callback for GET response")})){this.load("GET",e,t,n)}errorHandler(e){if(!e.ok)throw 401!==e.status&&404!==e.status||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return e}makeUrl(e,n){const t=Object.assign(Object.assign({},this.options),e);let r=`${this.baseLink}${n}?`;return Object.keys(t).forEach((e=>{r+=`${e}=${t[e]}&`})),r.slice(0,-1)}load(e,n,t,r={}){fetch(this.makeUrl(r,n),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>t(e))).catch((e=>console.error(e)))}},i=class extends s{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"4505a548e68740fb97bd42f3e7283e0e"})}},a=class extends i{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,n){o(e.target),o(e.currentTarget);let{target:t}=e;console.log(t);const r=e.currentTarget;for(console.log(r);t!==r;){if(t instanceof HTMLElement&&t.classList.contains("source__item")){const e=t.getAttribute("data-source-id");return console.log(e),void(r instanceof HTMLElement&&r.getAttribute("data-source")!==e&&(r.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},n)))}t instanceof HTMLElement&&(t=t.parentNode,console.log(t))}}};var c=t(596),l=t.n(c),u=t(520),d=t.n(u),p=t(176),f=t.n(p),m=t(120),h=t.n(m),g=t(808),w=t.n(g),_=t(936),b=t.n(_),v=t(96),x={};x.styleTagTransform=b(),x.setAttributes=h(),x.insert=f().bind(null,"head"),x.domAPI=d(),x.insertStyleElement=w(),l()(v.c,x),v.c&&v.c.locals&&v.c.locals;const y=class{draw(e){const n=e.length>=10?e.filter(((e,n)=>n<10)):e,t=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");n.forEach(((e,n)=>{const o=r.content.cloneNode(!0);if(n%2){const e=o.querySelector(".news__item");e&&e.classList.add("alt")}const s=o.querySelector(".news__meta-photo");s&&(s.style.backgroundImage=`url(${e.urlToImage||"img/placeholder.png"})`);const i=o.querySelector(".news__meta-author");i&&(i.textContent=e.author||e.source.name);const a=o.querySelector(".news__meta-date");a&&(a.textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"));const c=o.querySelector(".news__description-title");c&&(c.textContent=e.title);const l=o.querySelector(".news__description-source");l&&(l.textContent=e.source.name);const u=o.querySelector(".news__description-content");u&&(u.textContent=e.description);const d=o.querySelector(".news__read-more a");d&&d.setAttribute("href",e.url),t.append(o)}));const o=document.querySelector(".news");o.innerHTML="",o.appendChild(t)}};var k=t(376),S={};S.styleTagTransform=b(),S.setAttributes=h(),S.insert=f().bind(null,"head"),S.domAPI=d(),S.insertStyleElement=w(),l()(k.c,S),k.c&&k.c.locals&&k.c.locals;const T=class{draw(e){const n=document.createDocumentFragment(),t=document.querySelector("#sourceItemTemp");t&&e.forEach((e=>{const r=t.content.cloneNode(!0),o=r.querySelector(".source__item-name");o&&(o.textContent=e.name);const s=r.querySelector(".source__item");s&&e.id&&s.setAttribute("data-source-id",e.id),n.append(r)}));const r=document.querySelector(".sources");r&&r.append(n)}};class E{constructor(){this.news=new y,this.sources=new T}drawNews(e){const n=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];console.log(n),this.news.draw(n)}drawSources(e){const n=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];n&&this.sources&&this.sources.draw(n)}}var A=t(308),q={};q.styleTagTransform=b(),q.setAttributes=h(),q.insert=f().bind(null,"head"),q.domAPI=d(),q.insertStyleElement=w(),l()(A.c,q),A.c&&A.c.locals&&A.c.locals,(new class{constructor(){this.controller=new a,this.view=new E}start(){const e=document.querySelector(".sources");console.log(e),e&&e.addEventListener("click",(e=>this.controller.getNews(e,(e=>{e&&this.view.drawNews(e)})))),this.controller.getSources((e=>{e&&this.view.drawSources(e)}))}}).start()})()})();