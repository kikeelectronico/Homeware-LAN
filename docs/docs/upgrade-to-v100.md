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

1. Run.

 ```
 sudo crontab -e
 ```

 2. Delete the following lines.

> @reboot sudo systemctl start homeware

> @reboot sudo systemctl start homewareMQTT

> @reboot sudo systemctl start homewareTask

> @reboot sudo systemctl start homewareRedis

3. Save using `Ctrl + O`.

4. Exit using `Ctrl + X`.

## Delete the Redis service

1. Run.

```
sudo rm /lib/systemd/system/homewareRedis.service
```

## Install the new version

https://homeware.enriquegomez.me/docs/install

Do not forget to clean your web browser's cache.
