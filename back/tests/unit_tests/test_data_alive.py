from data import Data
import time

def test_getAlive():
	data = Data()
	data.setup()
	alive = data.getAlive()
	assert type(alive) == dict
	assert "tasks" in alive
	assert "mqtt" in alive
	del data

def test_updateAlive():
	data = Data()
	data.setup()
	core = "test-core"
	data.updateAlive(core)
	prev_alive = data.getAlive()
	assert type(prev_alive) == dict
	assert core in prev_alive
	time.sleep(1)
	data.updateAlive(core)
	alive = data.getAlive()
	assert type(alive) == dict
	assert core in alive
	assert prev_alive[core] < alive[core]
	del data
