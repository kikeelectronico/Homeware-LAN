#!/bin/bash

echo "The upgrader has started.\r\n"

# Download the last version
LOCATION=$(curl -s https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest \
| grep "tag_name" \
| awk '{print "https://github.com/kikeelectronico/Homeware-LAN/archive/" substr($2, 2, length($2)-3) ".zip"}') \
; curl -L -o Homeware-LAN.zip $LOCATION

unzip Homeware-LAN.zip

# Move files
mv Homeware-LAN-*/* ../
mv Homeware-LAN-*/back/* ../back/
mv Homeware-LAN-*/bash/* ../bash/
mv Homeware-LAN-*/configuration_templates/* ../configuration_templates/
mv Homeware-LAN-*/ESP8266example/* ../ESP8266example/
mv Homeware-LAN-*/docs/* ../docs/
mv Homeware-LAN-*/front/* ../front/

#Update Python modules
pip3 install -r requirements.txt

#Build the UI
# cd web
# npm install
# npm run build

#Start services
sudo systemctl restart homewareMQTT
sudo systemctl restart homewareTasks
sudo systemctl restart homeware

echo "\r\The upgrader has finished.\r\n"
