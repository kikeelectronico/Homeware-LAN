from data import Data

def test_createAPIKey():
	data = Data()
	data.setup()
	access = data.createAPIKey()
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 40
	del data


def test_getAPIKey():
	data = Data()
	data.setup()
	access = data.getAPIKey()
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 40
	del data

def test_validateAPIKey():
	data = Data()
	data.setup()
	access = data.getAPIKey()
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 40
	assert data.validateAPIKey(access["apikey"])
	del data