from data import Data

def test_createAPIKey():
	data = Data()
	data.setup()
	access = data.createAPIKey()
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 40
	del data


def test_getAPIKeys():
	data = Data()
	data.setup()
	access = data.getAPIKeys()[0]
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 40
	del data

def test_validateAPIKeys():
	data = Data()
	data.setup()
	access = data.getAPIKeys()[0]
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 40
	assert data.validateAPIKey(access["apikey"]) == True
	del data

def test_validateAPIKey_fail_bad_apikey():
	data = Data()
	data.setup()
	assert data.validateAPIKey("where-is-perry") == False
	del data