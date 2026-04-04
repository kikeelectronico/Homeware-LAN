from data import Data

def test_createAPIKey():
	data = Data()
	data.setup()
	access = data.createAPIKey("new")
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 43
	del data

def test_getAPIKeys():
	data = Data()
	data.setup()
	access = data.getAPIKeys()[0]
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 43
	del data

def test_validateAPIKeys():
	data = Data()
	data.setup()
	access = data.getAPIKeys()[0]
	assert "apikey" in access
	assert type(access["apikey"]) == str
	assert len(access["apikey"]) == 43
	assert data.validateAPIKey(access["apikey"]) == True
	del data

def test_validateAPIKey_fail_bad_apikey():
	data = Data()
	data.setup()
	assert data.validateAPIKey("where-is-perry") == False
	del data

def test_validateAPIKey_fail_empty():
	data = Data()
	data.setup()
	assert data.validateAPIKey("") == False
	del data

def test_getAPIKeys_includes_created():
	data = Data()
	data.setup()
	created = data.createAPIKey("unit-test-agent")
	keys = data.getAPIKeys()
	found = False
	for key in keys:
		if key["_id"] == created["_id"]:
			assert key["agent"] == "unit-test-agent"
			assert key["apikey"] == created["apikey"]
			found = True
			break
	assert found == True
	del data

def test_deleteAPIKey():
	data = Data()
	data.setup()
	created = data.createAPIKey("unit-test-agent")
	assert data.validateAPIKey(created["apikey"]) == True
	assert data.deleteAPIKey(created["_id"]) == True
	assert data.validateAPIKey(created["apikey"]) == False
	del data

def test_deleteAPIKey_fail_bad_id():
	data = Data()
	data.setup()
	assert data.deleteAPIKey("where-is-perry") == False
	del data
