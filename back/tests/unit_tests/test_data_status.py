from data import Data

def test_getStatus():
	data = Data()
	data.setup()
	device_id = "light"
	status = {
		"online": True,
		"on": False,
		"brightness": 80
	}
	# Update the device status
	assert data.getStatus()[device_id] == status
	del data

def test_updateStatus():
	data = Data()
	data.setup()
	device_id = "light"
	status = {
		"online": True,
		"on": True,
		"brightness": 80
	}
	# Crate a new device
	# self.data.createDevice(device, status)
	# Update the device status
	assert data.updateParamStatus(device_id,"on",True)
	assert data.getStatus()[device_id] == status
	assert data.updateParamStatus(device_id,"on",False)
	del data
