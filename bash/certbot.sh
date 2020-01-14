#!/bin/bash

echo "<br><b>sudo apt-get install software-properties-common</b><br>"
sudo apt-get install software-properties-common -y
echo "<br><b>sudo add-apt-repository universe</b><br>"
sudo add-apt-repository universe -y
echo "<br><b>sudo add-apt-repository ppa:certbot/certbot</b><br>"
sudo add-apt-repository ppa:certbot/certbot -y
echo "<br><b>sudo apt-get update</b><br>"
sudo apt-get update
echo "<br><b>sudo apt-get install certbot python-certbot-nginx</b><br>"
sudo apt-get install certbot python-certbot-nginx
echo "<br><b>Done</b>"
