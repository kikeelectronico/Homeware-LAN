if ! test -f installations.txt; then
    echo "v0.5.1" >> installations.txt
    echo "\r\nThe installations file has been created.\r\n"
fi

if ! grep -Fxq "v0.5.2" installations.txt
then
  #Intall the new services
  sudo cp ../configuration_templates/homeware.service /lib/systemd/system/
  sudo cp ../configuration_templatesconfiguration_templates/homewareMQTT.service /lib/systemd/system/
  sudo cp ../configuration_templatesconfiguration_templates/homewareUpgrader.service /lib/systemd/system/

  #Get current sudo crontab
  sudo crontab -l > copy
  #Set the new cron job up
  echo "@reboot sudo systemctl start homewareMQTT" >> copy
  #Save the cron file
  sudo crontab copy
  rm copy
  echo "v0.5.2\r\n" >> installations.txt
  echo "v0.5.2 dependencies have been installed.\r\n"
fi
