from data import Data

def test_getRedisStatus():
	data = Data()
	data.setup()
	status =  {
		'enable': True,
		'status': 'Running',
		'title': 'Redis database'
	}
	assert data.getRedisStatus() == status
	del data

def test_getMongoStatus():
	data = Data()
	data.setup()
	status =  {
		'enable': True,
		'status': 'Running',
		'title': 'Mongo database'
	}
	assert data.getMongoStatus() == status
	del data