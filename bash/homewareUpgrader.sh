#!/bin/bash

exec 1>upgrader.log 2>&1

echo "The upgrader has started.\r\n"

#Stop both services
sudo systemctl stop homewareMQTT
sudo systemctl stop homeware

#Pull from the repository
git pull

sudo sh upgraderInstructions.sh

#Start both services
sudo systemctl start homewareMQTT
sudo systemctl start homeware

echo "\r\The upgrader has finished.\r\n"
#Stop the upgrader
sudo systemctl stop homewareUpgrader
