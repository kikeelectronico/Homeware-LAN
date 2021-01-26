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

        # Error checker
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
        self.saveAndSend('brightness', 'brightness')
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
        # alreadyAtMax
        # alreadyAtMin
        # inAutoMode
        # inDryMode
        # inEcoMode
        # inFanOnlyMode
        # inHeatOrCool
        # inHumidifierMode
        # inOffMode
        # inPurifierMode
        # valueOutOfRange
        self.saveAndSend('thermostatTemperatureSetpoint',
                         'thermostatTemperatureSetpoint')

    def ThermostatSetMode(self):
        # notSupported
        self.saveAndSend('thermostatMode', 'activeThermostatMode')
        self.saveAndSend('thermostatMode', 'thermostatMode')

    def ThermostatTemperatureSetRange(self):
        # rangeTooClose
        self.saveAndSend('thermostatTemperatureSetpointHigh',
                         'thermostatTemperatureSetpointHigh')
        self.saveAndSend('thermostatTemperatureSetpointLow',
                         'thermostatTemperatureSetpointLow')

    def TemperatureRelative(self):
        # alreadyAtMax
        # alreadyAtMin
        # inAutoMode
        # inDryMode
        # inEcoMode
        # inFanOnlyMode
        # inHeatOrCool
        # inHumidifierMode
        # inOffMode
        # inPurifierMode
        # valueOutOfRange
        if 'thermostatTemperatureRelativeDegree' in self.params.keys():
            status = self.data_conector.getStatus()
            set_point = status[self.device]['thermostatTemperatureSetpoint']
            new_set_point = set_point + \
                self.params['thermostatTemperatureRelativeDegree']
            self.data_conector.updateParamStatus(
                self.device, 'thermostatTemperatureSetpoint', new_set_point)

    def ActivateScene(self):
        self.saveAndSend('deactivate', 'deactivate')
        return ""

    def Cook(self):
        # actionUnavailableWhileRunning
        # alreadyStarted
        # alreadyStopped
        # unknownFoodPreset
        self.saveAndSend('cookingMode', 'currentCookingMode')
        self.saveAndSend('foodPreset', 'currentFoodPreset')
        self.saveAndSend('quantity', 'currentFoodQuantity')
        self.saveAndSend('unit', 'currentFoodUnit')
        self.sendDobleCommand('start', 'start', 'stop')

    def SetFanSpeed(self):
        # maxSpeedReached
        # minSpeedReached
        self.saveAndSend('fanSpeed', 'currentFanSpeedSetting')
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
        # alreadyLocked
        # alreadyUnlocked
        # lockFailure
        # lockedState
        # unlockFailure
        self.sendDobleCommand('lock', 'lock', 'unlock')

    def OpenClose(self):
        # alreadyOpen
        # discreteOnlyOpenClose
        self.saveAndSend('openPercent', 'openPercent')

    def OpenCloseRelative(self):
        # alreadyOpen
        # discreteOnlyOpenClose
        if 'openRelativePercent' in self.params.keys():
            status = self.data_conector.getStatus()
            open = status[self.device]['openPercent']
            new_open = open + self.params['openRelativePercent']
            self.data_conector.updateParamStatus(
                self.device, 'openPercent', new_open)

    def RotateAbsolute(self):
        self.saveAndSend('rotationPercent', 'rotationPercent')
        self.saveAndSend('rotationDegrees', 'rotationDegrees')
        return ""

    def StartStop(self):
        # alreadyStarted
        # alreadyStopped
        self.sendDobleCommand('start', 'start', 'stop')

    def PauseUnpause(self):
        # alreadyPaused
        # unpausableState
        self.sendDobleCommand('pause', 'pause', 'unpause')

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
