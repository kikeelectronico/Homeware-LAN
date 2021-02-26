import paho.mqtt.publish as publish
import json

import hostname

class Commands:

    def __init__(self, data):
        self.data_conector = data
        self.data_conector.log('Log', 'Starting commands executor')

    def setParams(self, device, params):
        self.device = device
        self.params = params

    def saveAndSend(self, input, output):
        if input in self.params.keys():
            self.data_conector.updateParamStatus(
                self.device, output, self.params[input])

    def sendCommand(self, param, command):
        if param in self.params.keys():
            if self.params[param]:
                publish.single("device/" + self.device +
                               "/command", command, hostname="localhost")

    def sendDobleCommand(self, param, true_command, false_command):
        if param in self.params.keys():
            if self.params[param]:
                publish.single("device/" + self.device + "/command",
                               true_command, hostname="localhost")
            else:
                publish.single("device/" + self.device + "/command",
                               false_command, hostname="localhost")

    def ArmDisarm(self):
        # armFailure
        # cancelArmingRestricted
        # disarmFailure

        status = self.data_conector.getStatus()
        if 'armLevel' in self.params.keys():
            if status[self.device]['currentArmLevel'] == self.params['armLevel']:
                if self.params['arm']:
                    return "alreadyArmed"
                else:
                    return "alreadyDisarmed"
            else:
                self.data_conector.updateParamStatus(self.device,
                                                     'currentArmLevel',
                                                     self.params['armLevel'])
                publish.single("device/" + self.device + "/command",
                               "arm",
                               hostname="localhost")

        if 'arm' in self.params.keys():
            if not self.params['arm']:
                publish.single("device/" + self.device + "/command",
                               "disarm",
                               hostname="localhost")

        if 'cancel' in self.params.keys():
            if self.params['cancel'] and not status[self.device]['isArmed']:
                publish.single("device/" + self.device + "/command",
                               "disarm",
                               hostname="localhost")
            else:
                return "cancelTooLate"

        return ""

    def BrightnessAbsolute(self):
        if 'brightness' in self.params.keys():
            self.data_conector.updateParamStatus(
                self.device, 'brightness', self.params['brightness'])
        return ""

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
        return ""

    def OnOff(self):
        status = self.data_conector.getStatus()
        if 'on' in self.params.keys():
            if status[self.device]['on'] == self.params['on']:
                if self.params['on']:
                    return "alreadyOn"
                else:
                    return "alreadyOff"
            else:
                self.data_conector.updateParamStatus(
                    self.device, 'on', self.params['on'])
        return ""

    def ThermostatTemperatureSetpoint(self):
        if 'thermostatTemperatureSetpoint' in self.params.keys():
            status = self.data_conector.getStatus()[self.device]
            mode = status['thermostatMode']
            if mode == "auto":
                return "inAutoMode"
            elif mode == "dry":
                return "inDryMode"
            elif mode == "eco":
                return "inEcoMode"
            elif mode == "fan-only":
                return "inFanOnlyMode"
            elif mode == "heatcool":
                return "inHeatOrCool"
            elif mode == "off":
                return "inOffMode"
            elif mode == "purifier":
                return "inPurifierMode"
            else:
                device = self.data_conector.getDevices()[self.device]
                attributes = device['attributes']
                set_point = self.params["thermostatTemperatureSetpoint"]
                if set_point > attributes['thermostatTemperatureRange']['maxThresholdCelsius']:
                    set_point = attributes['thermostatTemperatureRange']['maxThresholdCelsius']
                elif set_point < attributes['thermostatTemperatureRange']['minThresholdCelsius']:
                    set_point = attributes['thermostatTemperatureRange']['minThresholdCelsius']
                self.data_conector.updateParamStatus(
                    self.device,
                    "thermostatTemperatureSetpoint",
                    set_point)
                if set_point > attributes['minThresholdCelsius']:
                    return "alreadyAtMin"
                elif set_point < attributes['maxThresholdCelsius']:
                    return "alreadyAtMax"
        return ""

    def ThermostatSetMode(self):
        list = ['off', 'heat', 'cool', 'on', 'heatcool',
                'auto', 'fan-only', 'purifier', 'eco', 'drt']
        if 'thermostatMode' in self.params.keys():
            if self.params['thermostatMode'] in list:
                self.data_conector.updateParamStatus(
                    self.device,
                    "activeThermostatMode",
                    self.params["thermostatMode"])
                self.data_conector.updateParamStatus(
                    self.device,
                    "thermostatMode",
                    self.params["thermostatMode"])
            else:
                return "notSupported"

        return ""

    def ThermostatTemperatureSetRange(self):
        if 'thermostatTemperatureSetpointHigh' in self.params.keys():
            device = self.data_conector.getDevices()[self.device]
            attributes = device['attributes']
            delta = self.params['thermostatTemperatureSetpointHigh'] - \
                self.params['thermostatTemperatureSetpointLow']
            if delta > attributes['bufferRangeCelsius']:
                self.data_conector.updateParamStatus(
                    self.device, 'thermostatTemperatureSetpointHigh',
                    self.params['thermostatTemperatureSetpointHigh'])
                self.data_conector.updateParamStatus(
                    self.device, 'thermostatTemperatureSetpointLow',
                    self.params['thermostatTemperatureSetpointLow'])
            else:
                return "rangeTooClose"
        else:
            return ""

    def TemperatureRelative(self):
        # valueOutOfRange
        status = self.data_conector.getStatus()
        device = self.data_conector.getDevices()[self.device]
        attributes = device['attributes']
        if 'thermostatTemperatureRelativeDegree' in self.params.keys():
            mode = status[self.device]['thermostatMode']
            set_point = status[self.device]['thermostatTemperatureSetpoint']
            if mode == "auto":
                return "inAutoMode"
            elif mode == "dry":
                return "inDryMode"
            elif mode == "eco":
                return "inEcoMode"
            elif mode == "fan-only":
                return "inFanOnlyMode"
            elif mode == "heatcool":
                return "inHeatOrCool"
            elif mode == "off":
                return "inOffMode"
            elif mode == "purifier":
                return "inPurifierMode"
            elif self.params['thermostatTemperatureRelativeDegree'] > 0 and set_point == attributes['thermostatTemperatureRange']['maxThresholdCelsius']:
                return "alreadyAtMax"
            elif self.params['thermostatTemperatureRelativeDegree'] < 0 and set_point == attributes['thermostatTemperatureRange']['minThresholdCelsius']:
                return "alreadyAtMin"
            else:                
                new_set_point = set_point + \
                    self.params['thermostatTemperatureRelativeDegree']
                self.data_conector.updateParamStatus(
                    self.device,
                    'thermostatTemperatureSetpoint',
                    new_set_point)
        return ""

    def ActivateScene(self):
        self.saveAndSend('deactivate', 'deactivate')
        return ""

    def Cook(self):
        # actionUnavailableWhileRunning
        # unknownFoodPreset
        self.saveAndSend('cookingMode', 'currentCookingMode')
        self.saveAndSend('foodPreset', 'currentFoodPreset')
        self.saveAndSend('quantity', 'currentFoodQuantity')
        self.saveAndSend('unit', 'currentFoodUnit')
        self.sendDobleCommand('start', 'start', 'stop')

    def SetFanSpeed(self):        
        self.saveAndSend('fanSpeed', 'currentFanSpeedSetting')
        if 'fanSpeedPercent' in self.params.keys():
            status = self.data_conector.getStatus()
            if status['currentFanSpeedPercent'] == 100 and self.params['fanSpeedPercent'] == 100:
                return "maxSpeedReached"
            elif status['currentFanSpeedPercent'] == 0 and self.params['fanSpeedPercent'] == 0:
                return "minSpeedReached"
            else:
                self.saveAndSend('fanSpeedPercent', 'currentFanSpeedPercent')
            

    def SetFanSpeedRelativeSpeed(self):
        # maxSpeedReached
        # minSpeedReached
        if 'fanSpeedRelativeWeight' in self.params.keys():
            status = self.data_conector.getStatus()
            speed = status[self.device]['currentFanSpeedPercent']
            new_speed = speed + self.params['fanSpeedRelativeWeight']
            self.data_conector.updateParamStatus(
                self.device, 'currentFanSpeedPercent', new_speed)
        if 'fanSpeedRelativePercent' in self.params.keys():
            status = self.data_conector.getStatus()
            speed = status[self.device]['currentFanSpeedPercent']
            new_speed = speed + self.params['fanSpeedRelativePercent']
            self.data_conector.updateParamStatus(
                self.device, 'currentFanSpeedPercent', new_speed)

    def Reverse(self):
        publish.single("device/" + self.device + "/command",
                       'reverse', hostname="localhost")
        return ""

    def Fill(self):
        self.saveAndSend('fillLevel', 'currentFillLevel')
        self.sendDobleCommand('fill', 'fill', 'drain')
        return ""

    def SetHumidity(self):
        # maxSettingReached
        # minSettingReached
        self.saveAndSend('humidity', 'humiditySetpointPercent')

    def HumidityRelative(self):
        # maxSettingReached
        # minSettingReached
        if 'humidityRelativePercent' in self.params.keys():
            status = self.data_conector.getStatus()
            humidity = status[self.device]['humiditySetpointPercent']
            new_humidity = humidity + self.params['humidityRelativePercent']
            self.data_conector.updateParamStatus(
                self.device, 'humiditySetpointPercent', new_humidity)
        if 'humidityRelativeWeight' in self.params.keys():
            status = self.data_conector.getStatus()
            humidity = status[self.device]['humiditySetpointPercent']
            new_humidity = humidity + self.params['humidityRelativeWeight']
            self.data_conector.updateParamStatus(
                self.device, 'humiditySetpointPercent', new_humidity)

    def Locate(self):
        # unableToLocateDevice
        self.sendCommand('silence', 'silence')

    def LockUnlock(self):
        # lockFailure
        # lockedState
        # unlockFailure
        status = self.data_conector.getStatus()
        if 'lock' in self.params.keys():
            if status[self.device]['isLocked'] == self.params['lock']:
                if self.params['lock']:
                    return "alreadyLocked"
                else:
                    return "alreadyUnlocked"
            else:
                if self.params['lock']:
                    publish.single("device/" + self.device + "/command",
                                   'lock', hostname="localhost")
                else:
                    publish.single("device/" + self.device + "/command",
                                   'unlock', hostname="localhost")
        return ""

    def OpenClose(self):
        # discreteOnlyOpenClose
        self.saveAndSend('openPercent', 'openPercent')

    def OpenCloseRelative(self):
        # discreteOnlyOpenClose
        status = self.data_conector.getStatus()
        if 'openRelativePercent' in self.params.keys():
            open = status[self.device]['openPercent']
            new_open = open + self.params['openRelativePercent']
            if status[self.device]['openPercent'] == 100 and new_open == 100:
                return "alreadyOpen"
            else:
                self.data_conector.updateParamStatus(
                    self.device, 'openPercent', new_open)
        return ""

    def RotateAbsolute(self):
        self.saveAndSend('rotationPercent', 'rotationPercent')
        self.saveAndSend('rotationDegrees', 'rotationDegrees')
        return ""

    def StartStop(self):
        status = self.data_conector.getStatus()
        if 'start' in self.params.keys():
            if status[self.device]['isRunning'] == self.params['start']:
                if self.params['start']:
                    return "alreadyStarted"
                else:
                    return "alreadyStopped"
            else:
                if self.params['start']:
                    publish.single("device/" + self.device + "/command",
                                   'start',
                                   hostname="localhost")
                else:
                    publish.single("device/" + self.device + "/command",
                                   'stop',
                                   hostname="localhost")
        return ""

    def PauseUnpause(self):
        # unpausableState

        status = self.data_conector.getStatus()
        if 'pause' in self.params.keys():
            if status[self.device]['isPaused'] == self.params['pause']:
                if self.params['pause']:
                    return "alreadyPaused"
                else:
                    return ""
            else:
                if self.params['pause']:
                    publish.single("device/" + self.device + "/command",
                                   'pause',
                                   hostname="localhost")
                else:
                    publish.single("device/" + self.device + "/command",
                                   'unpause',
                                   hostname="localhost")

    def SetTemperature(self):
        # alreadyAtMax
        # alreadyAtMin
        self.saveAndSend('temperature', 'temperatureSetpointCelsius')

    def TimerStart(self):
        # startRequiresTime
        self.saveAndSend('timerTimeSec', 'timerRemainingSec')

    def TimerPause(self):
        self.data_conector.updateParamStatus(self.device, 'timerPaused', True)
        return ""

    def TimerResume(self):
        self.data_conector.updateParamStatus(self.device, 'timerPaused', False)
        return ""

    def TimerCancel(self):
        self.data_conector.updateParamStatus(
            self.device, 'timerRemainingSec', 0)
        return ""

    def SetToggles(self):
        if 'updateToggleSettings' in self.params.keys():
            toggles = self.params['updateToggleSettings'].keys()
            state = self.data_conector.getStatus(
            )[self.device]['currentToggleSettings']
            for toggle in toggles:
                state[toggle] = self.params['updateToggleSettings'][toggle]
            self.data_conector.updateParamStatus(
                self.device, 'currentToggleSettings', state)
        return ""

    def SetModes(self):
        # notSupported
        if 'updateModeSettings' in self.params.keys():
            modes = self.params['updateModeSettings'].keys()
            state = self.data_conector.getStatus(
            )[self.device]['currentModeSettings']
            for mode in modes:
                state[mode] = self.params['updateModeSettings'][mode]
            self.data_conector.updateParamStatus(
                self.device, 'currentModeSettings', state)
