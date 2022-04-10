(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{106:function(e,t,a){"use strict";a.d(t,"a",(function(){return b})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function d(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},b=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var a=e.components,n=e.mdxType,i=e.originalType,o=e.parentName,l=d(e,["components","mdxType","originalType","parentName"]),b=p(a),u=n,m=b["".concat(o,".").concat(u)]||b[u]||s[u]||i;return a?r.a.createElement(m,c(c({ref:t},l),{},{components:a})):r.a.createElement(m,c({ref:t},l))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=a.length,o=new Array(i);o[0]=u;var c={};for(var d in t)hasOwnProperty.call(t,d)&&(c[d]=t[d]);c.originalType=e,c.mdxType="string"==typeof e?e:n,o[1]=c;for(var l=2;l<i;l++)o[l]=a[l];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"},69:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return d})),a.d(t,"rightToc",(function(){return l})),a.d(t,"default",(function(){return b}));var n=a(3),r=a(7),i=(a(0),a(106)),o=["components"],c={id:"connecting-hardware",title:"Connecting hardware to Homeware",sidebar_label:"Connect a device"},d={unversionedId:"connecting-hardware",id:"connecting-hardware",isDocsHomePage:!1,title:"Connecting hardware to Homeware",description:"Homeware LAN uses MQTT for communicate with your hardware devices. You can use any example and library that you want in order to make it works.",source:"@site/docs/connecting-hardware.md",slug:"/connecting-hardware",permalink:"/Homeware-LAN/docs/connecting-hardware",editUrl:"https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/docs/connecting-hardware.md",version:"current",sidebar_label:"Connect a device",sidebar:"someSidebar",previous:{title:"Create a device",permalink:"/Homeware-LAN/docs/create-device"},next:{title:"Change username or password",permalink:"/Homeware-LAN/docs/reset-user"}},l=[{value:"Homeware to hardware - receive data",id:"homeware-to-hardware---receive-data",children:[{value:"Main Topic",id:"main-topic",children:[]},{value:"Individual Topics",id:"individual-topics",children:[]}]},{value:"Hardware to Homeware - send data",id:"hardware-to-homeware---send-data",children:[{value:"Example",id:"example-2",children:[]}]},{value:"Hardware to Homeware - request data",id:"hardware-to-homeware---request-data",children:[]}],p={rightToc:l};function b(e){var t=e.components,a=Object(r.a)(e,o);return Object(i.b)("wrapper",Object(n.a)({},p,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Homeware LAN uses MQTT for communicate with your hardware devices. You can use any example and library that you want in order to make it works."),Object(i.b)("h1",{id:"connection-data"},"Connection data"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Host"),": It is the IP of your Raspberry Pi."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Port"),": 1883"),Object(i.b)("h1",{id:"topics"},"Topics"),Object(i.b)("h2",{id:"homeware-to-hardware---receive-data"},"Homeware to hardware - receive data"),Object(i.b)("p",null,"You can see all the device's topics at ",Object(i.b)("inlineCode",{parentName:"p"},"https://<your.domain.com>/devices/connecting/<device-id>/")),Object(i.b)("h3",{id:"main-topic"},"Main Topic"),Object(i.b)("p",null,"Each device has its own main topic that will be used by Homeware to send information to the device."),Object(i.b)("p",null,"The ",Object(i.b)("strong",{parentName:"p"},"main topic for each device")," is ",Object(i.b)("inlineCode",{parentName:"p"},"device/<device-id>")," where ",Object(i.b)("inlineCode",{parentName:"p"},"<device-id>")," is the unique id of each device."),Object(i.b)("p",null,"The data that Homeware will sent depends on the device type and is a JSON formatted string."),Object(i.b)("h4",{id:"example"},"Example"),Object(i.b)("p",null,"Imagine that we have a light in which both the On/Off status and the brightness can be controlled. Every time the status changes in Homeware, it will send something like:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'{"on":true,"brightness":80}\n')),Object(i.b)("h3",{id:"individual-topics"},"Individual Topics"),Object(i.b)("p",null,"Each device has individual topics for each param or command."),Object(i.b)("h4",{id:"example-1"},"Example"),Object(i.b)("p",null,"Imagine that we have a light in which the On/Off status can be controlled. Every time the ",Object(i.b)("inlineCode",{parentName:"p"},"on")," status changes in Homeware, it will send the new status to ",Object(i.b)("inlineCode",{parentName:"p"},"device/<device-id>/on"),"."),Object(i.b)("h2",{id:"hardware-to-homeware---send-data"},"Hardware to Homeware - send data"),Object(i.b)("p",null,"The hardware can send data back to Homeware sending the data to the topic ",Object(i.b)("inlineCode",{parentName:"p"},"device/control")," and using the next format:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'{"id":"<device-id>","param":"<param-to-change>","value":"<new-value-for-param>","intent":"<new-intent>"}\n')),Object(i.b)("h3",{id:"example-2"},"Example"),Object(i.b)("p",null,"Imagine that we have a smart bulb which ",Object(i.b)("inlineCode",{parentName:"p"},"<device-id>")," at Homeware is light001 and we want to change its brightness to 80%. We will send to ",Object(i.b)("inlineCode",{parentName:"p"},"device/control")," topic:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'{"id":"light001","param":"brightness","value":"80","intent":"<new-intent>"}\n')),Object(i.b)("p",null,"The last parameter that must be configured is the intent, it can be set to:"),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"execute")," -> Means that we only want to store the new value."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"rules")," -> Means that we want to store the new value and verify all rules. It could be interesting if we know that one or more rules uses the parameter that we are changing as a trigger for do another job."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"request")," -> Check ",Object(i.b)("a",{parentName:"p",href:"#hardware-to-homeware---request-data"},"Hardware to Homeware - request data"),"."),Object(i.b)("p",null,"The complete request can be something like:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'{"id":"light001","param":"brightness","value":80,"intent":"execute"}\n')),Object(i.b)("h2",{id:"hardware-to-homeware---request-data"},"Hardware to Homeware - request data"),Object(i.b)("p",null,"The hardware can request its information to Homeware at any time by sending a request to ",Object(i.b)("inlineCode",{parentName:"p"},"device/control")," topic and using ",Object(i.b)("inlineCode",{parentName:"p"},"request")," as intent."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre"},'{"id":"light001","param":"","value":"","intent":"request"}\n')))}b.isMDXComponent=!0}}]);