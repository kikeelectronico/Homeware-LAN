#!/bin/bash

sudo apt-get update
sudo apt-get install python3-pip
pip3 install flask
pip3 install gunicorn
sudo apt-get install nginx
sudo apt-get install software-properties-common
sudo apt-get install certbot python-certbot-nginx
