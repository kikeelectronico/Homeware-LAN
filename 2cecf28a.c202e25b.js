(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{101:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return d}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),u=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),b=n,d=p["".concat(i,".").concat(b)]||p[b]||f[b]||o;return r?a.a.createElement(d,c(c({ref:t},s),{},{components:r})):a.a.createElement(d,c({ref:t},s))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<o;s++)i[s]=r[s];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"},76:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return i})),r.d(t,"metadata",(function(){return c})),r.d(t,"rightToc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(3),a=r(7),o=(r(0),r(101)),i={id:"renew-ssl-certificate",title:"Renew the SSL certificate - bare metal",sidebar_label:"SSL certificate"},c={unversionedId:"renew-ssl-certificate",id:"renew-ssl-certificate",isDocsHomePage:!1,title:"Renew the SSL certificate - bare metal",description:"Remember that the SSL certificate that you have installed will be revoked 3 months after creation. When this happen renew it running Certbot again:",source:"@site/docs/renew-ssl-certificate.md",slug:"/renew-ssl-certificate",permalink:"/Homeware-LAN/docs/renew-ssl-certificate",editUrl:"https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/docs/renew-ssl-certificate.md",version:"current",sidebar_label:"SSL certificate",sidebar:"someSidebar",previous:{title:"Change username or password",permalink:"/Homeware-LAN/docs/reset-user"},next:{title:"Understand the structure of directories",permalink:"/Homeware-LAN/docs/directories"}},l=[],s={rightToc:l};function u(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Remember that the SSL certificate that you have installed will be revoked 3 months after creation. When this happen renew it running Certbot again:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{}),"sudo certbot --nginx\n")),Object(o.b)("p",null,"Make sure that the 80 WAN port is forwarding to the 80 port of the Raspberry Pi."),Object(o.b)("p",null,"You can find the revoke date using your web browser:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Go to you Homeware panel."),Object(o.b)("li",{parentName:"ol"},"Click on the padlock that appear on the left side of the URL."),Object(o.b)("li",{parentName:"ol"},"Click on ",Object(o.b)("em",{parentName:"li"},"Certificate"),".")))}u.isMDXComponent=!0}}]);