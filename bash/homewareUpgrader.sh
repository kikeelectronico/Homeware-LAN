#!/bin/bash

exec 1>upgrader.log 2>&1

echo "The upgrader has strarted.\r\n"

#Stop both services
sudo systemctl stop homewareMQTT
sudo systemctl stop homeware

#Pull from the repository
git pull

#Start both services
sudo systemctl start homewareMQTT
sudo systemctl start homeware

sudo sh upgraderInstructions.sh

echo "\r\The upgrader has finished.\r\n"
#Stop the upgrader
sudo systemctl stop homewareUpgrader
