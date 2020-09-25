var root = "/"

const deviceReference = {
  devices: {
    "action.devices.types.AC_UNIT": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.OnOff",
      "action.devices.traits.TemperatureSetting"
    ],
    "action.devices.types.AIRCOOLER": [
      "action.devices.traits.FanSpeed",
      "action.devices.traits.HumiditySetting",
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
          type: "bool",
          default: false
        },
        openDirection: {
          type: "array",
          default: ["UP","DOWN","LEFT","RIGHT","IN","OUT"]
        },
        commandOnlyOpenClose: {
          type: "bool",
          default: false
        },
        queryOnlyOpenClose: {
          type: "bool",
          default: false
        }
      },
      param:{
        openPercent: {
          type: "int",
          default: 0
        },
        openState: {
          type: "object",
          manual: false,
          default: {
            openPercent: 0,
            openDirection: "UP"
          },
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
          type: "bool",
          default: false
        },
        supportsContinuousRotation: {
          type: "bool",
          default: false
        },
        supportsDegrees: {
          type: "bool",
          default: false
        },
        supportsPercent: {
          type: "bool",
          default: false
        },
        rotationDegreesRange: {
          type: "object",
          default: {
            rotationDegreesMin: 0,
            rotationDegreesMax: 0
          },
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
          type: "array",
          default: []
        },
        pausable: {
          type: "bool",
          default: false
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
        },
        activeZones: ~{
          type: "array",
          default: []
        }
      }
    },
    "action.devices.traits.Timer": {
      attributes: {
        maxTimerLimitSec: {
          type: "int",
          default: 1000
        },
        commandOnlyTimer: {
          type: "bool",
          default: false
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
          type: "int",
          default: 5
        },
        temperatureUnitForUX: {
          type: "string",
          default: "C"
        },
        queryOnlyTemperatureControl: {
          type: "bool",
          default: false
        },
        commandOnlyTemperatureControl: {
          type: "bool",
          default: false
        },
        temperatureRange: {
          type: "object",
          default: {
            minThresholdCelsius: 0,
            maxThresholdCelsius: 150
          },
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
          type: "strigifyedObject",
          default: {
            levels: [],
            ordered: true
          }
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
          type: "strigifyedObject",
          default: {
            levels: [],
            ordered: true
          }
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
      param: {
        lang: 'en'
      }
    },
    "action.devices.traits.StatusReport": {
      attributes: {},
      param: {
        currentStatusReport: {
          type: 'object',
          default: {}
        }
      }
    },
    "action.devices.traits.HumiditySetting": {
      attributes: {
        humiditySetpointRange: {
          type: "object",
          default: {
            minPercent: 0,
            maxPercent: 100
          },
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
          type: "bool",
          default: false
        },
        queryOnlyHumiditySetting: {
          type: "bool",
          default: false
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
          type: "strigifyedObject",
          default: []
        },
        supportedCookingModes: {
          type: "selectToArray",
          default: []
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
    },
    "action.devices.traits.Modes": {
      attributes: {
        availableModes: {
          type: "strigifyedObject",
          default: []
        },
        commandOnlyModes: {
          type: "bool",
          default: false
        }
      },
      param: {
      }
    },
    "action.devices.traits.Locator": {
      attributes: {
      },
      param: {
      }
    }
  },
  devicesCoolNames: {
    "action.devices.types.AC_UNIT": "AC unit",
    "action.devices.types.AIRCOOLER": "Air cooler",
    "action.devices.types.AIRFRESHENER": "Air freshener",
    "action.devices.types.AIRPURIFIER": "Air purifier",
    "action.devices.types.AWNING": "Awing",
    "action.devices.types.BATHTUB": "Bathtub",
    "action.devices.types.BED": "Bed",
    "action.devices.types.BLENDER": "Blender (WIP - Do not use)",
    "action.devices.types.BLINDS": "Blinds",
    "action.devices.types.BOILER": "Boiler (WIP - Do not use)",
    "action.devices.types.CAMERA": "Camera (WIP - Do not use)",
    "action.devices.types.CLOSET": "Closet",
    "action.devices.types.COFFE_MAKER": "Coffe maker (WIP - Do not use)",
    "action.devices.types.COOKTOP": "Cooktop (WIP - Do not use)",
    "action.devices.types.CURTAIN": "Curtain",
    "action.devices.types.DEHUMIDIFIER": "Dehumidifier (WIP - Do not use)",
    "action.devices.types.DEHYDRATOR": "Dehydrator (WIP - Do not use)",
    "action.devices.types.DISHWASHER": "Dishwasher (WIP - Do not use)",
    "action.devices.types.DOOR": "Door",
    "action.devices.types.DRYER": "Dryer (WIP - Do not use)",
    "action.devices.types.DRAWER": "Drawer",
    "action.devices.types.FAN": "Fan",
    "action.devices.types.FIREPLACE": "Fireplace",
    "action.devices.types.FRYER": "Fryer (WIP - Do not use)",
    "action.devices.types.GARAGE": "Garage",
    "action.devices.types.GATE": "Gate",
    "action.devices.types.GRILL": "Grill (WIP) (WIP - Do not use)",
    "action.devices.types.HEATER": "Heater",
    "action.devices.types.HOOD": "Hood",
    "action.devices.types.HUMIDIFIER": "Humidifier (WIP - Do not use)",
    "action.devices.types.KETTLE": "Kettle (WIP - Do not use)",
    "action.devices.types.LIGHT": "Light",
    "action.devices.types.LOCK": "Lock",
    "action.devices.types.MICROWAVE": "Microwave (WIP - Do not use)",
    "action.devices.types.MULTICOOKER": "Multicooker (WIP - Do not use)",
    "action.devices.types.MOP": "Mop (WIP - Do not use)",
    "action.devices.types.MOWER": "Mower (WIP - Do not use)",
    "action.devices.types.OUTLET": "Outlet",
    "action.devices.types.OVEN": "Oven (WIP - Do not use)",
    "action.devices.types.PERGOLA": "Pergola",
    "action.devices.types.PRESSURECOOKER": "Pressure cooker (WIP - Do not use)",
    "action.devices.types.RADIATOR": "Radiator",
    "action.devices.types.REFRIGERATOR": "Refrigerator (WIP - Do not use)",
    "action.devices.types.SECURITYSYSTEM": "Security system",
    "action.devices.types.SHOWER": "Shower (WIP - Do not use)",
    "action.devices.types.SOUSVIDE": "Sous vide (WIP - Do not use)",
    "action.devices.types.SHUTTER": "Shutter",
    "action.devices.types.SPRINKLER": "Sprinkler (WIP - Do not use)",
    "action.devices.types.STANDMIXER": "Stand mixer (WIP - Do not use)",
    "action.devices.types.SWITCH": "Switch",
    "action.devices.types.THERMOSTAT": "Thermostat",
    "action.devices.types.VACUUM": "Vacum (WIP - Do not use)",
    "action.devices.types.VALVE": "Valve",
    "action.devices.types.WASHER": "Washer (WIP - Do not use)",
    "action.devices.types.WATERHEATER": "Water heater (WIP - Do not use)",
    "action.devices.types.WINDOW": "Window",
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
    "action.devices.traits.LockUnlock": "Lock or Unlock",
    "action.devices.traits.HumiditySetting": "Humidity setting",
    "action.devices.traits.Cook": "Cooking",
    "action.devices.traits.Fill": "Fill level"
  }
}

export { root, deviceReference }
