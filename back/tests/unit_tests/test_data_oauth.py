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
	assert data.updateOauthToken("google", "access_token", randomToken(), 2024) == True
	assert data.validateOauthToken("access_token", "my-token") == False
	del data

def test_validateOauthCredentials():
	data = Data()
	data.setup()
	assert data.validateOauthCredentials("client_id", "123") == True
	assert data.validateOauthCredentials("client_id", "1234") == False
	assert data.validateOauthCredentials("client_secret", "456") == True
	assert data.validateOauthCredentials("client_secret", "4567") == False
	del data

# def test_setResponseURL():
# 	data = Data()
# 	data.setup()
# 	assert data.setResponseURL("a-url") == True
# 	del data

def test_googleSync():
	data = Data()
	data.setup()
	username = "admin"
	password = "admin"
	response_url = "a-url"
	data.setResponseURL(response_url)
	assert data.googleSync(username, password) == response_url
	assert data.login("admin2",password) == None
	assert data.login(username,"admin2") == None
	del data