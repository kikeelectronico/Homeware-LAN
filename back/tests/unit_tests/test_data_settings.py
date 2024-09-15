from data import Data

def test_getSettings():
	data = Data()
	data.setup()
	settings = {
		"_id": "settings",
		"domain": "localhost",
		"ddns": {
			"enabled": False,
			"hostname": "localhost",
			"password": "",
			"provider": "noip",
			"username": "",
			"ip": "Unknown",
			"status": "Unknown",
			"code": "Unknown",
			"last": "Unknown"
		},
		"mqtt": {
			"user": "mosquitto",
			"password": "homewarelan123"
		},
		"sync_google": False,
		"sync_devices": False,
		"log": {
			"days": 0
		},
		"client_id": "123",
		"client_secret": "456"
	}
	assert data.getSettings() == settings
	del data

def test_updateSettingss():
	data = Data()
	data.setup()
	settings = {
		"_id": "settings",
		"domain": "localhost",
		"ddns": {
			"enabled": False,
			"hostname": "localhost",
			"password": "",
			"provider": "noip",
			"username": "",
			"ip": "Unknown",
			"status": "Unknown",
			"code": "Unknown",
			"last": "Unknown"
		},
		"mqtt": {
			"user": "mosquitto",
			"password": "homewarelan123"
		},
		"sync_google": False,
		"sync_devices": False,
		"log": {
			"days": 0
		},
		"client_id": "123",
		"client_secret": "456"
	}
	settings["client_id"] = "where-is-perry"
	data.updateSettings(settings)
	assert data.getSettings() == settings
	settings["client_id"] = "123"
	data.updateSettings(settings)
	assert data.getSettings() == settings
	del data

def test_getDDNS():
	data = Data()
	data.setup()
	ddns = {
		"enabled": False,
		"hostname": "",
		"password": "",
		"provider": "noip",
		"username": "",
		"ip": "Unknown",
		"status": "Unknown",
		"code": "Unknown",
		"last": "Unknown"
	}
	assert data.getDDNS() == ddns
	del data

def test_updateDDNSstatus():
	data = Data()
	data.setup()
	ddns = {
		"enabled": False,
		"hostname": "",
		"password": "",
		"provider": "noip",
		"username": "",
		"ip": "my-ip",
		"status": "my-status",
		"code": 200,
		"last": 2024
	}
	data.updateDDNSstatus(ddns["ip"], ddns["status"], ddns["code"], ddns["enabled"], ddns["last"])
	assert data.getDDNS() == ddns
	ddns = {
		"enabled": False,
		"hostname": "",
		"password": "",
		"provider": "noip",
		"username": "",
		"ip": "Unknown",
		"status": "Unknown",
		"code": "Unknown",
		"last": "Unknown"
	}
	data.updateDDNSstatus(ddns["ip"], ddns["status"], ddns["code"], ddns["enabled"], ddns["last"])
	assert data.getDDNS() == ddns
	del data

def test_getMQTT():
	data = Data()
	data.setup()
	mqtt = {
		"user": "mosquitto",
		"password": "homewarelan123"
	}
	assert data.getMQTT() == mqtt
	del data

def test_getSyncDevices():
	data = Data()
	data.setup()
	assert data.getSyncDevices() == False
	del data

def test_getSyncGoogle():
	data = Data()
	data.setup()
	assert data.getSyncGoogle() == False
	del data

def test_updateSyncGoogle():
	data = Data()
	data.setup()
	data.updateSyncGoogle(True)
	assert data.getSyncGoogle() == True
	data.updateSyncGoogle(False)
	assert data.getSyncGoogle() == False
	del data

# ToDo: test createServiceAccountKeyFile