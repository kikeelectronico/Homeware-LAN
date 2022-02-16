---
id: install
title: Install Homeware
sidebar_label: Installation
---

# Dependencies

1. Install docker and docker-compose
```bash
sudo apt install -y docker docker-compose
```
2. Install git
```bash
sudo apt install -y git
```
3. Install your favourite text editor. For example, nano.
```bash
sudo apt install -y nano
```
# Install process

1. Open the ports 80 and 443 on your router/firewall if needed.

2. Create a DDNS domain and set it using your public IP. DuckDNS and no-ip are supported.

3. Clone the repo and cd into it  
```bash
git clone https://github.com/kikeelectronico/Homeware-LAN.git
```
```bash
cd Homeware-LAN
```
4. Create your own `.env` file from `.env.template`. Data will be used to generate certs on letsencrypt.
```bash
cp configuration_templates/.env.template .env
```
5. Replace the default data with your values.
- DOMAIN: your domain name from step 2.
- EMAIL: your email. It is used for getting the SSL certificate from Let's Encrypt.
- HOMEWARE_USER: the admin username that you will use to log in.
- HOMEWARE_PASSWORD: the admin password that you will use to log in.
6. Copy the docker-compose file
- Debian / Ubuntu
```bash
cp docker/docker-compose-debian.yaml docker-compose.yaml
```
- Raspberry Pi / ARM cores
```bash
cp docker/docker-compose-raspberry.yaml docker-compose.yaml
```
7. Start the project
```bash
docker-compose up -d
```
8. Follow this steps to link Homeware with Google Home: https://kikeelectronico.github.io/Homeware-LAN/docs/connect-with-google

9. Finally, set up the necessary data using the Homeware's _Settings_ page.

# Default MQTT user and password

- User: mosquitto
- Password: homewarelan123

You may create a different `mosquitto_passwd` file following [these steps](https://mosquitto.org/man/mosquitto_passwd-1.html)  

Thanks to <a href="https://github.com/ajpl" tarjet="blanck">@ajpl</a> for the PR.

