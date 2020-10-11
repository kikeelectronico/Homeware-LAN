import paho.mqtt.publish as publish
import json

class Commands:

    def __init__(self, data):
        self.hData = data
        self.hData.log('Log', 'Starting commands executor')

    def setParams(self, device, params):
        self.device = device
        self.params = params

    def saveAndSend(self, input, output):
        if input in self.params.keys():
            self.hData.updateParamStatus(self.device, output, self.params[input])
            publish.single("device/"+self.device+"/"+output, self.params[input], hostname="localhost")
            publish.single("device/"+self.device, json.dumps(self.hData.getStatus()[self.device]), hostname="localhost")

    def ArmDisarm(self):
        if 'arm' in self.params.keys():
            if self.params.arm:
                publish.single("device/"+self.device+"/command", 'arm', hostname="localhost")
            else:
                publish.single("device/"+self.device+"/command", 'disarm', hostname="localhost")
        if 'cancel' in self.params.keys():
            if self.params.cancel:
                publish.single("device/"+self.device+"/command", 'disarm', hostname="localhost")
        self.saveAndSend('armLevel','currentArmLevel')

    def BrightnessAbsolute(self):
        self.saveAndSend('brightness','brightness')

    def ColorAbsolute(self):
        if 'color' in self.params.keys():
            self.hData.updateParamStatus(self.device, 'color', self.params['color'])
            publish.single("device/"+self.device+"/color", json.dumps(self.params['color']), hostname="localhost")
            publish.single("device/"+self.device, json.dumps(self.hData.getStatus()[self.device]), hostname="localhost")

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
            set_point = self.hData.getStatus()[this.device].thermostatTemperatureSetpoint
            self.hData.updateParamStatus(self.device, 'thermostatTemperatureSetpoint', set_point + self.params['thermostatTemperatureRelativeDegree'])
            publish.single("device/"+self.device+"/thermostatTemperatureSetpoint", set_point + self.params['thermostatTemperatureRelativeDegree'], hostname="localhost")
            publish.single("device/"+self.device, json.dumps(self.hData.getStatus()[self.device]), hostname="localhost")
