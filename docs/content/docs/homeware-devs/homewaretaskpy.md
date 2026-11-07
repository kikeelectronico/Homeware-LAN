---
title: "HomewareTask.py file"
weight: 130
aliases:
  - /docs/homewaretaskpy/
---

HomewareTasks is a worker that runs functions periodically, such as verifying the public IP, synchronizing devices, or clearing logs.

## Functions

### ddnsUpdater

This function verify the public IP and sends request to the DDNS provider in order to update keep it update.

### syncDevicesStatus

This function periodically sends the devices' status to the devices.

### clearLogFile

This function clears the log if configured to do so.

### homewareCoreHearbeat

This function sends a heartbeat to other parts of the system.

### syncGoogleState

This function sends the devices' status to Google.