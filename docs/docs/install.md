---
id: install
title: Install Homeware
sidebar_label: Installation
---

1. Open the ports 80 and 443 on your router/firewall if needed.

2. Clone the repo and cd into it  
```bash
git clone git@github.com:kikeelectronico/Homeware-LAN.git
```
```bash
cd Homeware-LAN
```
3. Create your own `.env` file from `.env.template`. Data will be used to generate certs on letsencrypt.  
4. Start the project
- Debian / Ubuntu
```bash
docker-compose up -d
```
- Raspberry Pi
```bash
docker-compose up -d -f docker-compose-raspberry.yaml
```
5. Configure the server. Make sure to change the necessary data.
```bash
curl -d '{"user":"YOURUSER", "pass":"YOURPASSWORD"}' -H "Content-Type: application/json" -X POST https://YOURDOMAIN/api/user/set/
```
```bash
curl -X GET https://YOURDOMAIN/api/settings/domain/YOURDOMAIN/
```
```bash
curl -X GET https://YOURDOMAIN/api/settings/setAssistantDone/
```
6. Configure MQTT credentials at https://YOURDOMAIN/settings with the defaults:  
```
user: mosquitto
pass: homewarelan123
```
You may create a different `mosquitto_passwd` file following [these steps](https://mosquitto.org/man/mosquitto_passwd-1.html)  

7. Follow this steps to link Homeware with Google Home: https://kikeelectronico.github.io/Homeware-LAN/docs/connect-with-google

Thanks to <a href="https://github.com/ajpl" tarjet="blanck">@ajpl</a> for the PR.

