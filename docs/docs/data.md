---
id: datapy
title: Data.py file
sidebar_label: Back - data.py
---

Data is a class intended to interact with both the database and disk files. When an object is created the constructor do task related with verify the database and the data contined in it.

## Method - getVersion

This method returns the Homeware version.

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

The method returns all the devices data and all tasks.

`myData.getGlobal()`

### Arguments

None

### Returns
An object containing devices, status and tasks.

```
{
  devices: [...],
  status: {...},
  tasks: [...]
}
```

## Method - createFile

Homeware can backup the important data from the database into a file named _Homeware.json_. This method do the task.

`myData.createFile()`

### Arguments

None

### Returns

None

## Method - load

This method restore the database from the Homware.json file.

`myData.load()`

### Arguments

None

### Returns

None

## Method - createDevice

The method creates a new device.

`myData.createDevice(device_data)`

### Arguments

#### device_data
It is the definition of the device that want to be created.

- Type: json
- Example: 

```
{
  device: {
    ...
  },
  status: {
    ...
  }
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
This method returns the status of all the devices.

`myData.getStatus()`

### Arguments
None

### Returns
A list of devices with its status as a json object.
```
{
  device1: {...},
  device2: {...},
}
```

## Method - updateStatus
This method updates the value of a param for a device.

`myData.updateStatus(device,param,value)`

### Arguments

#### device
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

## Method - getTasks
This method returns a list with all the tasks.

`myData.getTasks()`

### Arguments
None

### Returns
A list of taks. In example:

```
[
  {
    title: "A title",
    description: " A description",
    triggers: {
      trigger: {
        type: "or",
        parent: "triggers",
        operation: [
          1602355786257
        ]
      },
      "1602355786257": {
        operation: "22:0:1234560",
        parent: "trigger",
        type: "time"
      }
    },
    target: [
      {
        device: "night_scene",
        param: "deactivate",
        value: false
      }
    ]
  },
  ...
]
```

## Method - getTask
This method returns a task.

`myData.getTask(task_id)`

### Arguments

#### task_id
Identifies the task that will be returned.

- Type: int
- Example: 4

### Returns
A task object. In example:

```
{
  title: "A title",
  description: " A description",
  triggers: {
    trigger: {
      type: "or",
      parent: "triggers",
      operation: [
        1602355786257
      ]
    },
    "1602355786257": {
      operation: "22:0:1234560",
      parent: "trigger",
      type: "time"
    }
  },
  target: [
    {
      device: "night_scene",
      param: "deactivate",
      value: false
    }
  ]
}
```

## Method - updateTask
This method updates the definition of a task.

`myData.updateTask(task)`

### Arguments

#### task
The definition of the task and its id.

- Type: json
- Example: 
```
{
  id: 5,
  task: {
    title: "A title",
    description: " A description",
    triggers: {
      trigger: {
        type: "or",
        parent: "triggers",
        operation: [
          1602355786257
        ]
      },
      "1602355786257": {
        operation: "22:0:1234560",
        parent: "trigger",
        type: "time"
      }
    },
    target: [
      {
        device: "night_scene",
        param: "deactivate",
        value: false
      }
    ]
  }
}
```

### Returns
`True` if the task was found and updated. `False` if the task was not found.

## Method - createTask
This method creates a new task with the definition received.

`mydata.createTask(task)`

### Arguments

#### task
The definition of the task and its id.

- Type: json
- Example: 
```
{
  id: 5,
  task: {
    title: "A title",
    description: " A description",
    triggers: {
      trigger: {
        type: "or",
        parent: "triggers",
        operation: [
          1602355786257
        ]
      },
      "1602355786257": {
        operation: "22:0:1234560",
        parent: "trigger",
        type: "time"
      }
    },
    target: [
      {
        device: "night_scene",
        param: "deactivate",
        value: false
      }
    ]
  }
}
```

### Returns
None

## Method - deleteTask
This method deletes a task.

`myData.deleteTask(task_id)`

### Arguments

#### task_id
The id of the task that wnat to be deleted.

- Type: int
- Example: 3

### Returns
`True` if the task was found and deleted. `False` if the task was not found.

## Method  - setUser
This method set the username and password for the first time. It only can be call once.

`myData.setUser(incomming_data)`

### Arguments

#### incomming_data
The username and password in plain text.

- Type: json
- Example: 
```
{
  user: 'my-username',
  pass: 'my-password'
}
```

### Returns
`Saved correctly!` if it is the first time. `Your user has been set in the past` if the username was set in the past.

## Method - updatePassword
This method updates the user's password.

`myData.updatePassword(incomming_data)`

### Arguments

#### incomming_data
Both the current and new passwords in plain text.

- Type: json
- Example:
```
{
  pass: 'my-password',
  new_pass: 'my-new-password'
}
```

### Returns
`Updated` if the password is set. `Fail, the password hasn't been changed` if the process fails.

