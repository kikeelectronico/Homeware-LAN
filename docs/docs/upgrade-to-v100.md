---
id: upgrade-to-v100
title: Upgrade to v1.0.0
sidebar_label: Upgrade to v1.0.0
---

Please, **backup your system**. Use the backup file option.

# Process

You shouldn't upgrade to v1.0 from an older versión. You **MUST INSTALL THE NEW VERSION** and restore your backup file after installation.

# Installation process

First you need to delete some old files and configurations

## Delete the cron jobs

Run: ```sudo crontab -e``` and delete the following lines:

@reboot sudo systemctl start homeware

@reboot sudo systemctl start homewareMQTT

@reboot sudo systemctl start homewareTask

@reboot sudo systemctl start homewareRedis

## Delete the Redis service

```
sudo rm /lib/systemd/system/homewareRedis.service
```

## Install the new version

https://github.com/kikeelectronico/Homeware-LAN/wiki/Install-Homeware-LAN

Do not forget to clean your web browser's cache.
