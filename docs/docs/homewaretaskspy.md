---
id: homewaretaskpy
title: HomewareTask.py file
sidebar_label: Back - homewareTask.py
---

HomewareTasks contains functions that work periodic work like verify the public IP, synchronize the devices or execute the user's programed takss.

## Functions

### ddnsUpdater

This function verify the public IP and sends request to the DDNS provider in order to update keep it update.

### syncDevicesStatus

This functions sends the devices its status periodically.