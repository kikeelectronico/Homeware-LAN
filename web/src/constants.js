var root = window.location.href.includes('localhost') ? "http://homeware.local/" : "/"

const deviceReference = {
  traits: {
    "action.devices.traits.OnOff": {
      name: 'Power control',
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
          default: true
        }
      }
    },
    "action.devices.traits.Brightness": {
      name: 'Brightness',
      attributes: {
        commandOnlyBrightness: {
          type: "bool",
          default: false
        }
      },
      param:{
        brightness: {
          type: "int",
          default: 100
        }
      }
    },
    "action.devices.traits.ColorSetting": {
      name: 'Color setting',
      attributes: {
        colorModel: {
          type: "string",
          default: "rgb"
        },
        commandOnlyColorSetting: {
            type: "bool",
            default: false
        },
        colorTemperatureRange: {
          type: "object",
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
      name: 'Temperature Settings',
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
          default: "off"
        },
        thermostatTemperatureSetpoint: {
          type: "int",
          default: 20
        },
        thermostatTemperatureAmbient: {
          type: "int",
          default: 22
        },
        thermostatTemperatureSetpointHigh: {
          type: "int",
          default: 28
        },
        thermostatTemperatureSetpointLow: {
          type: "int",
          default: 18
        },
        thermostatHumidityAmbient: {
          type: "int",
          default: 80
        }
      }
    },
    "action.devices.traits.OpenClose": {
      name: 'Open or close',
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
      name: 'Rotation',
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
          default: 0
        },
        rotationDegrees: {
          type: "int",
          default: 0
        }
      }
    },
    "action.devices.traits.LockUnlock": {
      name: 'Lock or unlock',
      attributes: {},
      param:{
        isLocked: {
          type: "bool",
          default: false
        },
        isJammed: {
          type: "bool",
          default: false
        }
      }
    },
    "action.devices.traits.Scene": {
      name: 'Scene',
      attributes: {
        sceneReversible: {
          type: "bool",
          default: true
        }
      },
      param:{
        deactivate: {
          type: "bool",
          default: true
        }
      }
    },
    "action.devices.traits.Dock": {
      name: 'Dock',
      attributes: {},
      param:{
        isDocked: {
          type: "bool",
          default: false
        }
      }
    },
    "action.devices.traits.Toggles": {
      name: 'Toogles',
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
        currentToggleSettings: {
            type: "array",
            default: []
        }
      }
    },
    "action.devices.traits.StartStop": {
      name: 'Start and stop',
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
          default: false
        },
        isPaused: {
          type: "bool",
          default: false
        },
        activeZones: ~{
          type: "array",
          default: []
        }
      }
    },
    "action.devices.traits.Timer": {
      name: 'Timer',
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
          default: -1
        },
        timerPaused: {
          type: "bool",
          default: false
        }
      }
    },
    "action.devices.traits.TemperatureControl": {
      name: 'Temperature control',
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
          default: 20
        },
        temperatureAmbientCelsius: {
          type: "int",
          default: 20
        }
      }
    },
    "action.devices.traits.FanSpeed": {
      name: 'Fan Speed',
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
          default: ""
        }
      }
    },
    "action.devices.traits.ArmDisarm": {
      name: 'Arm or disarm',
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
          default: false
        },
        currentArmLevel: {
          type: "string",
          default: ""
        },
        exitAllowance: {
          type: "int",
          default: 20
        }
      }
    },
    "action.devices.traits.Fill": {
      name: 'Fill',
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
          default: false
        },
        currentFillLevel: {
          type: "string",
          default: ""
        }
      }
    },
    "action.devices.traits.RunCycle": {
      name: 'RunCycle',
      attributes: {},
      param: {
        lang: 'en'
      }
    },
    "action.devices.traits.StatusReport": {
      name: 'Status report',
      attributes: {},
      param: {
        currentStatusReport: {
          type: 'object',
          default: {}
        }
      }
    },
    "action.devices.traits.HumiditySetting": {
      name: 'Humidity setting',
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
          default: 30
        },
        humidityAmbientPercent: {
          type: "int",
          default: 20
        }
      }
    },
    "action.devices.traits.Cook": {
      name: 'Cooking',
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
          default: ""
        },
        currentFoodPreset: {
          type: "string",
          default: ""
        },
        currentFoodQuantity: {
          type: "int",
          default: 0
        },
        currentFoodUnit: {
          type: "string",
          default: ""
        }
      }
    },
    "action.devices.traits.Modes": {
      name: 'Modes',
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
      name: 'Locator',
      attributes: {
      },
      param: {
      }
    }
  },
  devices: {
    "action.devices.types.AC_UNIT": {
      name: "AC unit",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureSetting"
      ]
    },
    "action.devices.types.AIRCOOLER": {
      name: "Air cooler",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.HumiditySetting",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureSetting"
      ]
    },
    "action.devices.types.AIRFRESHENER": {
      name: "Air freshener",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.AIRPURIFIER": {
      name: "Air purifier",
      traits: [
        "action.devices.traits.OnOff",
        "action.devices.traits.FanSpeed",
        "action.devices.traits.Modes",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.AWNING": {
      name: "Awing",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.BATHTUB": {
      name: "Bathtub",
      traits: [
        "action.devices.traits.Fill",
        "action.devices.traits.OnOff"
      ]
    },
    "action.devices.types.BED": {
      name: "Bed",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.BLINDS": {
      name: "Blinds",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.BLENDER": {
      name: "Blender",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.BOILER": {
      name: "Boiler",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.TemperatureControl",
        "action.devices.traits.OnOff",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.CLOSET": {
      name: "Closet",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.COFFE_MAKER": {
      name: "Coffe maker",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureControl",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.COOKTOP": {
      name: "Cooktop",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.CURTAIN": {
      name: "Curtain",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.DEHUMIDIFIER": {
      name: "Dehumidifier",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.HumiditySetting",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.RunCycle",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.DEHYDRATOR": {
      name: "Dehydrator",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.DISHWASHER": {
      name: "Dishwasher",
      traits: [
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Modes",
        "action.devices.traits.Toggles",
        "action.devices.traits.RunCycle"
      ]
    },
    "action.devices.types.DOOR": {
      name: "Door",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.DRAWER": {
      name: "Drawer",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.DRYER": {
      name: "Dryer",
      traits: [
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Modes",
        "action.devices.traits.Toggles",
        "action.devices.traits.RunCycle"
      ]
    },
    "action.devices.types.FAN": {
      name: "Fan",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.FIREPLACE": {
      name: "Fireplace",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.FRYER": {
      name: "Fryer",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.GARAGE": {
      name: "Garage",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.GATE": {
      name: "Gate",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.GRILL": {
      name: "Grill",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.HEATER": {
      name: "Heater",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureSetting",
      ]
    },
    "action.devices.types.HOOD": {
      name: "Hood",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.HUMIDIFIER": {
      name: "Humidifier",
      traits: [
        "action.devices.traits.FanSpeed",
        "action.devices.traits.HumiditySetting",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.KETTLE": {
      name: "Kettle",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureControl",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.LIGHT": {
      name: "Light",
      traits: [
        "action.devices.traits.OnOff",
        "action.devices.traits.Brightness",
        "action.devices.traits.ColorSetting"
      ]
    },
    "action.devices.types.LOCK": {
      name: "Lock",
      traits: [
        "action.devices.traits.LockUnlock"
      ]
    },
    "action.devices.types.MICROWAVE": {
      name: "Microwave",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ],
    },
    "action.devices.types.MULTICOOKER": {
      name: "Multicooker",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.MOP": {
      name: "Mop",
      traits: [
        "action.devices.traits.Dock",
        "action.devices.traits.Locator",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.RunCycle",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.MOWER": {
      name: "Mower",
      traits: [
        "action.devices.traits.Dock",
        "action.devices.traits.Locator",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.RunCycle",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.OUTLET": {
      name: "Outlet",
      traits: [
        "action.devices.traits.OnOff"
      ]
    },
    "action.devices.types.OVEN": {
      name: "Oven",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.TemperatureControl",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.PERGOLA": {
      name: "Pergola",
      traits: [
        "action.devices.traits.OpenClose",
        "action.devices.traits.Rotation"
      ]
    },
    "action.devices.types.PRESSURECOOKER": {
      name: "Pressure cooker",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.RADIATOR": {
      name: "Radiator",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.REFRIGERATOR": {
      name: "Refrigerator",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureControl",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.SECURITYSYSTEM": {
      name: "Security system",
      traits: [
        "action.devices.traits.ArmDisarm",
        "action.devices.traits.StatusReport"
      ]
    },
    "action.devices.types.SHOWER": {
      name: "Shower",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.TemperatureControl"
      ]
    },
    "action.devices.types.SHUTTER": {
      name: "Shutter",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OpenClose",
        "action.devices.traits.Rotation"
      ]
    },
    "action.devices.types.SOUSVIDE": {
      name: "Sous vide",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.SPRINKLER": {
      name: "Sprinkler",
      traits: [
        "action.devices.traits.StartStop"
      ]
    },
    "action.devices.types.STANDMIXER": {
      name: "Stand mixer",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.SWITCH": {
      name: "Switch",
      traits: [
        "action.devices.traits.OnOff"
      ]
    },
    "action.devices.types.THERMOSTAT": {
      name: "Thermostat",
      traits: [
        "action.devices.traits.TemperatureSetting"
      ]
    },
    "action.devices.types.VACUUM": {
      name: "Vacum",
      traits: [
        "action.devices.traits.Dock",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.VALVE": {
      name: "Valve",
      traits: [
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.WASHER": {
      name: "Washer",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.RunCycle",
        "action.devices.traits.StartStop",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.WATERHEATER": {
      name: "Water heater",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureControl",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.WINDOW": {
      name: "Window",
      traits: [
        "action.devices.traits.LockUnlock",
        "action.devices.traits.OpenClose"
      ]
    },
    "action.devices.types.SCENE": {
      name: "Scene",
      traits: [
        "action.devices.traits.Scene"
      ]
    },
    "action.devices.types.YOGURTMAKER": {
      name: "Yogurt maker",
      traits: [
        "action.devices.traits.Cook",
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.StartStop",
        "action.devices.traits.Timer",
        "action.devices.traits.Toggles"
      ]
    }
  },
  params: {
    thermostatTemperatureAmbient: {
      type: "int",
      name: 'Ambient temperature'
    },
    thermostatTemperatureSetpoint: {
      type: "int",
      name: 'Temperature set point'
    },
    thermostatHumidityAmbient: {
      type: "int",
      name: 'Ambient humidity'
    },
    thermostatMode: {
      type: "list",
      select: ["cool","heat","off","on","heatcool","auto","fan-only","purifier","eco","dry"],
      name: 'Mode'
    },
    on: {
      type: "bool",
      select: ["true","false"],
      name: 'Power'
    },
    deactivate: {
      type: "bool",
      select: ["true","false"],
      name: 'Deactivate'
    },
    brightness: {
      type: "int",
      name: 'Brightness'
    },
    online: {
      type: "bool",
      select: ["true","false"],
      name: 'Online'
    },
    color: {
      type: "color",
      name: 'Color'
    },
    thermostatTemperatureSetpointHigh: {
      type: "int",
      name: 'Hight set point in heatcool mode'
    },
    thermostatTemperatureSetpointLow: {
      type: "int",
      name: 'Low set point in heatcool mode'
    },
    openPercent: {
      type: "int",
      name: 'Open percentage'
    },
    rotationPercent: {
      type: "d2i",
      name: 'Rotation percentage'
    },
    rotationDegrees: {
      type: "int",
      name: 'Ration degrees'
    },
    isLocked: {
      type: "bool",
      name: 'Is locked'
    },
    isJammed: {
      type: "bool",
      name: 'Is jammed'
    },
    isDocked: {
      type: "bool",
      name: 'Is docked'
    },
    isRunnin: {
      type: "bool",
      name: 'Is running'
    },
    isPaused: {
      type: "bool",
      name: 'Is paused'
    },
    timerRemainingSec: {
      type: "int",
      name: 'Remaining time [seconds]'
    },
    timerPaused: {
      type: "bool",
      name: 'Is paused'
    },
    temperatureSetpointCelsius: {
      type: "int",
      name: 'Set point'
    },
    temperatureAmbientCelsius: {
      type: "int",
      name: 'Ambient'
    },
    currentFanSpeedSetting: {
      type: "string",
      name: 'Fan speed setting'
    },
    isArmed: {
      type: "bool",
      name: 'Is armed'
    },
    exitAllowance: {
      type: "int",
      name: 'Time to leave'
    },
    isFilled: {
      type: "bool",
      name: 'Is filled'
    },
    humiditySetpointPercent: {
      type: "int",
      name: 'Humidity set point'
    },
    humidityAmbientPercent: {
      type: "int",
      name: 'Ambient humidity'
    },
    currentArmLevel: {
      type: "string",
      name: 'Current security level'
    },
    currentFillLevel: {
      type: "string",
      name: 'Current fill levell'
    },
    currentCookingMode: {
      type: "string",
      name: 'Current cooking mode'
    },
    currentFoodPreset: {
      type: "string",
      name: 'Current food preset'
    },
    currentFoodQuantity: {
      type: "int",
      name: 'Current food quantity'
    },
    currentFoodUnit: {
      type: "string",
      name: 'Current food unit'
    },
  }
}

export { root, deviceReference }
