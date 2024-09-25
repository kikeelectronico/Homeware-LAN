from data import Data
import time

def test_getLog():
	data = Data()
	data.setup()
	log = data.getLog()
	assert type(log) == list
	entry = log[0]
	assert "_id" in entry
	assert "agent" in entry
	assert "severity" in entry
	assert "message" in entry
	assert "timestamp" in entry
	del data

def test_log():
	data = Data()
	data.setup()
	ts = time.time()
	entry = {
		"severity": "Log",
		"message": "Running a test",
	}
	data.log(entry["severity"], entry["message"])
	log = data.getLog()
	assert log[-1]["severity"] == entry["severity"]
	assert log[-1]["message"] == entry["message"]
	del data

def test_deleteLog():
	data = Data()
	data.setup()
	assert data.deleteLog() == False
	del data

# ToDo: test setVerbose

def test_isThereAnAlert():
	data = Data()
	data.setup()
	alerts = data.isThereAnAlert()
	assert "alert" in alerts
	assert alerts["alert"] == "clear"

# ToDo: force an alert and test if the flag is raised