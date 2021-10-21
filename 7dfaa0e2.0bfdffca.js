(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{101:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return m}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var b=o.a.createContext({}),s=function(e){var t=o.a.useContext(b),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=s(e.components);return o.a.createElement(b.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,b=i(e,["components","mdxType","originalType","parentName"]),p=s(r),d=n,m=p["".concat(c,".").concat(d)]||p[d]||u[d]||a;return r?o.a.createElement(m,l(l({ref:t},b),{},{components:r})):o.a.createElement(m,l({ref:t},b))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,c=new Array(a);c[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,c[1]=l;for(var b=2;b<a;b++)c[b]=r[b];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},85:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return l})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return s}));var n=r(3),o=r(7),a=(r(0),r(101)),c={id:"upgrade-to-v100",title:"Upgrade to v1.0.0",sidebar_label:"Upgrade to v1.0.0"},l={unversionedId:"upgrade-to-v100",id:"upgrade-to-v100",isDocsHomePage:!1,title:"Upgrade to v1.0.0",description:"Please, backup your system. Use the backup file option.",source:"@site/docs/upgrade-to-v100.md",slug:"/upgrade-to-v100",permalink:"/Homeware-LAN/docs/upgrade-to-v100",editUrl:"https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/docs/upgrade-to-v100.md",version:"current",sidebar_label:"Upgrade to v1.0.0"},i=[{value:"Delete the cron jobs",id:"delete-the-cron-jobs",children:[]},{value:"Delete the Redis service",id:"delete-the-redis-service",children:[]},{value:"Install the new version",id:"install-the-new-version",children:[]}],b={rightToc:i};function s(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},b,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Please, ",Object(a.b)("strong",{parentName:"p"},"backup your system"),". Use the backup file option."),Object(a.b)("h1",{id:"process"},"Process"),Object(a.b)("p",null,"You shouldn't upgrade to v1.0 from an older versi\xf3n. You ",Object(a.b)("strong",{parentName:"p"},"MUST INSTALL THE NEW VERSION")," and restore your backup file after installation."),Object(a.b)("h1",{id:"installation-process"},"Installation process"),Object(a.b)("p",null,"First you need to delete some old files and configurations"),Object(a.b)("h2",{id:"delete-the-cron-jobs"},"Delete the cron jobs"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Run."),Object(a.b)("pre",{parentName:"li"},Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"sudo crontab -e\n"))),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Delete the following lines."))),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"@reboot sudo systemctl start homeware")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"@reboot sudo systemctl start homewareMQTT")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"@reboot sudo systemctl start homewareTask")),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"@reboot sudo systemctl start homewareRedis")),Object(a.b)("ol",{start:3},Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Save using ",Object(a.b)("inlineCode",{parentName:"p"},"Ctrl + O"),".")),Object(a.b)("li",{parentName:"ol"},Object(a.b)("p",{parentName:"li"},"Exit using ",Object(a.b)("inlineCode",{parentName:"p"},"Ctrl + X"),"."))),Object(a.b)("h2",{id:"delete-the-redis-service"},"Delete the Redis service"),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Run.")),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"sudo rm /lib/systemd/system/homewareRedis.service\n")),Object(a.b)("h2",{id:"install-the-new-version"},"Install the new version"),Object(a.b)("p",null,Object(a.b)("a",Object(n.a)({parentName:"p"},{href:"https://kikeelectronico.github.io/Homeware-LAN/docs/install"}),"https://kikeelectronico.github.io/Homeware-LAN/docs/install")),Object(a.b)("p",null,"Do not forget to clean your web browser's cache."))}s.isMDXComponent=!0}}]);