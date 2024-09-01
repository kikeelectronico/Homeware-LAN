---
id: datapy
title: Data.py file
sidebar_label: Back - data.py
---

Data is a class intended to interact with both the databases and disk files. When an object is created the constructor do tasks related with verifing the database and the data contined in it.

## Method - createBackupFile

Homeware can backup the important data from the database into a file named _Homeware.json_. This method do the job.

`myData.createBackupFile()`

### Arguments

None

### Returns

None

## Method - getBackupData

Returns the backup data in a JSON format.

`myData.getBackupData()`

### Arguments

None

### Returns

See the file [configuration_template.json](https://github.com/kikeelectronico/Homeware-LAN/blob/master/configuration_templates/template_homeware.json) for reference.

## Method - loadBackupFile

This method restore the database from the Homware.json file.

`myData.loadBackupFile()`

### Arguments

None

### Returns

None

## Method - getVersion

This method returns the current Homeware installation version.

`myData.getVersion()`

### Arguments

None

### Returns
The system version object.

```
{
  version: '1.5.1'
}
```

## Method - getGlobal

The method returns all the devices data.

`myData.getGlobal()`

### Arguments

None

### Returns
An object containing devices and status.

```
{
  devices: [...],
  status: {...}
}
```

## Method - getDevices
This method returns the definition of all the devices or the definition of the indicated device.

`myData.getStatus(device_id)`

### Arguments

#### device_id
The id of the device whose definition is requiered.

- Type: string
- Example: 'lamp_001'
- Optional

### Returns
If id is not indicated: a list of definitions.
```
[
  {...},
  {...},
]
```
If id is indicated: the definition of the indicated device.
```
{
  "attributes": {
    "commandOnlyOnOff": true,
    "queryOnlyOnOff": true,
    "commandOnlyBrightness": true
  },
  "deviceInfo": {
    "hwVersion": "1.0",
    "swVersion": "1.0",
    "manufacturer": "Homeware",
    "model": "Homeware Lamp"
  },
  "id": "light",
  "name": {
    "defaultNames": [
      "Lamp"
    ],
    "nicknames": [
      "Lamp"
    ],
    "name": "Lamp"
  },
  "traits": [
    "action.devices.traits.OnOff",
    "action.devices.traits.Brightness"
  ],
  "type": "action.devices.types.LIGHT"
}
```

## Method - updateDevice

The method updates an existing device.

`myData.updateDevice(device, status)`

### Arguments

#### device
It is the definition of the device that want to be created.

- Type: json
- Example: 

```
{
  "attributes": {
    "commandOnlyOnOff": true,
    "queryOnlyOnOff": true,
    "commandOnlyBrightness": true
  },
  "deviceInfo": {
    "hwVersion": "1.0",
    "swVersion": "1.0",
    "manufacturer": "Homeware",
    "model": "Homeware Lamp"
  },
  "id": "light",
  "name": {
    "defaultNames": [
      "Lamp"
    ],
    "nicknames": [
      "Lamp"
    ],
    "name": "Lamp"
  },
  "traits": [
    "action.devices.traits.OnOff",
    "action.devices.traits.Brightness"
  ],
  "type": "action.devices.types.LIGHT"
}
```

#### status
It is the status of the device that want to be created.

- Type: json
- Example: 

```
{
  "online": true,
  "on": false,
  "brightness": 80
}
```

Check the device defition and status definition at <a href='https://developers.google.com/assistant/smarthome/overview'>Google Smart Home guide</a>

### Returns

`True` if the device was found and updated. `False` if the device was not found.

## Method - createDevice

The method creates a new device.

`myData.createDevice(device, status)`

### Arguments

#### device
It is the definition of the device that want to be created.

- Type: json
- Example: 

```
{
  "attributes": {
    "commandOnlyOnOff": true,
    "queryOnlyOnOff": true,
    "commandOnlyBrightness": true
  },
  "deviceInfo": {
    "hwVersion": "1.0",
    "swVersion": "1.0",
    "manufacturer": "Homeware",
    "model": "Homeware Lamp"
  },
  "id": "light",
  "name": {
    "defaultNames": [
      "Lamp"
    ],
    "nicknames": [
      "Lamp"
    ],
    "name": "Lamp"
  },
  "traits": [
    "action.devices.traits.OnOff",
    "action.devices.traits.Brightness"
  ],
  "type": "action.devices.types.LIGHT"
}
```

#### status
It is the status of the device that want to be created.

- Type: json
- Example: 

```
{
  "online": true,
  "on": false,
  "brightness": 80
}
```

Check the device defition and status definition at <a href='https://developers.google.com/assistant/smarthome/overview'>Google Smart Home guide</a>

### Returns
None

## Method - deleteDevice
The method deletes a device.

`myData.deleteDevice(device_id)`

### Arguments

#### device_id
It is the id of the device that want to be deleted.

- Type: string
- Example: 'lamp_001'

### Returns
`True` if the device was found and deleted. `False` if the device was not found.

## Method - getStatus
This method returns the status of all the devices or the status of the indicated device.

`myData.getStatus(device_id)`

### Arguments

#### device_id
The id of the device whose status is requiered.

- Type: string
- Example: 'lamp_001'
- Optional

### Returns
If id is not indicated: a list of devices with its status as a json object.
```
{
  device1: {...},
  device2: {...},
}
```
If id is indicated: the status as a json object.
```
{
  param1: "value",
  param2: "value"
}
```

## Method - updateParamStatus
This method updates the value of a param for a device.

`myData.updateParamStatus(device_id, param, value)`

### Arguments

#### device_id
It is the id of the device.

- Type: string
- Example: 'light_001'

#### param
It is the param that want to be updated.

- Type: string
- Example: 'on'

#### value
It is the new value

- Type: string/number/json/bool
- Example: True

### Returns
`True` if the device was found and updated. `False` if the device was not found.

## Method - updatePassword
This method updates the user's password.

`myData.updatePassword(password, new_password)`

### Arguments

#### password
The current password in plain text.

- Type: string
- Example: 'my-password'

#### new_password
The new password in plain text.

- Type: string
- Example: 'my-new-password'


### Returns
`True` if the password is set. `False` if the process fails.

## Method - login
This method login the user and returns an access token. Only one token can be active, so the current token will be deleted once a new one is created.

`myData.login(username, password)`

### Arguments

#### password
The username.

- Type: string
- Example: 'my-username'

#### new_password
The password in plain text.

- Type: string
- Example: 'my-password'


### Returns
Both the login data and login status object:

```
{
  status: 'in',
  user: 'my-username',
  token: 'the-access-token'
}
```

or the login status object:

```
{
  status: 'fail'
}
```

## Method - validateUserToken
This method validates the user's token.

`myData.validateUserToken(token)`

### Arguments

#### token
The user's token.

- Type: string
- Example: 'the-access-token'


### Returns
`True` if the token is valid. `False` if the token is invalid.

## Method - getAPIKey
This method returns the active apiakey.

`myData.getAPIKey()`

### Arguments
None

### Returns
An object containing the apikey.

```
{
  apikey: 'the-apikey'
}
```

## Method - createAPIKey
This method generates a new apiakey. Only one apikey can be active. When a new apikey is generated, the older one will be deleted.

`myData.createAPIKey()`

### Arguments
None

### Returns
An object containing the apikey.

```
{
  apikey: 'the-apikey'
}
```

## Method - validateAPIKey
This method validates the apikey.

`myData.validateAPIKey(apikey)`

### Arguments

#### incomming_data
The apikey.

- Type: string
- Example: 'the-apikey'


### Returns
`True` if the apikey is valid. `False` if the apikey is invalid.

## Method - updateOauthToken
Update an oauth2 token of a service by type. Note: This method will be deprecated.

`myData.updateOauthToken(agent, type, value, timestamp)`

### Arguments

#### agent
The service name (agent). Only Google is supported by now.

- Type: string
- Possible values: 'google'

#### type
The token type.

- Type: string
- Possible values: 'authorization_code' || 'access_token' || 'refresh_token'

#### value
The new token.

- Type: string
- Example: 'my-new-token'

#### timestamp
The timestamp when the new token was generated.

- Type: int
- Example: 1579452777875

### Returns

`True` if the token has been updated. `False` if the token hasn't been updated.

## Method - validateOauthToken
This method validates an oauth token.

`myData.validateOauthToken(type, token)`

### Arguments

#### type
The type of token.

- Type: string
- Example: '"access_token"'
- 
#### token
The token.

- Type: string
- Example: 'the-token'

### Returns
`True` if the token is valid. `False` if the token is invalid.

## Method - validateOauthCredentials
This method validates an oauth credential.

`myData.validateOauthCredentials(type, value)`

### Arguments

#### type
The type of token.

- Type: string
- Example: 'client_id'
- 
#### value
The value.

- Type: string
- Example: 'the-client-id'

### Returns
`True` if the credential is valid. `False` if the credential is invalid.

## Method - getSettings
This method returns the settings.

`myData.getSettings()`

### Arguments
None

### Returns
The settings object.

```
{
  client_id: '1234',
  client_secret: '56789'
  'ddns': {
    'enabled': false,
    'status': 'Unknown',
    'code': 'Unknown',
    'last': 'Unknown',
    'ip': 'Unknown',
    'provider': 'noip',
    'hostname': '',
    'username': '',
    'password': ''
  },
  'mqtt': {
    'user': 'mosquitto',
    'password': 'homewarelan123'
  }
  sync_google: true,
  sync_devices: true,
  log: {
    days: 30
  }
}
```

## Method - updateSettings
This method updates the settings object.

`myData.updateSettings(settings)`

### Arguments

#### settings
An object with the settings to save.

- Type: json
- Example:
```
{
  client_id: '1234',
  client_secret: '56789'
  'ddns': {
    'provider': 'noip',
    'hostname': '',
    'username': '',
    'password': ''
  },
  'mqtt': {
    'user': 'mosquitto',
    'password': 'homewarelan123'
  }
  sync_google: true,
  sync_devices: true,
  log: {
    days: 30
  }
}
```

### Returns
None

## Method - getDDNS
This method returns both the DDNS settings and the DDNS status.

`myData.getDDNS()`

### Arguments
None

### Returns
An object that contains both the DDNS settings and the DDNS status.

```
{
  enabled: false,
  status: 'Unknown',
  code: 'Unknown',
  last: 'Unknown',
  ip: 'Unknown',
  provider: 'noip',
  hostname: '',
  username: '',
  password: ''
}
```

## Method - updateDDNSstatus
This method updates the DDNS status.

`myData.updateDDNSstatus(ip, status, code, enabled, last)`

### Arguments

#### ip
Homeware's public IP.

- Type: string
- Example: '1.1.1.1'

#### status
Status of the DDNS request.

- Type: string
- Example: 'Running'

#### code
Code of the DDNS request.

- Type: int
- Example: 200

#### enabled
Enables the DDNS updater.

- Type: bool
- Example: true

#### last
Last request timestap.

- Type: int
- Example: 1579452782954

### Returns
None

## Method - getMQTT
This method returns the MQTT user and password.

`myData.getMQTT()`

### Arguments
None

### Returns
An object that contains the username and the password.

```
{
  user: 'mosquitto',
  password: 'homewarelan123'
}
```

## Method - updateSyncGoogle
This method updates the setting `updateSyncGoogle`.

`myData.updateSyncGoogle(status)`

### Arguments

#### status
The new value.

- Type: bool
- Example: True

### Returns
None

## Method - getSyncDevices
This method returns the sync_devices setting.

`myData.getSyncDevices()`

### Arguments
None

### Returns
`True` if sync_devices is enabled. `false` if it is not enabled.

## Method - getRedisStatus
This method returns the status availability of the Redis server.

`myData.getRedisStatus()`

### Arguments
None

### Returns
A running system status object.

```
{
  enable: True,
  status: 'Running',
  title: 'Redis database'
}
```

or a stopped system status object:

```
{
  enable: True,
  status: 'Stopped',
  title: 'Redis database'
}
```

## Method - getMongoStatus
This method returns the status availability of the MongoDB server.

`myData.getMongoStatus()`

### Arguments
None

### Returns
A running system status object.

```
{
  enable: True,
  status: 'Running',
  title: 'Mongo database'
}
```

or a stopped system status object:

```
{
  enable: True,
  status: 'Stopped',
  title: 'Mongo database'
}
```

## Method - getLog
This method returns the system log.

`myData.getLog()`

### Arguments
None

### Returns
A list of registers.

```
[
  {
    severity: 'Log',
    time: 1579452782954,
    message: 'The dog opened the door'
  },
  ...
]
```

## Method - log
This method creates a new register in the systems log and raise the Alert flag if necessary.

`myData.log(severity, message)`

### Arguments

#### severity
The severity.

- Type: string
- Possible values: 'Alert' || 'Warning' || 'Log'

#### message
The message to log.

- Type: string
- Example: 'The dog opened the door'

### Returns
None

## Method - deleteLog
This method all registers older than the ammount of days set in the log settings.

`myData.deleteLog()`

### Arguments
None

### Returns
None

## Method - setVerbose
This method enables verbose debugging.

`myData.setVerbose(verbose)`

### Arguments

#### verbose
The verbose value.

- Type: boolean
- Example: true

### Returns
None

## Method - isThereAnAlert
This method returns the alert flag.

`myData.isThereAnAlert()`

### Arguments
None

### Returns
An alert flag object

```
{
  alert: true
}
```

## Method - getAlive
This method returns the alive timestamps of some homeware's core elements.

`myData.getAlive(core)`

### Arguments

### Returns
A system alive object.

```
{
  mqtt: 1579452782954
}
```

## Method - updateAlive
This method updates the alive timestamp of some homeware's core element.

`myData.updateAlive(core)`

### Arguments

#### core
The core name.

- Type: string
- Possible values: 'mqtt'

### Returns
None