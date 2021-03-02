# Homeware ![GitHub release (latest by date)](https://img.shields.io/github/v/release/kikeelectronico/Homeware-LAN?style=flat-square) ![GitHub Release Date](https://img.shields.io/github/release-date/kikeelectronico/Homeware-LAN?label=Last%20release&style=flat-square) ![GitHub](https://img.shields.io/github/license/kikeelectronico/Homeware-LAN?style=flat-square) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

Homeware is a _Google Home Provider Cloud Service_, a complete ecosystem that allows you to connect any of your DIY home devices to Google Home. Once connected you can control the device from both Google Assistant and Google Home App.

Homeware containts a backend that does the integration and a web forntend that allows you to manage your devices and program tasks.

# Install without docker compose

Homeware can be installed in directly on Debian, Ubuntu or Raspbian. Once you got your platform ready follow these instructions.

1. Open a terminal window in your Raspberry Pi and run:

```
wget https://raw.githubusercontent.com/kikeelectronico/Homeware-LAN/master/bash/install.sh
```

```
sudo sh install.sh
```

2. Follow the instructions that appear in the screen.

# Install with Docker Compose

1. Clone the repo and cd into it  
```bash
git clone git@github.com:kikeelectronico/Homeware-LAN.git
cd Homeware-LAN
```
2. Create your own `.env` file from `.env.template`. Data will be used to generate certs on letsencrypt.  
3. Start the project  
```bash
docker-compose up -d
```
4. Configure the server
```bash
curl -d '{"user":"YOURUSER", "pass":"YOURPASSWORD"}' -H "Content-Type: application/json" -X POST https://YOURDOMAIN/api/user/set/
curl -X GET https://YOURDOMAIN/api/settings/domain/YOURDOMAIN/
curl -X GET https://YOURDOMAIN/api/settings/setAssistantDone/
```
5. Configure MQTT credentials at https://YOURDOMAIN/settings with the defaults:  
```
user: mosquitto
pass: homewarelan123
```
You may create a different `mosquitto_passwd` file following [these steps](https://mosquitto.org/man/mosquitto_passwd-1.html)  

6. Follow this steps to link Homeware with Google Home: https://kikeelectronico.github.io/Homeware-LAN/docs/connect-with-google

# Stay up to date

Spanish Telegram channel: [https://t.me/homeware_up_to_date](https://t.me/homeware_up_to_date)

# Contribute

Read [CONTRIBUTING.md](https://kikeelectronico.github.io/Homeware-LAN/docs/contributing/) and [CODE_OF_CONDUCT.md](https://kikeelectronico.github.io/Homeware-LAN/docs/code-of-conduct/).

# Documentation

## Homeware Docs

https://kikeelectronico.github.io/Homeware-LAN/

## Google guides

https://developers.google.com/actions/smarthome/
