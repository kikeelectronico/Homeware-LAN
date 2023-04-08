"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[943],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=p(a),d=r,k=m["".concat(s,".").concat(d)]||m[d]||u[d]||l;return a?n.createElement(k,o(o({ref:t},c),{},{components:a})):n.createElement(k,o({ref:t},c))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[m]="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7520:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const l={id:"install",title:"Install Homeware",sidebar_label:"Installation"},o="Dependencies",i={unversionedId:"install",id:"install",title:"Install Homeware",description:"1. Install docker and docker-compose.",source:"@site/docs/install.md",sourceDirName:".",slug:"/install",permalink:"/Homeware-LAN/docs/install",draft:!1,editUrl:"https://github.com/kikeelectronico/Homeware-LAN/tree/master/docs/docs/install.md",tags:[],version:"current",frontMatter:{id:"install",title:"Install Homeware",sidebar_label:"Installation"},sidebar:"someSidebar",next:{title:"Connect with Google",permalink:"/Homeware-LAN/docs/connect-with-google"}},s={},p=[],c={toc:p},m="wrapper";function u(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"dependencies"},"Dependencies"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"Install docker and docker-compose.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install -y docker docker-compose\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"Install git.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install -y git\n")),(0,r.kt)("ol",{start:3},(0,r.kt)("li",{parentName:"ol"},"Install your favourite text editor. For example, nano.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install -y nano\n")),(0,r.kt)("h1",{id:"install-process"},"Install process"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Open the ports 80 and 443 on your router/firewall if needed.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Create a DDNS domain and set it using your public IP. DuckDNS and no-ip are supported.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Clone the repo and cd into it."))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/kikeelectronico/Homeware-LAN.git\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd Homeware-LAN\n")),(0,r.kt)("ol",{start:4},(0,r.kt)("li",{parentName:"ol"},"Create your own ",(0,r.kt)("inlineCode",{parentName:"li"},".env")," file from ",(0,r.kt)("inlineCode",{parentName:"li"},".env.template"),". Data will be used to generate certs on letsencrypt.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cp configuration_templates/.env.template .env\n")),(0,r.kt)("ol",{start:5},(0,r.kt)("li",{parentName:"ol"},"Replace the default data with your values.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"DOMAIN: your domain name from step 2."),(0,r.kt)("li",{parentName:"ul"},"EMAIL: your email. It is used for getting the SSL certificate from Let's Encrypt."),(0,r.kt)("li",{parentName:"ul"},"HOMEWARE_USER: the admin username that you will use to log in."),(0,r.kt)("li",{parentName:"ul"},"HOMEWARE_PASSWORD: the admin password that you will use to log in.")),(0,r.kt)("ol",{start:6},(0,r.kt)("li",{parentName:"ol"},"Copy the docker-compose file.")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Debian / Ubuntu")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cp docker/docker-compose-debian.yaml docker-compose.yaml\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Raspberry Pi / ARM cores")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cp docker/docker-compose-raspberry.yaml docker-compose.yaml\n")),(0,r.kt)("ol",{start:7},(0,r.kt)("li",{parentName:"ol"},"Start the project.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose up -d\n")),(0,r.kt)("ol",{start:8},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Follow this steps to link Homeware with Google Home: ",(0,r.kt)("a",{parentName:"p",href:"https://kikeelectronico.github.io/Homeware-LAN/docs/connect-with-google"},"https://kikeelectronico.github.io/Homeware-LAN/docs/connect-with-google"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Finally, set up the necessary data using the Homeware's ",(0,r.kt)("em",{parentName:"p"},"Settings")," page."))),(0,r.kt)("h1",{id:"default-mqtt-user-and-password"},"Default MQTT user and password"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"User: mosquitto"),(0,r.kt)("li",{parentName:"ul"},"Password: homewarelan123")),(0,r.kt)("p",null,"You may create a different ",(0,r.kt)("inlineCode",{parentName:"p"},"mosquitto_passwd")," file following ",(0,r.kt)("a",{parentName:"p",href:"https://mosquitto.org/man/mosquitto_passwd-1.html"},"these steps"),"  "),(0,r.kt)("p",null,"Thanks to ",(0,r.kt)("a",{href:"https://github.com/ajpl",tarjet:"blanck"},"@ajpl")," for the PR."))}u.isMDXComponent=!0}}]);