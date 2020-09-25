#!/usr/bin/env bash

echo "Correcting the installation\r\n"

#Move the installation
sudo mv /home/pi/Homeware-LAN /usr/share/Homeware-LAN
cd /usr/share/Homeware-LAN

#Intall the new services
sudo cp configuration_templates/homeware.service /lib/systemd/system/
sudo cp configuration_templates/homewareMQTT.service /lib/systemd/system/
sudo cp configuration_templates/homewareTasks.service /lib/systemd/system/
sudo cp configuration_templates/homewareRedis.service /lib/systemd/system/

#Eneable the services
sudo systemctl enable homewareMQTT
sudo systemctl enable homewareTasks
sudo systemctl enable homewareRedis
sudo systemctl enable homeware

#Reload the daemon
sudo systemctl daemon-reload

#Start the services
sudo systemctl restart homewareMQTT
sudo systemctl restart homewareTasks
sudo systemctl restart homewareRedis
sudo systemctl restart homeware

#Last manual step
echo "Please run: - sudo crontab -e - and delete the following lines:\r\n"
echo "@reboot sudo systemctl start homeware"
echo "@reboot sudo systemctl start homewareMQTT"
echo "@reboot sudo systemctl start homewareTasks"
echo "@reboot sudo systemctl start homewareRedis"

echo "The installation will be corrected after deleting those lines."
