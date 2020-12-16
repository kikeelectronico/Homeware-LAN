---
id: connecting-hardware
title: Connecting hardware to Homeware
sidebar_label: Connect a device
---

Homeware LAN uses MQTT for communicate with your hardware devices. You can use any example and library that you want in order to make it works.

# Connection data
**Host**: It is the IP of your Raspberry Pi.

**Port**: 1883

# Topics
## Homeware to hardware - receive data

You can see all the device's topics at `https://<your.domain.com>/devices/connecting/<device-id>/`

### Main Topic

Each device has its own main topic that will be used by Homeware to send information to the device.

The **main topic for each device** is ```device/<device-id>``` where ```<device-id>``` is the unique id of each device.

The data that Homeware will sent depends on the device type and is a JSON formatted string.

#### Example

Imagine that we have a light in which both the On/Off status and the brightness can be controlled. Every time the status changes in Homeware, it will send something like:

```
{"on":true,"brightness":80}
```
### Individual Topics

Each device has individual topics for each param or command.

#### Example

Imagine that we have a light in which the On/Off status can be controlled. Every time the `on` status changes in Homeware, it will send the new status to `device/<device-id>/on`.


## Hardware to Homeware - send data
The hardware can send data back to Homeware sending the data to the topic ```device/control``` and using the next format:

```
{"id":"<device-id>","param":"<param-to-change>","value":"<new-value-for-param>","intent":"<new-intent>"}
```
### Example
Imagine that we have a smart bulb which ```<device-id>``` at Homeware is light001 and we want to change its brightness to 80%. We will send to ```device/control``` topic:

```
{"id":"light001","param":"brightness","value":"80","intent":"<new-intent>"}
```

The last parameter that must be configured is the intent, it can be set to:

`execute` -> Means that we only want to store the new value.

`rules` -> Means that we want to store the new value and verify all rules. It could be interesting if we know that one or more rules uses the parameter that we are changing as a trigger for do another job.

`request` -> Check [Hardware to Homeware - request data](#hardware-to-homeware---request-data).

The complete request can be something like:

```
{"id":"light001","param":"brightness","value":80,"intent":"execute"}
```

## Hardware to Homeware - request data

The hardware can request its information to Homeware at any time by sending a request to ```device/control``` topic and using ```request``` as intent.

```
{"id":"light001","param":"","value":"","intent":"request"}
```
