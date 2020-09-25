#!/bin/bash

echo "Installing Homeware-LAN and its dependencies.\r\n"

sudo apt-get update
sudo apt-get install python3-pip
pip3 install install -r requirements.txt
sudo apt-get install nginx
sudo apt-get install software-properties-common
sudo apt-get install certbot python-certbot-nginx
sudo apt-get install curl
sudo apt-get install mosquitto mosquitto-clients

#Intall the new services
sudo cp configuration_templates/homeware.service /lib/systemd/system/
sudo cp configuration_templates/homewareMQTT.service /lib/systemd/system/
sudo cp configuration_templates/homewareTasks.service /lib/systemd/system/
sudo cp configuration_templates/homewareRedis.service /lib/systemd/system/

#Install redis
sudo pip3 install redis
sudo mkdir redis
cd redis
wget http://download.redis.io/redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
sudo make
sudo make install

#Eneable the services
sudo systemctl enable homewareMQTT
sudo systemctl enable homewareTasks
sudo systemctl enable homewareRedis
sudo systemctl enable homeware

#Start the services
sudo systemctl start homewareMQTT
sudo systemctl start homewareTasks
sudo systemctl start homewareRedis
sudo systemctl start homeware
