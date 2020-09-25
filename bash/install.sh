#!/bin/bash

sudo apt-get update
sudo apt-get install python3-pip
pip3 install flask
pip3 install gunicorn
pip3 install paho-mqtt
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

#Get current sudo crontab
sudo crontab -l > copy
#Set the new cron job up
echo "@reboot sudo systemctl start homeware" >> copy
echo "@reboot sudo systemctl start homewareMQTT" >> copy
echo "@reboot sudo systemctl start homewareTasks" >> copy
echo "@reboot sudo systemctl start homewareRedis" >> copy
#Save the cron file
sudo crontab copy
rm copy

sudo systemctl start homewareMQTT
sudo systemctl start homewareTasks
sudo systemctl start homewareRedis
sudo systemctl start homeware
