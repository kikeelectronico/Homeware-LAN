---
id: mqtt-api
title: MQTT API
sidebar_label: MQTT API
---

Homeware LAN has an MQTT API for getting and setting the status of any device. You can use this API for communicating Homeware with your hardware devices.

## Connection data
**Host**: It is the IP of the machine that runs Homeware.

**Port**: 1883

## Status of a device

The status of a device is composed by several parameters. For example, the status of a light can be something like:
```
{
  "on": false,
  "online": true,
  "brightness": 80,
  "color": {
    "temperature": 5000
  }
}
```

You can see all the device's parameters at `https://<your.domain.com>/devices/info/<device-id>/`

## Subscribing to the status of a device

Every device has at least two topics where Homeware posts the status of the device if it changes. You can see all the device's topics at `https://<your.domain.com>/devices/connecting/<device-id>/`


### Main Topic

Each device has its own main topic that is used by Homeware to post the status of a device. It publishes all the parameters in a JSON format.

The **main topic for each device** is ```device/<device-id>``` where ```<device-id>``` is the unique id of each device.

#### Example

For a light in which both the On/Off status and the brightness can be controlled, every time the status changes in Homeware, it posts something like:

```
{"on":true,"brightness":80}
```
### Individual Topics

Each device has individual topics for each parameter or command.

#### Example

For a light in which the On/Off status can be controlled, every time the `on` status changes in Homeware, it posts the new status in `device/<device-id>/on`.

```
true
```

## Update the status of a device
You can change the status of a device in Homeware posting the new status in the topic ```device/control``` using the next format:

```
{"id":"<device-id>","param":"<param-to-change>","value":"<new-value-for-param>","intent":"<new-intent>"}
```
#### Example
For a smart bulb which ```<device-id>``` at Homeware is light001, if you want to change its brightness to 80%. You must post the following at ```device/control``` topic:

```
{"id":"light001","param":"brightness","value":"80","intent":"execute"}
```

The `intent` key should be set to `execute` for updating the status of a device.

## Request the status of a device

You can request to Homeware to publish the status of a device at any time by posting a request to ```device/control``` topic.

```
{"id":"light001","param":"","value":"","intent":"request"}
```
The `intent` key should be set to `request` for requesting the status of a device.