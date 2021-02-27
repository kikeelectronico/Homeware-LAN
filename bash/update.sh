#!/bin/bash

echo "The upgrader has started.\r\n"

# Download the last version
LOCATION=$(curl -s https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest | grep "tag_name" | awk '{print "https://github.com/kikeelectronico/Homeware-LAN/releases/download/" substr($2, 2, length($2)-3) "/build.zip"}') ; sudo curl -L -o Homeware-LAN.zip $LOCATION

sudo unzip Homeware-LAN.zip

# Move files
sudo rm -r ../configuration_templates
sudo rm -r ../front
sudo mv Homeware-LAN/* ../
sudo mv Homeware-LAN/bash/* ../bash/
sudo mv Homeware-LAN/back/* ../back/

#Update Python modules
pip3 install -r requirements.txt

#Start services
sudo systemctl restart homewareMQTT
sudo systemctl restart homewareTasks
sudo systemctl restart homeware

cd ../back
sudo rm -r Homeware-LAN
sudo rm Homeware-LAN.zip

echo "\r\The upgrader has finished.\r\n"
