import unittest
from homewareTasks import *
from data import Data

class Test_tasks(unittest.TestCase):

	# def test_verifyTasks(self):
	# 	data = Data()
	# 	task = {
	# 		"title": "",
	# 		"description": "",
	# 		"triggers": {
	# 		  "trigger": {
	# 			"type": "or",
	# 			"parent": "triggers",
	# 			"operation": [
	# 			  "1594745648295",
	# 			  "1594746507144"
	# 			]
	# 		  },
	# 		  "1594745648295": {
	# 			"type": "d2b",
	# 			"parent": "1594745594679",
	# 			"operation": "light001:on:=:true"
	# 		  },
	# 		  "1594746507144": {
	# 			"type": "d2b",
	# 			"parent": "1594745594679",
	# 			"operation": "light002:on:=:true"
	# 		  }
	# 		},
	# 		"target": [
	# 			{
	# 				"device": "light003",
	# 				"param": "on",
	# 				"value": True
	# 			}
	# 		]
	# 	}
	# 	data.createTask(task)
	# 	device = {
	# 		"attributes": {
	# 		  "commandOnlyOnOff": True,
	# 		  "queryOnlyOnOff": True,
	# 		  "commandOnlyBrightness": True
	# 		},
	# 		"deviceInfo": {
	# 		  "hwVersion": "1.0",
	# 		  "swVersion": "1.0",
	# 		  "manufacturer": "Homeware",
	# 		  "model": "Homeware Lamp 2.0"
	# 		},
	# 		"id": "light001",
	# 		"name": {
	# 		  "defaultNames": [
	# 			"Lamp"
	# 		  ],
	# 		  "nicknames": [
	# 			"Lamp"
	# 		  ],
	# 		  "name": "Test Lamp"
	# 		},
	# 		"traits": [
	# 		  "action.devices.traits.OnOff",
	# 		  "action.devices.traits.Brightness"
	# 		],
	# 		"type": "action.devices.types.LIGHT"
	# 	}
	# 	data.createDevice({"device":device,"status":{ "on": True }})
	# 	device['id'] = "light002"
	# 	data.createDevice({"device":device,"status":{ "on": True }})
	# 	device['id'] = "light003"
	# 	data.createDevice({"device":device,"status":{ "on": False }})
	# 	self.assertFalse(data.getStatus()['light003']['on'])
	# 	verifyTasks()
	# 	self.assertTrue(data.getStatus()['light003']['on'])

	def test_operationExecutor(self):
		triggers = {
		  "trigger": {
			"type": "or",
			"parent": "triggers",
			"operation": [
			  1594745594679
			]
		  },
		  "1594745594679": {
			"type": "and",
			"parent": "trigger",
			"operation": [
			  "1594745648295",
			  "1594746507144"
			]
		  },
		  "1594745648295": {
			"type": "d2b",
			"parent": "1594745594679",
			"operation": "light001:on:=:true"
		  },
		  "1594746507144": {
			"type": "d2b",
			"parent": "1594745594679",
			"operation": "light002:on:=:true"
		  }
		}
		status = {
			"light001": {
				"on": True
			},
			"light002": {
				"on": True
			}
		}
		self.assertTrue(operationExecutor("trigger",triggers,status))

	def test_orExecutor(self):
		triggers = {
		  "trigger": {
			"type": "or",
			"parent": "triggers",
			"operation": [
			  "1594745648295",
			  "1594746507144"
			]
		  },
		  "1594745648295": {
			"type": "d2b",
			"parent": "1594745594679",
			"operation": "light001:on:=:true"
		  },
		  "1594746507144": {
			"type": "d2b",
			"parent": "1594745594679",
			"operation": "light002:on:=:true"
		  }
		}
		status = {
			"light001": {
				"on": False
			},
			"light002": {
				"on": False
			}
		}
		self.assertFalse(orExecutor(triggers['trigger']['operation'],triggers,status))
		status = {
			"light001": {
				"on": True
			},
			"light002": {
				"on": False
			}
		}
		self.assertTrue(orExecutor(triggers['trigger']['operation'],triggers,status))
		status = {
			"light001": {
				"on": False
			},
			"light002": {
				"on": True
			}
		}
		self.assertTrue(orExecutor(triggers['trigger']['operation'],triggers,status))
		status = {
			"light001": {
				"on": True
			},
			"light002": {
				"on": True
			}
		}
		self.assertTrue(orExecutor(triggers['trigger']['operation'],triggers,status))

	def test_andExecutor(self):
		triggers = {
		  "trigger": {
			"type": "and",
			"parent": "triggers",
			"operation": [
			  "1594745648295",
			  "1594746507144"
			]
		  },
		  "1594745648295": {
			"type": "d2b",
			"parent": "1594745594679",
			"operation": "light001:on:=:true"
		  },
		  "1594746507144": {
			"type": "d2b",
			"parent": "1594745594679",
			"operation": "light002:on:=:true"
		  }
		}
		status = {
			"light001": {
				"on": False
			},
			"light002": {
				"on": False
			}
		}
		self.assertFalse(andExecutor(triggers['trigger']['operation'],triggers,status))
		status = {
			"light001": {
				"on": True
			},
			"light002": {
				"on": False
			}
		}
		self.assertFalse(andExecutor(triggers['trigger']['operation'],triggers,status))
		status = {
			"light001": {
				"on": False
			},
			"light002": {
				"on": True
			}
		}
		self.assertFalse(andExecutor(triggers['trigger']['operation'],triggers,status))
		status = {
			"light001": {
				"on": True
			},
			"light002": {
				"on": True
			}
		}
		self.assertTrue(andExecutor(triggers['trigger']['operation'],triggers,status))

	def test_d2bExecutor(self):
		status = {
			"light": {
				"on": True
			}
		}
		self.assertTrue(d2bExecutor("light:on:=:true",status))
		self.assertFalse(d2bExecutor("light:on:=:false",status))

	def test_d2iExecutor(self):
		status = {
			"light" : {
				"brightness": 10
			}
		}
		self.assertTrue(d2iExecutor("light:brightness:=:10",status))
		self.assertTrue(d2iExecutor("light:brightness:<:12",status))
		self.assertTrue(d2iExecutor("light:brightness:>:9",status))
		self.assertTrue(d2iExecutor("light:brightness:<=:10",status))
		self.assertTrue(d2iExecutor("light:brightness:>=:10",status))
		self.assertFalse(d2iExecutor("light:brightness:=:11",status))
		self.assertFalse(d2iExecutor("light:brightness:<:9",status))
		self.assertFalse(d2iExecutor("light:brightness:>:12",status))
		self.assertFalse(d2iExecutor("light:brightness:<=:9",status))
		self.assertFalse(d2iExecutor("light:brightness:>=:12",status))

	def test_d2lExecutor(self):
		status = {
			"thing": {
				"mode": "happy"
			}
		}
		self.assertTrue(d2lExecutor("thing:mode:=:happy",status))
		self.assertFalse(d2lExecutor("thing:mode:=:sad",status))

	def test_d2dExecutor(self):
		status = {
			"light001" : {
				"on": True,
				"brightness": 10
			},
			"light002" : {
				"on": True,
				"brightness": 20
			}
		}
		self.assertTrue(d2dExecutor("light001:on:=:light002:on",status))
		self.assertFalse(d2dExecutor("light001:brightness:=:light002:brightness",status))
		self.assertTrue(d2dExecutor("light001:brightness:<:light002:brightness",status))
		self.assertFalse(d2dExecutor("light001:brightness:>:light002:brightness",status))
		self.assertTrue(d2dExecutor("light001:brightness:<=:light002:brightness",status))
		self.assertFalse(d2dExecutor("light001:brightness:>=:light002:brightness",status))

	def test_timeExecutor(self):
		ts = time.localtime(time.time())
		h = ts.tm_hour
		m = ts.tm_min
		pw = ts.tm_wday
		week = [1,2,3,4,5,6,0]
		w = str(week[pw])
		self.assertTrue(timeExecutor(str(h) + ":" + str(m) + ":" + str(w) + ":"))

if __name__ == "__main__":
	unittest.main()
