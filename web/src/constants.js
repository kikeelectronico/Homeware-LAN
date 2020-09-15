var root = "http://localhost:5001/"

const deviceReference = {
  devices: {
    "action.devices.types.AC_UNIT": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureSetting"
    ],
    "action.devices.types.AIRFRESHENER": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.AIRPURIFIER": [
      "action.devices.traits.OnOff",
      "action.devices.traits.FanSpeed",
      "action.devices.traits.Modes",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.AWNING": [
      "action.devices.traits.Modes",
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.BATHTUB": [
      "action.devices.traits.Fill",
      "action.devices.traits.OnOff"
    ],
    "action.devices.types.BED": [
      "action.devices.traits.Modes",
      "action.devices.traits.Scene",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.BLENDER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.BLINDS": [
      "action.devices.traits.Modes",
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.BOILER": [
      "action.devices.traits.Modes",
      "action.devices.traits.TemperatureControl",
      "action.devices.traits.OnOff",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.CLOSET": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.COFFE_MAKER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureControl",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.COOKTOP": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.CURTAIN": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.DEHUMIDIFIER": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.HumiditySetting",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.RunCycle",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.DEHYDRATOR": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.DISHWASHER": [
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Modes",
      "action.devices.traits.Toggles",
      "action.devices.traits.RunCycle"
    ],
    "action.devices.types.DOOR": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.DRAWER": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.DRYER": [
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Modes",
      "action.devices.traits.Toggles",
      "action.devices.traits.RunCycle"
    ],
    "action.devices.types.FAN": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.FIREPLACE": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.FRYER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.GARAGE": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.GATE": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.GRILL": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.HEATER": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureSetting",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.HOOD": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.HUMIDIFIER": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.HumiditySetting",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.KETTLE": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureControl",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.LIGHT": [
      "action.devices.traits.OnOff",
      "action.devices.traits.Brightness",
      "action.devices.traits.ColorSetting"
    ],
    "action.devices.types.LOCK": [
      "action.devices.traits.LockUnlock"
    ],
    "action.devices.types.MOP": [
      "action.devices.traits.Dock",
      "action.devices.traits.Locator",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.RunCycle",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.MOWER": [
      "action.devices.traits.Dock",
      "action.devices.traits.Locator",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.RunCycle",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.MICROWAVE": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.MULTICOOKER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.OUTLET": [
      "action.devices.traits.OnOff"
    ],
    "action.devices.types.OVEN": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.TemperatureControl",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.PERGOLA": [
      "action.devices.traits.OpenClose",
      "action.devices.traits.Rotation"
    ],
    "action.devices.types.PRESSURECOOKER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.RADIATOR": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.REFRIGERATOR": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureControl",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.SCENE": [
      "action.devices.traits.Scene"
    ],
    "action.devices.types.SECURITYSYSTEM": [
      "action.devices.traits.ArmDisarm",
      "action.devices.traits.StatusReport"
    ],
    "action.devices.types.SHUTTER": [
      "action.devices.traits.Modes",
      "action.devices.traits.OpenClose",
      "action.devices.traits.Rotation"
    ],
    "action.devices.types.SHOWER": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.TemperatureControl"
    ],
    "action.devices.types.SOUSVIDE": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.SPRINKLER": [
      "action.devices.traits.StartStop"
    ],
    "action.devices.types.STANDMIXER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.SWITCH": [
      "action.devices.traits.OnOff"
    ],
    "action.devices.types.THERMOSTAT": [
      "action.devices.traits.TemperatureSetting"
    ],
    "action.devices.types.VACUUM": [
      "action.devices.traits.Dock",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.VALVE": [
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.WASHER": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.RunCycle",
      "action.devices.traits.StartStop",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.WATERHEATER": [
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureControl",
      "action.devices.traits.Toggles"
    ],
    "action.devices.types.WINDOW": [
      "action.devices.traits.LockUnlock",
      "action.devices.traits.OpenClose"
    ],
    "action.devices.types.YOGURTMAKER": [
      "action.devices.traits.Cook",
      "action.devices.traits.Modes",
      "action.devices.traits.OnOff",
      "action.devices.traits.StartStop",
      "action.devices.traits.Timer",
      "action.devices.traits.Toggles"
    ]
  },
  "traits": {
    "action.devices.traits.OnOff": {
      attributes: {
        commandOnlyOnOff: {
          type: "bool",
          default: false
        },
        queryOnlyOnOff: {
          type: "bool",
          default: false
        }
      },
      param:{
        on: {
          type: "bool",
          default: true,
          manual: false
        }
      }
    },
    "action.devices.traits.Brightness": {
      attributes: {
        commandOnlyBrightness: {
          type: "bool",
          default: false
        }
      },
      param:{
        brightness: {
          type: "int",
          default: 100,
          manual: false
        }
      }
    },
    "action.devices.traits.ColorSetting": {
      attributes: {
        colorModel: {
          type: "string",
          default: "rgb",
          manual: false
        },
        commandOnlyColorSetting: {
            type: "bool",
            default: false,
            manual: false
        },
        colorTemperatureRange: {
          type: "object",
          manual: false,
          default: {
            temperatureMinK: 4000,
            temperatureMaxK: 4200
          },
          content: {
            temperatureMinK: {
              type: "int",
              default: 4000
            },
            temperatureMaxK: {
              type: "int",
              default: 4200
            }
          }
        }
      },
      param:{
        color: {
          type: "object",
          manual: false,
          default: {
            spectrumRgb: 16711935
          },
          content: {
            temperatureK: {
              type: "int",
              default: 4000
            },
            spectrumRGB: {
              type: "int",
              default: 255
            },
            spectrumHSV:{
              type: "object",
              content: {
                hue: {
                  type: "float"
                },
                saturation: {
                  type: "float"
                },
                default: {
                  type: "float"
                }
              }
            }
          }
        }
      }
    },
    "action.devices.traits.TemperatureSetting": {
      attributes: {
        availableThermostatModes: {
          type: "select",
          default: "off,heat,cool"
        },
        thermostatTemperatureRange: {
          type: "object",
          default: {
            minThresholdCelsius: 18,
            maxThresholdCelsius: 34
          }
        },
        thermostatTemperatureUnit: {
          type: "string",
          default: "C"
        },
        bufferRangeCelsius: {
          type: "int",
          default: 2
        },
        commandOnlyTemperatureSetting: {
          type: "bool",
          default: false
        },
        queryOnlyTemperatureSetting: {
          type: "bool",
          default: false
        }
      },
      param:{
        thermostatMode: {
          type: "string",
          default: "off",
          manual: false
        },
        thermostatTemperatureSetpoint: {
          type: "int",
          default: 20,
          manual: false
        },
        thermostatTemperatureAmbient: {
          type: "int",
          default: 22,
          manual: false
        },
        thermostatTemperatureSetpointHigh: {
          type: "int",
          default: 28,
          manual: false
        },
        thermostatTemperatureSetpointLow: {
          type: "int",
          default: 18,
          manual: false
        },
        thermostatHumidityAmbient: {
          type: "int",
          default: 80,
          manual: false
        }
      }
    },
    "action.devices.traits.OpenClose": {
      attributes: {
        discreteOnlyOpenClose: {
          type: "bool"
        },
        openDirection: {
          type: "array"
        },
        queryOnlyOpenClose: {
          type: "bool"
        }
      },
      param:{
        openState: {
          type: "object",
          manual: false,
          content: {
            openPercent:{
              type: "int",
              default: 0
            },
            openDirection:{
              type: "int",
              default: "down"
            }
          }
        }
      }
    },
    "action.devices.traits.Rotation": {
      attributes: {
        commandOnlyRotation: {
          type: "bool"
        },
        supportsContinuousRotation: {
          type: "bool"
        },
        supportsDegrees: {
          type: "bool"
        },
        supportsPercent: {
          type: "bool"
        },
        rotationDegreesRange: {
          type: "object",
          content: {
            rotationDegreesMin: {
              type: "int"
            },
            rotationDegreesMax: {
              type: "int"
            }
          }
        }
      },
      param:{
        rotationPercent: {
          type: "int",
          manual: false,
          default: 0
        },
        rotationDegrees: {
          type: "int",
          manual: false,
          default: 0
        }
      }
    },
    "action.devices.traits.LockUnlock": {
      attributes: {},
      param:{
        isLocked: {
          type: "bool",
          default: false,
          manual: false
        },
        isJammed: {
          type: "bool",
          default: false,
          manual: false
        }
      }
    },
    "action.devices.traits.Scene": {
      attributes: {
        sceneReversible: {
          type: "bool",
          default: true
        }
      },
      param:{
        deactivate: {
          type: "bool",
          default: true,
          manual: false
        }
      }
    },
    "action.devices.traits.Dock": {
      attributes: {},
      param:{
        isDocked: {
          type: "bool",
          default: false,
          manual: false
        }
      }
    },
    "action.devices.traits.Toggles": {
      attributes: {
        availableToggles: {
          type: "strigifyedObject",
          default: []
        },
        commandOnlyToggles: {
          type: "bool",
          default: false
        }
      },
      param: {
      }
    },
    "action.devices.traits.StartStop": {
      attributes: {
        availableZones: {
          type: "array"
        },
        pausable: {
          type: "bool"
        }
      },
      param: {
        isRunning: {
          type: "bool",
          manual: false,
          default: false
        },
        isPaused: {
          type: "bool",
          manual: false,
          default: false
        }
      }
    },
    "action.devices.traits.Timer": {
      attributes: {
        maxTimerLimitSec: {
          type: "int"
        },
        commandOnlyTimer: {
          type: "bool"
        }
      },
      param: {
        timerRemainingSec: {
          type: "int",
          manual: false,
          default: -1
        },
        timerPaused: {
          type: "bool",
          manual: false,
          default: false
        }
      }
    },
    "action.devices.traits.TemperatureControl": {
      attributes: {
        temperatureStepCelsius: {
          type: "int"
        },
        temperatureUnitForUX: {
          type: "string"
        },
        queryOnlyTemperatureControl: {
          type: "bool"
        },
        commandOnlyTemperatureControl: {
          type: "bool"
        },
        temperatureRange: {
          type: "object",
          content: {
            minThresholdCelsius: {
              type: "int"
            },
            maxThresholdCelsius: {
              type: "int"
            }
          }
        }
      },
      param: {
        temperatureSetpointCelsius: {
          type: "int",
          manual: false,
          default: 20
        },
        temperatureAmbientCelsius: {
          type: "int",
          manual: false,
          default: 20
        }
      }
    },
    "action.devices.traits.FanSpeed": {
      attributes: {
        availableFanSpeeds: {
          type: "strigifyedObject",
          default: {
            speeds: [],
            ordered: true
          }
        },
        reversible: {
          type: "bool",
          default: true
        },
        commandOnlyFanSpeed: {
          type: "bool",
          default: true
        }
      },
      param: {
        currentFanSpeedSetting: {
          type: "string",
          manual: false,
          default: ""
        }
      }
    },
    "action.devices.traits.ArmDisarm": {
      attributes: {
        availableArmLevels: {
          type: "strigifyedObject"
        }
      },
      param: {
        isArmed: {
          type: "bool",
          manual: false,
          default: false
        },
        currentArmLevel: {
          type: "string",
          manual: false,
          default: ""
        },
        exitAllowance: {
          type: "int",
          manual: false,
          default: 20
        }
      }
    },
    "action.devices.traits.Fill": {
      attributes: {
        availableFillLevels: {
          type: "strigifyedObject"
        }
      },
      param: {
        isFilled: {
          type: "bool",
          manual: false,
          default: false
        },
        currentFillLevel: {
          type: "string",
          manual: false,
          default: ""
        }
      }
    },
    "action.devices.traits.RunCycle": {
      attributes: {},
      param: {}
    },
    "action.devices.traits.StatusReport": {
      attributes: {},
      param: {}
    },
    "action.devices.traits.Modes": {
      attributes: {
        availableModes: {
          type: "jsoneditor"
        }
      },
      param: {}
    },
    "action.devices.traits.HumiditySetting": {
      attributes: {
        humiditySetpointRange: {
          type: "object",
          content: {
            minPercent: {
              type: "int"
            },
            maxPercent: {
              type: "int"
            }
          }
        },
        commandOnlyHumiditySetting: {
          type: "bool"
        },
        queryOnlyHumiditySetting: {
          type: "bool"
        }
      },
      param: {
        humiditySetpointPercent: {
          type: "int",
          manual: false,
          default: 30
        },
        humidityAmbientPercent: {
          type: "int",
          manual: false,
          default: 20
        }
      }
    },
    "action.devices.traits.Cook": {
      attributes: {
        foodPresets: {
          type: "strigifyedObject"
        },
        supportedCookingModes: {
          type: "selectToArray"
        }
      },
      param: {
        currentCookingMode: {
          type: "string",
          manual: false,
          default: ""
        },
        currentFoodPreset: {
          type: "string",
          manual: false,
          default: ""
        },
        currentFoodQuantity: {
          type: "int",
          manual: false,
          default: 0
        },
        currentFoodUnit: {
          type: "string",
          manual: false,
          default: ""
        }
      }
    }
  },
  devicesCoolNames: {
    "action.devices.types.AC_UNIT": "AC unit",
    "action.devices.types.AIRFRESHENER": "Air freshener (WIP - Do not use)",
    "action.devices.types.AIRPURIFIER": "Air purifier (WIP - Do not use)",
    "action.devices.types.AWNING": "Awing (WIP - Do not use)",
    "action.devices.types.BATHTUB": "Bathtub (WIP - Do not use)",
    "action.devices.types.BED": "Bed (WIP - Do not use)",
    "action.devices.types.BLENDER": "Blender (WIP - Do not use)",
    "action.devices.types.BLINDS": "Blinds (WIP - Do not use)",
    "action.devices.types.BOILER": "Boiler (WIP - Do not use)",
    "action.devices.types.CAMERA": "Camera (WIP - Do not use)",
    "action.devices.types.CLOSET": "Closet (WIP - Do not use)",
    "action.devices.types.COFFE_MAKER": "Coffe maker (WIP - Do not use)",
    "action.devices.types.COOKTOP": "Cooktop (WIP - Do not use)",
    "action.devices.types.CURTAIN": "Curtain (WIP - Do not use)",
    "action.devices.types.DEHUMIDIFIER": "Dehumidifier (WIP - Do not use)",
    "action.devices.types.DEHYDRATOR": "Dehydrator (WIP - Do not use)",
    "action.devices.types.DISHWASHER": "Dishwasher (WIP - Do not use)",
    "action.devices.types.DOOR": "Door (WIP - Do not use)",
    "action.devices.types.DRYER": "Dryer (WIP - Do not use)",
    "action.devices.types.DRAWER": "Drawer (WIP - Do not use)",
    "action.devices.types.FAN": "Fan (WIP - Do not use)",
    "action.devices.types.FIREPLACE": "Fireplace (WIP - Do not use)",
    "action.devices.types.FRYER": "Fryer (WIP - Do not use)",
    "action.devices.types.GARAGE": "Garage (WIP - Do not use)",
    "action.devices.types.GATE": "Gate (WIP - Do not use)",
    "action.devices.types.GRILL": "Grill (WIP) (WIP - Do not use)",
    "action.devices.types.HEATER": "Heater (WIP - Do not use)",
    "action.devices.types.HOOD": "Hood (WIP - Do not use)",
    "action.devices.types.HUMIDIFIER": "Humidifier (WIP - Do not use)",
    "action.devices.types.KETTLE": "Kettle (WIP - Do not use)",
    "action.devices.types.LIGHT": "Light",
    "action.devices.types.LOCK": "Lock (WIP - Do not use)",
    "action.devices.types.MICROWAVE": "Microwave (WIP - Do not use)",
    "action.devices.types.MULTICOOKER": "Multicooker (WIP - Do not use)",
    "action.devices.types.MOP": "Mop (WIP - Do not use)",
    "action.devices.types.MOWER": "Mower (WIP - Do not use)",
    "action.devices.types.OUTLET": "Outlet",
    "action.devices.types.OVEN": "Oven (WIP - Do not use)",
    "action.devices.types.PERGOLA": "Pergola (WIP - Do not use)",
    "action.devices.types.PRESSURECOOKER": "Pressure cooker (WIP - Do not use)",
    "action.devices.types.RADIATOR": "Radiator (WIP - Do not use)",
    "action.devices.types.REFRIGERATOR": "Refrigerator (WIP - Do not use)",
    "action.devices.types.SECURITYSYSTEM": "Security system (WIP - Do not use)",
    "action.devices.types.SHOWER": "Shower (WIP - Do not use)",
    "action.devices.types.SOUSVIDE": "Sous vide (WIP - Do not use)",
    "action.devices.types.SHUTTER": "Shutter (WIP - Do not use)",
    "action.devices.types.SPRINKLER": "Sprinkler (WIP - Do not use)",
    "action.devices.types.STANDMIXER": "Stand mixer (WIP - Do not use)",
    "action.devices.types.SWITCH": "Switch (WIP - Do not use)",
    "action.devices.types.THERMOSTAT": "Thermostat (WIP - Do not use)",
    "action.devices.types.VACUUM": "Vacum (WIP - Do not use)",
    "action.devices.types.VALVE": "Valve (WIP - Do not use)",
    "action.devices.types.WASHER": "Washer (WIP - Do not use)",
    "action.devices.types.WATERHEATER": "Water heater (WIP - Do not use)",
    "action.devices.types.WINDOW": "Window (WIP - Do not use)",
    "action.devices.types.SCENE": "Scene",
    "action.devices.types.YOGURTMAKER": "Yogurt maker (WIP - Do not use)"
  },
  "traitsCoolNames": {
    "action.devices.traits.Toggles": "Toggle",
    "action.devices.traits.ArmDisarm": "Arm or Disarm",
    "action.devices.traits.CameraStream": "Camera stream",
    "action.devices.traits.ColorSetting": "Color setting",
    "action.devices.traits.FanSpeed": "Fan speed",
    "action.devices.traits.LightEffects": "Light effects",
    "action.devices.traits.Modes": "Modes",
    "action.devices.traits.OnOff": "Switch control",
    "action.devices.traits.OpenClose": "Open or Close",
    "action.devices.traits.Rotation": "Rotation",
    "action.devices.traits.Scene": "Scene",
    "action.devices.traits.StartStop": "Start or Stop",
    "action.devices.traits.TemperatureControl": "Temperature control",
    "action.devices.traits.TemperatureSetting": "Temperature setting",
    "action.devices.traits.Timer": "Timer",
    "action.devices.traits.Dock": "Dock",
    "action.devices.traits.Locator": "Locator",
    "action.devices.traits.RunCycle": "Run cycle",
    "action.devices.traits.StatusReport": "Status report",
    "action.devices.traits.Brightness": "Brightness",
    "action.devices.traits.LockUnlock": "Lock or Unlock"
  }
}

export { root, deviceReference }
