var root = window.location.href.includes('localhost') ? "http://homeware.local/" : "/"

const deviceReference = {
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
        "action.devices.traits.Toggles",
        "action.devices.traits.SensorState"
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
    "action.devices.types.CARBON_MONOXIDE_DETECTOR": {
      name: "Carbon monoxide detector",
      traits: [
        "action.devices.traits.SensorState"
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
    "action.devices.types.FREEZER": {
      name: "Fireplace",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.TemperatureControl",
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
    "action.devices.types.SENSOR": {
      name: "Sensor",
      traits: [
        "action.devices.traits.OnOff",
        "action.devices.traits.SensorState"
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
    "action.devices.types.SMOKE_DETECTOR": {
      name: "Smoke detector",
      traits: [
        "action.devices.traits.SensorState"
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
    "action.devices.types.WATERPURIFIER": {
      name: "Water purifier",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.SensorState",
        "action.devices.traits.Toggles"
      ]
    },
    "action.devices.types.WATERSOFTENER": {
      name: "Water softener",
      traits: [
        "action.devices.traits.Modes",
        "action.devices.traits.OnOff",
        "action.devices.traits.SensorState",
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
      params: ['on'],
      commands: []
    },
    "action.devices.traits.Brightness": {
      name: 'Brightness',
      attributes: {
        commandOnlyBrightness: {
          type: "bool",
          default: false
        }
      },
      params: ['brightness'],
      commands: []
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
      params: ['color'],
      commands: []
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
      params: [
        'thermostatMode',
        'thermostatTemperatureSetpoint',
        'thermostatTemperatureAmbient',
        'thermostatTemperatureSetpointHigh',
        'thermostatTemperatureSetpointLow',
        'thermostatHumidityAmbient'
      ],
      commands: []
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
      params: ['openPercent'],
      commands: []
    },
    "action.devices.traits.Rotation": {
      name: 'Rotation - Google doesn\'t respond',
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
      params: ['rotationPercent','rotationDegrees'],
      commands: []
    },
    "action.devices.traits.LockUnlock": {
      name: 'Lock or unlock',
      attributes: {},
      params: ['isLocked','isJammed'],
      commands: [
        {
          command: 'lock',
          description: 'Lock'
        },
        {
          command: 'unlock',
          description: 'Unlock'
        }
      ]
    },
    "action.devices.traits.Scene": {
      name: 'Scene',
      attributes: {
        sceneReversible: {
          type: "bool",
          default: true
        }
      },
      params: ['deactivate'],
      commands: []
    },
    "action.devices.traits.Dock": {
      name: 'Dock',
      attributes: {},
      params: ['isDocked'],
      commands: []
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
      params: ['currentToggleSettings'],
      commands: []
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
      params: ['isRunning','isPaused','activeZones'],
      commands: [
        {
          command: 'start',
          description: 'Start the process'
        },
        {
          command: 'stop',
          description: 'Stop the process'
        },
        {
          command: 'pause',
          description: 'Pause cooking'
        },
        {
          command: 'unpause',
          description: 'Unpause cooking'
        }
      ]
    },
    "action.devices.traits.Timer": {
      name: 'Timer - Google doesn\'t respond',
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
      params: ['timerRemainingSec', 'timerPaused'],
      commands: []
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
      params: ['temperatureSetpointCelsius','temperatureAmbientCelsius'],
      commands: []
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
      params: ['currentFanSpeedSetting'],
      commands: []
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
      params: ['isArmed', 'currentArmLevel','exitAllowance'],
      commands: [
        {
          command: 'cancel',
          description: 'The arm process must be canceled'
        },
        {
          command: 'arm',
          description: 'Arm the system'
        },
        {
          command: 'disarm',
          description: 'Disarm the system'
        }
      ]
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
      params: ['isFilled','currentFillLevel'],
      commands: [
        {
          command: 'fill',
          description: 'Fill'
        },
        {
          command: 'drain',
          description: 'Drain'
        }
      ]
    },
    "action.devices.traits.RunCycle": {
      name: 'RunCycle',
      attributes: {},
      params: [],
      commands: []
    },
    "action.devices.traits.StatusReport": {
      name: 'Status report',
      attributes: {},
      params: ['currentStatusReport'],
      commands: []
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
      params: ['humiditySetpointPercent','humidityAmbientPercent'],
      commands: []
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
      params: ['currentCookingMode','currentFoodPreset','currentFoodQuantity','currentFoodUnit'],
      commands: []
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
      params: ['currentModeSettings'],
      commands: [
        {
          command: 'start',
          description: 'Start cooking'
        },
        {
          command: 'stop',
          description: 'Stop cooking'
        }
      ]
    },
    "action.devices.traits.Locator": {
      name: 'Locator',
      attributes: {
      },
      params: [],
      commands: [
        {
          command: 'silence',
          description: 'Stop the alarm'
        }
      ]
    },
    "action.devices.traits.SensorState": {
      name: 'Sesnor - Google doesn\'t respond',
      attributes: {
        sensorStatesSupported: {
          type: 'object',
          default: [
            {
              name: ""
            }
          ]
        }
      },
      params: ['currentSensorStateData'],
      commands: []
    }
  },
  params: {
    thermostatTemperatureAmbient: {
      type: "int",
      name: 'Ambient temperature',
      commanded: false,
      default: 21
    },
    thermostatTemperatureSetpoint: {
      type: "int",
      name: 'Temperature set point',
      commanded: true,
      default: 22
    },
    thermostatHumidityAmbient: {
      type: "int",
      name: 'Ambient humidity',
      commanded: false,
      default: 60
    },
    thermostatMode: {
      type: "list",
      select: ["cool","heat","off","on","heatcool","auto","fan-only","purifier","eco","dry"],
      name: 'Mode',
      commanded: true,
      default: 'off'
    },
    on: {
      type: "bool",
      select: ["true","false"],
      name: 'Power',
      commanded: true,
      default: false
    },
    deactivate: {
      type: "bool",
      select: ["true","false"],
      name: 'Deactivate',
      commanded: true,
      default: true
    },
    brightness: {
      type: "int",
      name: 'Brightness',
      commanded: true,
      default: 80
    },
    online: {
      type: "bool",
      select: ["true","false"],
      name: 'Online',
      commanded: false,
      default: true
    },
    color: {
      type: "color",
      name: 'Color',
      commanded: true,
      default: {
        spectrumRgb: 16711935,
        temperature: 2000
      }
    },
    thermostatTemperatureSetpointHigh: {
      type: "int",
      name: 'Hight set point in heatcool mode',
      commanded: true,
      default: 22
    },
    thermostatTemperatureSetpointLow: {
      type: "int",
      name: 'Low set point in heatcool mode',
      commanded: true,
      default: 18
    },
    openPercent: {
      type: "int",
      name: 'Open percentage',
      commanded: true,
      default: 60
    },
    rotationPercent: {
      type: "int",
      name: 'Rotation percentage',
      commanded: true,
      default: 50
    },
    rotationDegrees: {
      type: "int",
      name: 'Ration degrees',
      commanded: true,
      default: 90
    },
    isLocked: {
      type: "bool",
      name: 'Is locked',
      commanded: false,
      default: false
    },
    isJammed: {
      type: "bool",
      name: 'Is jammed',
      commanded: false,
      default: false
    },
    isDocked: {
      type: "bool",
      name: 'Is docked',
      commanded: false,
      default: false
    },
    isRunning: {
      type: "bool",
      name: 'Is running',
      commanded: false,
      default: false
    },
    isPaused: {
      type: "bool",
      name: 'Is paused',
      commanded: false,
      default: false
    },
    activeZones: {
      type: "object",
      name: 'Active Zones',
      commanded: true,
      default: []
    },
    timerRemainingSec: {
      type: "int",
      name: 'Remaining time [seconds]',
      commanded: true,
      default: 0
    },
    timerPaused: {
      type: "bool",
      name: 'Is paused',
      commanded: true,
      default: false
    },
    temperatureSetpointCelsius: {
      type: "int",
      name: 'Set point',
      commanded: true,
      default: 22
    },
    temperatureAmbientCelsius: {
      type: "int",
      name: 'Ambient',
      commanded: false,
      default: 21
    },
    currentFanSpeedSetting: {
      type: "string",
      name: 'Fan speed setting',
      commanded: true,
      default: ''
    },
    isArmed: {
      type: "bool",
      name: 'Is armed',
      commanded: false,
      default: false
    },
    exitAllowance: {
      type: "int",
      name: 'Time to leave',
      commanded: true,
      default: 20
    },
    isFilled: {
      type: "bool",
      name: 'Is filled',
      commanded: false,
      default: false
    },
    humiditySetpointPercent: {
      type: "int",
      name: 'Humidity set point',
      commanded: true,
      default: 70
    },
    humidityAmbientPercent: {
      type: "int",
      name: 'Ambient humidity',
      commanded: false,
      default: 60
    },
    currentArmLevel: {
      type: "string",
      name: 'Current security level',
      commanded: true,
      default: ''
    },
    currentFillLevel: {
      type: "string",
      name: 'Current fill levell',
      commanded: true,
      default: ''
    },
    currentCookingMode: {
      type: "string",
      name: 'Current cooking mode',
      commanded: true,
      default: ''
    },
    currentFoodPreset: {
      type: "string",
      name: 'Current food preset',
      commanded: true,
      default: ''
    },
    currentFoodQuantity: {
      type: "int",
      name: 'Current food quantity',
      commanded: true,
      default: ''
    },
    currentFoodUnit: {
      type: "string",
      name: 'Current food unit',
      commanded: true,
      default: ''
    },
    currentToggleSettings: {
      type: "object",
      name: 'Toggles status',
      commanded: true,
      default: {}
    },
    currentModeSettings: {
      type: "object",
      name: 'Modes status',
      commanded: true,
      default: {}
    },
  }
}

export { root, deviceReference }
