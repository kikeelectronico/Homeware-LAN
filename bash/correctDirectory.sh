#!/usr/bin/env bash

echo "Correcting the installation\r\n"

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
sudo systemctl start homewareMQTT
sudo systemctl start homewareTasks
sudo systemctl start homewareRedis
sudo systemctl start homeware

#Last manual step
echo "Please run: - sudo crontab -e - and delete the following lines:\r\n"
echo "@reboot sudo systemctl start homeware\r\n"
echo "@reboot sudo systemctl start homewareMQTT\r\n"
echo "@reboot sudo systemctl start homewareTasks\r\n"
echo "@reboot sudo systemctl start homewareRedis\r\n"
