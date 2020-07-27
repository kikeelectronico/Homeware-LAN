#!/bin/bash

sudo apt-get update
sudo chown -R root /home/pi
sudo apt-get install python3-pip
sudo pip3 install flask
sudo pip3 install gunicorn
sudo pip3 install paho-mqtt
sudo apt-get install nginx
sudo apt-get install software-properties-common
sudo apt-get install certbot python-certbot-nginx
sudo apt-get install curl
sudo apt-get install mosquitto mosquitto-clients

sudo cp configuration_templates/homeware.service /lib/systemd/system/

#sudo systemctl start homeware
sudo systemctl stop homeware
#sudo systemctl status homeware

# #Get current sudo crontab
 sudo crontab -l > copy
# #Set the new cron job up
 echo "@reboot sudo systemctl start homeware" >> copy
# #Save the cron file
sudo crontab copy
 rm copy

sudo sh bash/update.sh

#sudo systemctl start homeware
