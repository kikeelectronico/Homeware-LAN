"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[737],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return h}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),s=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=s(r),h=o,d=m["".concat(p,".").concat(h)]||m[h]||u[h]||a;return r?n.createElement(d,i(i({ref:t},l),{},{components:r})):n.createElement(d,i({ref:t},l))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8605:function(e,t,r){r.r(t),r.d(t,{assets:function(){return l},contentTitle:function(){return p},default:function(){return h},frontMatter:function(){return c},metadata:function(){return s},toc:function(){return u}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],c={id:"homegraphpy",title:"HomeGraph.py file",sidebar_label:"Back - homeGraph.py"},p=void 0,s={unversionedId:"homegraphpy",id:"homegraphpy",title:"HomeGraph.py file",description:"This file contains a class that do requests to Google HomeGraph when needed.",source:"@site/docs/homegraphpy.md",sourceDirName:".",slug:"/homegraphpy",permalink:"/Homeware-LAN/docs/homegraphpy",editUrl:"https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/docs/homegraphpy.md",tags:[],version:"current",frontMatter:{id:"homegraphpy",title:"HomeGraph.py file",sidebar_label:"Back - homeGraph.py"},sidebar:"someSidebar",previous:{title:"Back - commands.py",permalink:"/Homeware-LAN/docs/commandspy"},next:{title:"Back - homeware.py",permalink:"/Homeware-LAN/docs/homewarepy"}},l={},u=[{value:"requestSync",id:"requestsync",level:2},{value:"repostState",id:"repoststate",level:2}],m={toc:u};function h(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This file contains a class that do requests to Google HomeGraph when needed."),(0,a.kt)("p",null,"The methods can only be called from data.py file when something changes in the database in order to keep Google HomeGraph informed about the changes."),(0,a.kt)("h2",{id:"requestsync"},"requestSync"),(0,a.kt)("p",null,"This method is used to inform HomeGraph that a definition of a device has changed."),(0,a.kt)("h2",{id:"repoststate"},"repostState"),(0,a.kt)("p",null,"This method is used to inform HomeGraph that the status of a device has changed."))}h.isMDXComponent=!0}}]);