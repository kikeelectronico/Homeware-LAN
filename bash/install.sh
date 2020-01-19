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

#Get current crontab
crontab -l > copy
#Set the new cron job up
echo "* * * * * curl http://127.0.0.1/cron/" >> copy
#Save the cron file
crontab copy
rm copy
