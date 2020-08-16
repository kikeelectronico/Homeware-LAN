
var deviceCoolName = {
  "action.devices.types.AC_UNIT": 'AC unit',
  "action.devices.types.AIRFRESHENER": 'Air freshener',
  "action.devices.types.AIRPURIFIER": 'Air purifier',
  "action.devices.types.AWNING": 'Awing',
  "action.devices.types.BATHTUB": 'Bathtub',
  "action.devices.types.BED": 'Bed',
  "action.devices.types.BLENDER": 'Blender',
  "action.devices.types.BLINDS": 'Blinds',
  "action.devices.types.BOILER": 'Boiler',
  "action.devices.types.CAMERA": 'Camera',
  "action.devices.types.CLOSET": 'Closet',
  "action.devices.types.COFFE_MAKER": 'Coffe maker',
  "action.devices.types.COOKTOP": 'Cooktop',
  "action.devices.types.CURTAIN": 'Curtain',
  "action.devices.types.DEHUMIDIFIER": 'Dehumidifier',
  "action.devices.types.DEHYDRATOR": 'Dehydrator',
  "action.devices.types.DISHWASHER": 'Dishwasher',
  "action.devices.types.DOOR": 'Door',
  "action.devices.types.DRYER": 'Dryer',
  "action.devices.types.DRAWER": 'Drawer',
  "action.devices.types.FAN": 'Fan',
  "action.devices.types.FIREPLACE": 'Fireplace',
  "action.devices.types.FRYER": 'Fryer',
  "action.devices.types.GARAGE": 'Garage',
  "action.devices.types.GATE": 'Gate',
  "action.devices.types.GRILL": 'Grill (WIP)',
  "action.devices.types.HEATER": 'Heater',
  "action.devices.types.HOOD": 'Hood',
  "action.devices.types.HUMIDIFIER": 'Humidifier',
  "action.devices.types.KETTLE": 'Kettle',
  "action.devices.types.LIGHT": 'Light',
  "action.devices.types.LOCK": 'Lock',
  "action.devices.types.MICROWAVE": 'Microwave',
  "action.devices.types.MULTICOOKER": 'Multicooker',
  "action.devices.types.MOP": 'Mop',
  "action.devices.types.MOWER": 'Mower',
  "action.devices.types.OUTLET": 'Outlet',
  "action.devices.types.OVEN": 'Oven',
  "action.devices.types.PERGOLA": 'Pergola',
  "action.devices.types.PRESSURECOOKER": 'Pressure cooker',
  "action.devices.types.RADIATOR": 'Radiator',
  "action.devices.types.REFRIGERATOR": 'Refrigerator',
  "action.devices.types.SECURITYSYSTEM": 'Security system',
  "action.devices.types.SHOWER": 'Shower',
  "action.devices.types.SOUSVIDE": 'Sous vide',
  "action.devices.types.SHUTTER": 'Shutter',
  "action.devices.types.SPRINKLER": 'Sprinkler',
  "action.devices.types.STANDMIXER": 'Stand mixer',
  "action.devices.types.SWITCH": 'Switch',
  "action.devices.types.THERMOSTAT": 'Thermostat',
  "action.devices.types.VACUUM": 'Vacum',
  "action.devices.types.VALVE": 'Valve',
  "action.devices.types.WASHER": 'Washer',
  "action.devices.types.WATERHEATER": 'Water heater',
  "action.devices.types.WINDOW": 'Window',
  "action.devices.types.SCENE": 'Scene',
  "action.devices.types.YOGURTMAKER": 'Yogurt maker',
}

var traitCoolName = {
  "action.devices.traits.Toggles": 'Toggle',
  "action.devices.traits.ArmDisarm": "Arm or Disarm",
  "action.devices.traits.CameraStream": 'Camera stream',
  "action.devices.traits.ColorSetting": 'Color setting',
  "action.devices.traits.FanSpeed": 'Fan speed',
  "action.devices.traits.LightEffects": 'Light effects',
  "action.devices.traits.Modes": 'Modes',
  "action.devices.traits.OnOff": 'Turn on or Turn off',
  "action.devices.traits.OpenClose": 'Open or Close',
  "action.devices.traits.Rotation": 'Rotation',
  "action.devices.traits.Scene": 'Scene',
  "action.devices.traits.StartStop": 'Start or Stop',
  "action.devices.traits.TemperatureControl": 'Temperature control',
  "action.devices.traits.TemperatureSetting": 'Temperature setting',
  "action.devices.traits.Timer": 'Timer',
  'action.devices.traits.Dock': 'Dock',
  'action.devices.traits.Locator': 'Locator',
  'action.devices.traits.RunCycle': 'Run cycle',
  'action.devices.traits.StatusReport': 'Status report',
  'action.devices.traits.Brightness': 'Brightness',
  'action.devices.traits.LockUnlock': 'Lock or Unlock'

};

var paramCoolName = {
  'thermostatTemperatureAmbient': 'Temperature',
  'thermostatTemperatureSetpoint': 'Set point',
  'thermostatHumidityAmbient': 'Humidity',
  'thermostatMode': 'Mode',
  'on': 'Power',
  'brightness': 'Brightness',
  'online': 'Online',
  'color': 'Color'
}

function getDeviceCoolName(device){
  return Object.keys(deviceCoolName).includes(device) ? deviceCoolName[device] : device
}

function getTraitCoolName(trait){
  return Object.keys(traitCoolName).includes(trait) ? traitCoolName[trait] : trait
}

function getParamCoolName(param){
  return Object.keys(paramCoolName).includes(param) ? paramCoolName[param] : param
}

function putZero(value){
  if(parseInt(value) <= 9){
    return '0' + String(value)
  } else {
    return String(value)
  }
}
