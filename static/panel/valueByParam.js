
var valuesForParam = {
  'thermostatTemperatureAmbient': {
    "type": "d2i"
  },
  'thermostatTemperatureSetpoint': {
    "type": "d2i"
  },
  'thermostatHumidityAmbient': {
    "type": "d2i"
  },
  'thermostatMode': {
    "type": "d2l",
    "select": ["cool","heat","off","on","heatcool","auto","fan-only","purifier","eco","dry"]
  },
  'on': {
    "type": "d2b",
    "select": ["true","false"]
  },
  'deactivate': {
    "type": "d2b",
    "select": ["true","false"]
  },
  'brightness': {
    "type": "d2i"
  },
  'online': {
    "type": "d2b",
    "select": ["true","false"]
  },
  'color': {
    "type": "d2c"
  },
}

function getValuesByParam(param){
  return Object.keys(valuesForParam).includes(param) ? valuesForParam[param] : param
}
