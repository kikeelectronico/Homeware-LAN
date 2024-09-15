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
	assert data.updateParamStatus(device_id,"on",True) == True
	# assert data.getStatus()[device_id] == status
	# assert data.updateParamStatus(device_id,"on",False) == True
	del data

# def test_updateStatus_fail_bad_id():
# 	data = Data()
# 	data.setup()
# 	device_id = "where-is-perry"
# 	status = {
# 		"online": True,
# 		"on": True,
# 		"brightness": 80
# 	}
# 	assert data.updateParamStatus(device_id,"on",True) == False
# 	del data