## Method - login
This method login the user and returns an access token. Only one token can be active, so the current token will be deleted once a new one is created.

`myData.login(incomming_data)`

### Arguments

#### incomming_data
The username and password in plain text.

- Type: json
- Example: 
```
{
  user: 'my-username',
  pass: 'my-password'
}
```

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

`myData.validateUserToken(incomming_data)`

### Arguments

#### incomming_data
The username and password in plain text.

- Type: json
- Example: 
```
{
  user: 'my-username',
  token: 'the-access-token'
}
```

### Returns
The the login success status object :

```
{
  status: 'in'
}
```

or the login failed status object fail:

```
{
  status: 'fail'
}
```

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

## Method - generateAPIKey
This method generates a new apiakey. Only one apikey can be active. When a new apikey is generated, the older one will be deleted.

`myData.generateAPIKey()`

### Arguments
None

### Returns
An object containing the apikey.

```
{
  apikey: 'the-apikey'
}
```

## Method - getToken
Get an oauth2 active token's obeject by the service name. Note: This method will be deprecated.

`myData.getToken(agent)`

### Arguments

#### agent
The service name (agent). Only Google is supported by now.

- Type: string
- Possible values: 'google'

### Returns
An string containing the token or a token object.

```
{
  access_token: {
    timestamp: 1579452782954,
    value: '-'
  },
  authorization_code: {
    timestamp: 1579452777875,
    value: '-'
  },
  client_id: '123',
  client_secret: '456',
  refresh_token: {
    timestamp: 1579452782954,
    value: '-'
  }
}
```

## Method - updateToken
Update an oauth2 token of a service by type. Note: This method will be deprecated.

`myData.updateToken(agent, type, value, timestamp)`

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
None

## Method - getSettings
This method returns the read settings object.

`myData.getSettings()`

### Arguments
None

### Returns
The read settings object.

```
{
  google: {
    client_id: '1234',
    client_secret: '56789'
  },
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
}
```

## Method - updateSettings
This method updates the settings object.

`myData.updateSettings(incomming_data)`

### Arguments

#### incomming_data
An object with the settings to save.

- Type: json
- Example:
```
{
  token: {
    google: {
      client_id: '1234',
      client_secret: '56789'
    }
  }
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
}
```

### Returns
None

## Method - setDomain
This method sets the domain name. It only can be called once.

`myData.setDomain(domain)`

### Arguments

#### domain
The domain name.

- Type: string
- Example: 'www.mydomain.com'

### Returns
`Saved correctly!` if it is the first time. `Your domain has been set in the past` if the domain was set in the past.

## Method - setSyncDevices
This method sets the sync_devices setting.

`myData.setSyncDevices(status)`

### Arguments

#### status
The new value for the setting.

- Type: bool
- Example: true

### Returns
None

## Method - getSyncDevices
This method returns the sync_devices setting.

`myData.getSyncDevices()`

### Arguments
None

### Returns
`True` if sync_devices is enabled. `false` if it is not enabled.

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

## Method - getDDNS
This method returns the both the DDNS settings and the DDNS status.

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

## Method - updateDDNS
This method updates the DDNS status.

`myData.updateDDNS(ip, status, code, enabled, last)`

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

## Method - redisStatus
This method returns the status availability of the Redis server.

`myData.redisStatus()`

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

## Method - updateSyncGoogle
This method sets the sync_google setting. This method will be deprecated.

`myData.updateSyncGoogle(status)`

### Arguments

#### status
The new value for the setting.

- Type: bool
- Example: true

### Returns
None

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

## Method - updateAlive
This method updates the alive timestamp of some homeware's core element.

`myData.updateAlive(core)`

### Arguments

#### core
The core name.

- Type: string
- Possible values: 'tasks' || 'mqtt'

### Returns
None

## Method - getAlive
This method returns the alive timestamps of some homeware's core elements.

`myData.getAlive(core)`

### Arguments

### Returns
A system alive object.

```
{
  tasks: 1579452782954,
  mqtt: 1579452782954
}
```