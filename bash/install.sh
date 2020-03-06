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
echo "* * * * * curl http://127.0.0.1:5001/cron/" >> copy
#Save the cron file
crontab copy
rm copy

sudo cp configuration_templates/homeware.service /lib/systemd/system/

#sudo systemctl start homeware
#sudo systemctl stop homeware
#sudo systemctl status homeware

#Get current sudo crontab
sudo crontab -l > copy
#Set the new cron job up
echo "@reboot sudo systemctl start homeware" >> copy
#Save the cron file
sudo crontab copy
rm copy

#sudo systemctl start homeware
