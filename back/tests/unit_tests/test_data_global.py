from data import Data

def test_getVersion():
	data = Data()
	# data.setup()
	assert 'v' == data.getVersion()[0]
	del data