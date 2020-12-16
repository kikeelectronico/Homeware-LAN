import paho.mqtt.publish as publish
import json

class Commands:

	def __init__(self, data):
		self.data_conector = data
		self.data_conector.log('Log', 'Starting commands executor')

	def setParams(self, device, params):
		self.device = device
		self.params = params

	def saveAndSend(self, input, output):
		if input in self.params.keys():
			self.data_conector.updateParamStatus(self.device, output, self.params[input])

	def sendCommand(self,param,command):
		if param in self.params.keys():
			if self.params[param]:
				publish.single("device/"+self.device+"/command", command, hostname="localhost")

	def sendDobleCommand(self,param,true_command,false_command):
		if param in self.params.keys():
			if self.params[param]:
				publish.single("device/"+self.device+"/command", true_command, hostname="localhost")
			else:
				publish.single("device/"+self.device+"/command", false_command, hostname="localhost")

	def ArmDisarm(self):
		self.sendDobleCommand('arm','arm','disarm')
		self.sendCommand('cancel','disarm')
		self.saveAndSend('armLevel','currentArmLevel')

	def BrightnessAbsolute(self):
		self.saveAndSend('brightness','brightness')

	def ColorAbsolute(self):
		if 'color' in self.params.keys():
			color = {}
			if 'temperature' in self.params['color'].keys():
				color['temperature'] = self.params['color']['temperature']
				color['temperatureK'] = self.params['color']['temperature']
			if 'spectrumRGB' in self.params['color'].keys():
				color['spectrumRGB'] = self.params['color']['spectrumRGB']
				color['spectrumRgb'] = self.params['color']['spectrumRGB']
			if 'spectrumHSV' in self.params['color'].keys():
				color['spectrumHSV'] = self.params['color']['spectrumHSV']
				color['spectrumHsv'] = self.params['color']['spectrumHSV']
			self.data_conector.updateParamStatus(self.device, 'color', color)

	def OnOff(self):
		self.saveAndSend('on','on')

	def ThermostatTemperatureSetpoint(self):
		self.saveAndSend('thermostatTemperatureSetpoint','thermostatTemperatureSetpoint')

	def ThermostatSetMode(self):
		self.saveAndSend('thermostatMode','activeThermostatMode')
		self.saveAndSend('thermostatMode','thermostatMode')

	def ThermostatTemperatureSetRange(self):
		self.saveAndSend('thermostatTemperatureSetpointHigh','thermostatTemperatureSetpointHigh')
		self.saveAndSend('thermostatTemperatureSetpointLow','thermostatTemperatureSetpointLow')

	def TemperatureRelative(self):
		if 'thermostatTemperatureRelativeDegree' in self.params.keys():
			set_point = self.data_conector.getStatus()[self.device]['thermostatTemperatureSetpoint']
			self.data_conector.updateParamStatus(self.device, 'thermostatTemperatureSetpoint', set_point + self.params['thermostatTemperatureRelativeDegree'])

	def ActivateScene(self):
		self.saveAndSend('deactivate','deactivate')

	def Cook(self):
		self.saveAndSend('cookingMode','currentCookingMode')
		self.saveAndSend('foodPreset','currentFoodPreset')
		self.saveAndSend('quantity','currentFoodQuantity')
		self.saveAndSend('unit','currentFoodUnit')
		self.sendDobleCommand('start','start','stop')

	def SetFanSpeed(self):
		self.saveAndSend('fanSpeed','currentFanSpeedSetting')
		self.saveAndSend('fanSpeedPercent','currentFanSpeedPercent')

	def SetFanSpeedRelativeSpeed(self):
		if 'fanSpeedRelativeWeight' in self.params.keys():
			speed = self.data_conector.getStatus()[self.device]['currentFanSpeedPercent']
			self.data_conector.updateParamStatus(self.device, 'currentFanSpeedPercent', speed + self.params['fanSpeedRelativeWeight'])
		if 'fanSpeedRelativePercent' in self.params.keys():
			speed = self.data_conector.getStatus()[self.device]['currentFanSpeedPercent']
			self.data_conector.updateParamStatus(self.device, 'currentFanSpeedPercent', speed + self.params['fanSpeedRelativePercent'])

	def Reverse(self):
		publish.single("device/"+self.device+"/command", 'reverse', hostname="localhost")

	def Fill(self):
		self.saveAndSend('fillLevel','currentFillLevel')
		self.sendDobleCommand('fill','fill','drain')

	def SetHumidity(self):
		self.saveAndSend('humidity','humiditySetpointPercent')

	def HumidityRelative(self):
		if 'humidityRelativePercent' in self.params.keys():
			humidity = self.data_conector.getStatus()[self.device]['humiditySetpointPercent']
			self.data_conector.updateParamStatus(self.device, 'humiditySetpointPercent', humidity + self.params['humidityRelativePercent'])
		if 'humidityRelativeWeight' in self.params.keys():
			humidity = self.data_conector.getStatus()[self.device]['humiditySetpointPercent']
			self.data_conector.updateParamStatus(self.device, 'humiditySetpointPercent', humidity + self.params['humidityRelativeWeight'])


	def Locate(self):
		self.sendCommand('silence','silence')

	def LockUnlock(self):
		self.sendDobleCommand('lock','lock','unlock')

	def OpenClose(self):
		self.saveAndSend('openPercent','openPercent')

	def OpenCloseRelative(self):
		if 'openRelativePercent' in self.params.keys():
			open = self.data_conector.getStatus()[self.device]['openPercent']
			self.data_conector.updateParamStatus(self.device, 'openPercent', open + self.params['openRelativePercent'])

	def RotateAbsolute(self):
		self.saveAndSend('rotationPercent','rotationPercent')
		self.saveAndSend('rotationDegrees','rotationDegrees')

	def StartStop(self):
		self.sendDobleCommand('start','start','stop')

	def PauseUnpause(self):
		self.sendDobleCommand('pause','pause','unpause')

	def SetTemperature(self):
		self.saveAndSend('temperature','temperatureSetpointCelsius')

	def TimerStart(self):
		self.saveAndSend('timerTimeSec','timerRemainingSec')

	def TimerPause(self):
		self.data_conector.updateParamStatus(self.device, 'timerPaused', True)

	def TimerResume(self):
		self.data_conector.updateParamStatus(self.device, 'timerPaused', False)

	def TimerCancel(self):
		self.data_conector.updateParamStatus(self.device, 'timerRemainingSec', 0)


	def SetToggles(self):
		if 'updateToggleSettings' in self.params.keys():
			toggles = self.params['updateToggleSettings'].keys()
			state = self.data_conector.getStatus()[self.device]['currentToggleSettings']
			for toggle in toggles:
				state[toggle] = self.params['updateToggleSettings'][toggle]
			self.data_conector.updateParamStatus(self.device, 'currentToggleSettings', state)


	def SetModes(self):
		if 'updateModeSettings' in self.params.keys():
			modes = self.params['updateModeSettings'].keys()
			state = self.data_conector.getStatus()[self.device]['currentModeSettings']
			for mode in modes:
				state[mode] = self.params['updateModeSettings'][mode]
			self.data_conector.updateParamStatus(self.device, 'currentModeSettings', state)
