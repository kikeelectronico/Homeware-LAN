from data import Data
import random

def randomToken():
	# Generate the token
	chars = 'abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
	token = ''
	i = 0
	while i < 40:
		token += random.choice(chars)
		i += 1
	return token

def test_updateOauthToken():
	data = Data()
	data.setup()
	assert data.updateOauthToken("google", "access_token", randomToken(), 2024) == True
	del data

def test_validateOauthToken():
	data = Data()
	data.setup()
	token = randomToken()
	assert data.updateOauthToken("google", "access_token", token, 2024) == True
	assert data.validateOauthToken("access_token", token) == True
	del data

def test_validateOauthToken_fail_bad_type():
	data = Data()
	data.setup()
	assert data.validateOauthToken("where-is-perry", "my-token") == False
	del data

def test_validateOauthToken_fail_bad_token():
	data = Data()
	data.setup()
	assert data.validateOauthToken("access_token", "where-is-perry") == False
	del data

def test_validateOauthCredentials():
	data = Data()
	data.setup()
	assert data.validateOauthCredentials("client_id", "123") == True
	assert data.validateOauthCredentials("client_secret", "456") == True
	del data

def test_validateOauthCredentials_fail_bad_client_id():
	data = Data()
	data.setup()
	assert data.validateOauthCredentials("client_id", "where-is-perry") == False
	del data

def test_validateOauthCredentials_fail_bad_client_id():
	data = Data()
	data.setup()
	assert data.validateOauthCredentials("client_secret", "where-is-perry") == False
	del data

def test_setResponseURL():
	data = Data()
	data.setup()
	assert data.setResponseURL("a-url") == True
	del data

def test_googleSync():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin"
	response_url = "a-url"
	data.setResponseURL(response_url)
	assert data.googleSync(username, password) == response_url
	del data

def test_googleSync_fail_bad_username():
	data = Data()
	data.setup()
	username = "where-is-perry"
	password = "admin"
	assert data.googleSync(username, password) == None

def test_googleSync_fail_bad_password():
	data = Data()
	data.setup()
	username = "admin"
	password = "where-is-perry"
	assert data.googleSync(username, password) == None