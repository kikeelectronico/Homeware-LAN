from data import Data

def test_updatePassword():
	data = Data()
	data.setup()
	password = "admin"
	new_password = "admin2"
	assert data.updatePassword(new_password,password) == False
	assert data.updatePassword(password, new_password) == True
	assert data.updatePassword(new_password,password) == True
	del data

def test_login():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin"
	assert not data.login(username, password) == None
	assert data.login("admin2",password) == None
	assert data.login(username,"admin2") == None
	del data

def test_validateUserToken():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin"
	token = data.login("admin","admin")
	assert not token == None
	assert data.validateUserToken(token) == True
	assert data.validateUserToken("token") == False
	del data

# googleSync is tested in test_data_oauth