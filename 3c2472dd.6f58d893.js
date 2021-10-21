(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{102:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return p}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),d=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=d(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},u=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,s=m(e,["components","mdxType","originalType","parentName"]),l=d(n),u=a,p=l["".concat(c,".").concat(u)]||l[u]||b[u]||r;return n?o.a.createElement(p,i(i({ref:t},s),{},{components:n})):o.a.createElement(p,i({ref:t},s))}));function p(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,c=new Array(r);c[0]=u;var i={};for(var m in t)hasOwnProperty.call(t,m)&&(i[m]=t[m]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var s=2;s<r;s++)c[s]=n[s];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},77:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return m})),n.d(t,"default",(function(){return d}));var a=n(3),o=n(7),r=(n(0),n(102)),c={id:"commandspy",title:"Commands.py file",sidebar_label:"Back - commands.py"},i={unversionedId:"commandspy",id:"commandspy",isDocsHomePage:!1,title:"Commands.py file",description:"Introduction to devices and commands",source:"@site/docs/commands.md",slug:"/commandspy",permalink:"/Homeware-LAN/docs/commandspy",editUrl:"https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/docs/commands.md",version:"current",sidebar_label:"Back - commands.py",sidebar:"someSidebar",previous:{title:"Data.py file",permalink:"/Homeware-LAN/docs/datapy"}},m=[{value:"Introduction to devices and commands",id:"introduction-to-devices-and-commands",children:[{value:"In Homeware",id:"in-homeware",children:[]},{value:"In Google Smarthome",id:"in-google-smarthome",children:[]},{value:"Processing a Google request",id:"processing-a-google-request",children:[]}]},{value:"Attributes",id:"attributes",children:[{value:"Device",id:"device",children:[]},{value:"Params",id:"params",children:[]}]},{value:"Auxiliar Methods",id:"auxiliar-methods",children:[{value:"saveAndSend",id:"saveandsend",children:[]},{value:"sendCommand",id:"sendcommand",children:[]},{value:"sendDobleCommand",id:"senddoblecommand",children:[]}]}],s={rightToc:m};function d(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"introduction-to-devices-and-commands"},"Introduction to devices and commands"),Object(r.b)("h3",{id:"in-homeware"},"In Homeware"),Object(r.b)("p",null,"In Homeware a device has a definition object and a status object. In example:"),Object(r.b)("h4",{id:"definition"},"Definition"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),'{\n  "id": "light001",\n  "name": {\n    "defaultNames": [\n      "Lamp",\n      "My lamp"\n    ],\n    "nicknames": [\n      "Lamp",\n      "My lamp"\n    ],\n    "name": "Lamp"\n  },\n  "attributes": {\n    "commandOnlyOnOff": false,\n    "queryOnlyOnOff": false\n  },\n  "traits": [\n    "action.devices.traits.OnOff"\n  ],\n  "type": "action.devices.types.LIGHT",\n  "deviceInfo": {\n    "hwVersion": "2.0",\n    "manufacturer": "Homeware-LAN Inc.",\n    "model": "Homeware-LAN awesome lamp",\n    "swVersion": "2.0"\n  }\n}\n')),Object(r.b)("h4",{id:"status"},"Status"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),'{\n  "online": true,\n  "on": false\n}\n')),Object(r.b)("h3",{id:"in-google-smarthome"},"In Google Smarthome"),Object(r.b)("p",null,"In Google Smarthome what a device can do its defined by its traits. For example, a ",Object(r.b)("a",{href:"https://developers.google.com/assistant/smarthome/guides/light"},"lamp")," needs the following traits in order to work:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"action.devices.traits.OnOff")),Object(r.b)("p",null,"And can have the following traits as optionals:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"action.devices.traits.ColorSetting"),Object(r.b)("li",{parentName:"ul"},"action.devices.traits.Brightness")),Object(r.b)("p",null,"Each trait has attributes, status and commands. The attributes can be seen in the Homeware's definition object. The status can be seen in the Homeware's status object and is composed by params."),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"on")," param in the lamp status indicates in the lamp is turned on."),Object(r.b)("p",null,"When a param must be changed, Google sends to Homeware a request. This request contains the params that must be updated organized in ",Object(r.b)("em",{parentName:"p"},"commands"),". In example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),'{\n  "command": "action.devices.commands.OnOff",\n  "params": {\n    "on": true\n  }\n}\n')),Object(r.b)("h3",{id:"processing-a-google-request"},"Processing a Google request"),Object(r.b)("p",null,"Homeware process commands in different ways. Some times Homeware only updates the param in the database. Other times Homeware only sends something via MQTT to the device."),Object(r.b)("p",null,"The class Commands contains the methods needed to process this commands. Each command that can be received must have method in the class. The method should process the data in the proper way for the command."),Object(r.b)("p",null,"The method name is the termination of the command. In example, the command ",Object(r.b)("inlineCode",{parentName:"p"},"action.devices.commands.OnOff")," is processed in the method ",Object(r.b)("inlineCode",{parentName:"p"},"OnOff"),"."),Object(r.b)("h2",{id:"attributes"},"Attributes"),Object(r.b)("h3",{id:"device"},"Device"),Object(r.b)("p",null,"The device on which the command should be applied can be found on the attribute ",Object(r.b)("em",{parentName:"p"},"device")," and can be consulted using ",Object(r.b)("inlineCode",{parentName:"p"},"self.device"),"."),Object(r.b)("h3",{id:"params"},"Params"),Object(r.b)("p",null,"When the commands is sent with some params like"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{}),'{\n  "command": "action.devices.commands.OnOff",\n  "params": {\n    "on": true\n  }\n}\n')),Object(r.b)("p",null,"the params can be found on the attribute ",Object(r.b)("em",{parentName:"p"},"params")," and can be consulted ussing ",Object(r.b)("inlineCode",{parentName:"p"},"self.params"),"."),Object(r.b)("h2",{id:"auxiliar-methods"},"Auxiliar Methods"),Object(r.b)("h3",{id:"saveandsend"},"saveAndSend"),Object(r.b)("p",null,"This method save the param received in the database and alert the device."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"myData.saveAndSend(input, output)")),Object(r.b)("h4",{id:"arguments"},"Arguments"),Object(r.b)("h5",{id:"input"},"input"),Object(r.b)("p",null,"The name of the received param that want to be saved."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Type: string"),Object(r.b)("li",{parentName:"ul"},"Example: 'on'")),Object(r.b)("h5",{id:"output"},"output"),Object(r.b)("p",null,"The name that must be used to save the param. Sometimes doesn't match with the recieved name, but normally does."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Type: string"),Object(r.b)("li",{parentName:"ul"},"Example: 'on'")),Object(r.b)("h4",{id:"returns"},"Returns"),Object(r.b)("p",null,"None"),Object(r.b)("h3",{id:"sendcommand"},"sendCommand"),Object(r.b)("p",null,"This method sends a command (a text) to the device to which the Google's command should be applied."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"myData.sendCommand(command)")),Object(r.b)("h4",{id:"arguments-1"},"Arguments"),Object(r.b)("h5",{id:"command"},"command"),Object(r.b)("p",null,"The command that must be send to the device. The command is sent to the MQTT topic: ",Object(r.b)("inlineCode",{parentName:"p"},"device/<device-id>/command"),"."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Type: string"),Object(r.b)("li",{parentName:"ul"},"Example: 'cancel the'")),Object(r.b)("h4",{id:"returns-1"},"Returns"),Object(r.b)("p",null,"None"),Object(r.b)("h3",{id:"senddoblecommand"},"sendDobleCommand"),Object(r.b)("p",null,"This method sends the true_command if the param is logic true and false_command if the param is logic false."),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"myData.sendDobleCommand(param, true_command, false_command)")),Object(r.b)("h4",{id:"arguments-2"},"Arguments"),Object(r.b)("h5",{id:"param"},"param"),Object(r.b)("p",null,"The boolean param that want to be evaluated."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Type: string"),Object(r.b)("li",{parentName:"ul"},"Example: 'on'")),Object(r.b)("h5",{id:"true_command"},"true_command"),Object(r.b)("p",null,"The command that must be sent to the device when the param is logic true."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Type: string"),Object(r.b)("li",{parentName:"ul"},"Example: 'turn on'")),Object(r.b)("h5",{id:"false_command"},"false_command"),Object(r.b)("p",null,"The command that must be sent to the device when the param is logic false."),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Type: string"),Object(r.b)("li",{parentName:"ul"},"Example: 'turn off'")),Object(r.b)("h4",{id:"returns-2"},"Returns"),Object(r.b)("p",null,"None"))}d.isMDXComponent=!0}}]);