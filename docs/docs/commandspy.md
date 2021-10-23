---
id: commandspy
title: Commands.py file
sidebar_label: Back - commands.py
---

## Introduction to devices and commands

### In Homeware

In Homeware a device has a definition object and a status object. In example:

#### Definition

```
{
  "id": "light001",
  "name": {
    "defaultNames": [
      "Lamp",
      "My lamp"
    ],
    "nicknames": [
      "Lamp",
      "My lamp"
    ],
    "name": "Lamp"
  },
  "attributes": {
    "commandOnlyOnOff": false,
    "queryOnlyOnOff": false
  },
  "traits": [
    "action.devices.traits.OnOff"
  ],
  "type": "action.devices.types.LIGHT",
  "deviceInfo": {
    "hwVersion": "2.0",
    "manufacturer": "Homeware-LAN Inc.",
    "model": "Homeware-LAN awesome lamp",
    "swVersion": "2.0"
  }
}
```

#### Status

```
{
  "online": true,
  "on": false
}
```

### In Google Smarthome

In Google Smarthome what a device can do its defined by its traits. For example, a <a href="https://developers.google.com/assistant/smarthome/guides/light">lamp</a> needs the following traits in order to work:

- action.devices.traits.OnOff

And can have the following traits as optionals:

- action.devices.traits.ColorSetting
- action.devices.traits.Brightness

Each trait has attributes, status and commands. The attributes can be seen in the Homeware's definition object. The status can be seen in the Homeware's status object and is composed by params.

The _on_ param in the lamp status indicates the lamp is turned on.

When a param must be changed, Google sends to Homeware a request. This request contains the params that must be updated organized in _commands_. In example:

```
{
  "command": "action.devices.commands.OnOff",
  "params": {
    "on": true
  }
}
```

### Processing a Google request

Homeware process commands in different ways. Some times Homeware only updates the param in the database. Other times Homeware only sends something via MQTT to the device.

The class _Commands_ contains the methods needed to process this commands. Each command that can be received must have a processor method in the class. The method should process the data in the proper way for the command.

The method name is the termination of the command. In example, the command _action.devices.commands.OnOff_ is processed in the method _OnOff_.

## Attributes

### Device

The device on which the command should be applied can be found on the attribute _device_ and can be consulted using `self.device`.

### Params

When the commands is sent with some params like

```
{
  "command": "action.devices.commands.OnOff",
  "params": {
    "on": true
  }
}
```

the params can be found on the attribute _params_ and can be consulted ussing `self.params`.

## Auxiliar Methods

### saveAndSend
This method save the param received in the database and alert the device.

`myData.saveAndSend(input, output)`

#### Arguments

##### input
The name of the received param that want to be saved.

- Type: string
- Example: 'on'

##### output
The name that must be used to save the param. Sometimes doesn't match with the recieved name, but normally does.

- Type: string
- Example: 'on'

#### Returns
None

### sendCommand
This method sends a command (a text) to the device to which the Google's command should be applied.

`myData.sendCommand(command)`

#### Arguments

##### command
The command that must be send to the device. The command is sent to the MQTT topic: `device/<device-id>/command`.

- Type: string
- Example: 'cancel the'

#### Returns
None

### sendDobleCommand
This method sends the true_command if the param is logic true and false_command if the param is logic false.

`myData.sendDobleCommand(param, true_command, false_command)`

#### Arguments

##### param
The boolean param that want to be evaluated.

- Type: string
- Example: 'on'

##### true_command
The command that must be sent to the device when the param is logic true.

- Type: string
- Example: 'turn on'

##### false_command
The command that must be sent to the device when the param is logic false.

- Type: string
- Example: 'turn off'

#### Returns
None


