from data import Data

def test_getDevice():
	data = Data()
	data.setup()
	device = {		
		"_id": "light",
		"id": "light",
		"attributes": {
			"commandOnlyOnOff": True,
			"queryOnlyOnOff": True,
			"commandOnlyBrightness": True
		},
		"deviceInfo": {
			"hwVersion": "1.0",
			"swVersion": "1.0",
			"manufacturer": "Homeware",
			"model": "Homeware Lamp"
		},
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
	assert data.getDevices()[0] == device
	del data

def test_updateDevice():
	data = Data()
	data.setup()
	device = {
		"_id": "light",
		"id": "light",
		"attributes": {
			"commandOnlyOnOff": True,
			"queryOnlyOnOff": True,
			"commandOnlyBrightness": True
		},
		"deviceInfo": {
			"hwVersion": "1.0",
			"swVersion": "1.0",
			"manufacturer": "Homeware",
			"model": "Homeware Lamp"
		},
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
	status = {
		"online": True,
		"on": False,
		"brightness": 80
	}
	# Update the device info
	device['name']['name'] = 'where-is-perry'
	status["online"] == False
	assert data.updateDevice(device, status) == True	
	assert data.getDevices()[0] == device 
	assert data.getStatus()[device["id"]] == status 
	# Return to original
	device['name']['name'] = 'Lamp'
	status["online"] == True
	assert data.updateDevice(device, status) == True	
	assert data.getDevices()[0] == device 
	assert data.getStatus()[device["id"]] == status 
	del data

def test_createDevice():
	data = Data()
	data.setup()
	device = {
		"attributes": {
			"commandOnlyOnOff": True,
			"queryOnlyOnOff": True,
			"commandOnlyBrightness": True
		},
		"deviceInfo": {
			"hwVersion": "1.0",
			"swVersion": "1.0",
			"manufacturer": "Homeware",
			"model": "Homeware Lamp 2.0"
		},
		"_id": "light001",
		"id": "light001",
		"name": {
			"defaultNames": [
			"Lamp"
			],
			"nicknames": [
			"Lamp"
			],
			"name": "Test Lamp"
		},
		"traits": [
			"action.devices.traits.OnOff",
			"action.devices.traits.Brightness"
		],
		"type": "action.devices.types.LIGHT"
	}
	status = {
		"online": True,
		"on": False,
		"brightness": 80
	}
	# Crate a new device and check if it is saved in the ddbb
	data.createDevice(device, status)
	assert data.getDevices()[1] == device
	assert data.getStatus()[device['id']] == status
	del data

def test_deleteDevice():
	data = Data()
	data.setup()
	device = {
		"attributes": {
			"commandOnlyOnOff": True,
			"queryOnlyOnOff": True,
			"commandOnlyBrightness": True
		},
		"deviceInfo": {
			"hwVersion": "1.0",
			"swVersion": "1.0",
			"manufacturer": "Homeware",
			"model": "Homeware Lamp 2.0"
		},
		"_id": "light001",
		"id": "light001",
		"name": {
			"defaultNames": [
			"Lamp"
			],
			"nicknames": [
			"Lamp"
			],
			"name": "Test Lamp"
		},
		"traits": [
			"action.devices.traits.OnOff",
			"action.devices.traits.Brightness"
		],
		"type": "action.devices.types.LIGHT"
	}
	status = {
		"online": True,
		"on": False,
		"brightness": 80
	}
	# Crate a new device
	# self.data.createDevice(device, status)
	# Delete a device that doesn't exists
	assert data.deleteDevice('charger') == False
	# Delete the device
	assert data.deleteDevice('light001') == True
