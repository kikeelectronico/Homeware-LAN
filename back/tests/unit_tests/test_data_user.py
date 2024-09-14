from data import Data

def test_updatePassword():
	data = Data()
	data.setup()
	password = "admin"
	new_password = "admin2"
	assert data.updatePassword(password, new_password) == True
	assert data.updatePassword(new_password,password) == True
	del data

def test_updatePassword_fail_bad_password():
	data = Data()
	data.setup()
	password = "admin2"
	new_password = "admin"
	assert data.updatePassword(password, new_password) == False
	del data

def test_login():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin"
	token = data.login(username, password)
	assert not token == None
	assert type(token) == str
	assert len(token) == 40
	del data

def test_login_fail_bad_username():
	data = Data()
	data.setup()
	username = "admin2"
	password = "admin"
	token = data.login(username, password)
	assert token == None
	del data

def test_login_fail_bad_password():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin2"
	token = data.login(username, password)
	assert token == None
	del data

def test_validateUserToken():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin"
	token = data.login("admin","admin")
	assert data.validateUserToken(token) == True
	del data

def test_validateUserToken_fail_bad_token():
	data = Data()
	data.setup()
	assert data.validateUserToken("where-is-perry") == False
	del data

# googleSync is tested in test_data_oauth