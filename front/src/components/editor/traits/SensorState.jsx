import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import {InputLabel, Button, Select, MenuItem, Box, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const sensorCapabilities = {
  AirQuality: {
    descriptiveCapabilities: {
      availableStates: ["healthy", "moderate", "unhealthy", "unhealthy for sensitive groups", "very unhealthy", "hazardous", "good", "fair", "poor", "very poor", "severe", "unknown"],
    },
    numericCapabilities: {rawValueUnit: "AQI"},
  },
  CarbonDioxideLevel: {
    numericCapabilities: {rawValueUnit: "PARTS_PER_MILLION"},
  },
  CarbonMonoxideLevel: {
    descriptiveCapabilities: {
      availableStates: ["carbon monoxide detected", "high", "no carbon monoxide detected", "unknown"],
    },
    numericCapabilities: {rawValueUnit: "PARTS_PER_MILLION"},
  },
  FilterCleanliness: {
    descriptiveCapabilities: {
      availableStates: ["clean", "dirty", "needs replacement", "unknown"],
    },
  },
  FilterLifeTime: {
    descriptiveCapabilities: {
      availableStates: ["new", "good", "replace soon", "replace now", "unknown"],
    },
    numericCapabilities: {rawValueUnit: "PERCENTAGE"},
  },
  HEPAFilterLifeTime: {
    numericCapabilities: {rawValueUnit: "PERCENTAGE"},
  },
  Max2FilterLifeTime: {
    numericCapabilities: {rawValueUnit: "PERCENTAGE"},
  },
  "PM2.5": {
    numericCapabilities: {rawValueUnit: "MICROGRAMS_PER_CUBIC_METER"},
  },
  PM10: {
    numericCapabilities: {rawValueUnit: "MICROGRAMS_PER_CUBIC_METER"},
  },
  PreFilterLifeTime: {
    numericCapabilities: {rawValueUnit: "PERCENTAGE"},
  },
  SmokeLevel: {
    descriptiveCapabilities: {
      availableStates: ["smoke detected", "high", "no smoke detected", "unknown"],
    },
    numericCapabilities: {rawValueUnit: "PARTS_PER_MILLION"},
  },
  WaterLeak: {
    descriptiveCapabilities: {
      availableStates: ["leak", "no leak", "unknown"],
    },
  },
  RainDetection: {
    descriptiveCapabilities: {
      availableStates: ["rain detected", "no rain detected", "unknown"],
    },
  },
  VolatileOrganicCompounds: {
    numericCapabilities: {rawValueUnit: "PARTS_PER_MILLION"},
  },
}

const attributes = {
  sensorStatesSupported: [{name: "AirQuality", ...sensorCapabilities.AirQuality}],
}

const states = {
  currentSensorStateData: [
    {
      name: "AirQuality",
      currentSensorState: "healthy",
      rawValue: 0
    }
  ],
}

const SensorState = forwardRef((props, ref) => {

  const [sensorStatesSupported, setSensorStatesSupported] = useState(attributes.sensorStatesSupported)

  useEffect(() => {
    if ("sensorStatesSupported" in props.attributes) {
      setSensorStatesSupported(props.attributes.sensorStatesSupported)
    } else {
      props.updateStates(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStates(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
    }
  }))

  const getDefaultSensorState = (name) => {
    const sensor = sensorCapabilities[name]
    const state = {
      name: name
    }

    if (sensor.descriptiveCapabilities) {
      state.currentSensorState = sensor.descriptiveCapabilities.availableStates[0]
    }

    if (sensor.numericCapabilities) {
      state.rawValue = 0
    }

    return state
  }

  const getCurrentSensorStateData = (_sensorStatesSupported) => {
    return _sensorStatesSupported.map((sensor) => getDefaultSensorState(sensor.name))
  }

  const addSensor = () => {
    let _sensorStatesSupported = [...sensorStatesSupported]
    _sensorStatesSupported.push({name: "AirQuality", ...sensorCapabilities.AirQuality})
    setSensorStatesSupported(_sensorStatesSupported)
    props.updateAttributes("sensorStatesSupported", _sensorStatesSupported, "update")
    props.updateStates("currentSensorStateData", getCurrentSensorStateData(_sensorStatesSupported), "update")
  }

  const removeSensor = (index) => {
    let _sensorStatesSupported = [...sensorStatesSupported]
    _sensorStatesSupported.splice(index, 1)
    setSensorStatesSupported(_sensorStatesSupported)
    props.updateAttributes("sensorStatesSupported", _sensorStatesSupported, "update")
    props.updateStates("currentSensorStateData", getCurrentSensorStateData(_sensorStatesSupported), "update")
  }

  const updateSensorType = (index, value) => {
    let _sensorStatesSupported = [...sensorStatesSupported]
    _sensorStatesSupported[index] = {name: value, ...sensorCapabilities[value]}
    setSensorStatesSupported(_sensorStatesSupported)
    props.updateAttributes("sensorStatesSupported", _sensorStatesSupported, "update")
    props.updateStates("currentSensorStateData", getCurrentSensorStateData(_sensorStatesSupported), "update")
  }

  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right attributes_col_allign_up">
          <i>sensorStatesSupported</i>
        </div>
        <div className="attributes_col_2 attribute_table_form">
          {
            sensorStatesSupported.map((sensor, index) => {
              return (
                <Box className="attribute_table_subattribute" key={index}>
                  <Box className="attribute_table_subattribute_row">
                    <FormControl fullWidth>
                      <InputLabel id={"sensorStateType-label-" + index}>
                        Sensor type
                      </InputLabel>
                      <Select
                        id={"sensorStateType-" + index}
                        data-test="sensorStateType"
                        label="Sensor type"
                        className="attribute_table_subattribute_input"
                        value={sensor.name}
                        onChange={(event) => {
                          updateSensorType(index, event.target.value)
                        }}
                      >
                        <MenuItem value="AirQuality">Air Quality</MenuItem>
                        <MenuItem value="CarbonDioxideLevel">Carbon Dioxide Level</MenuItem>
                        <MenuItem value="CarbonMonoxideLevel">Carbon Monoxide Level</MenuItem>
                        <MenuItem value="FilterCleanliness">Filter Cleanliness</MenuItem>
                        <MenuItem value="FilterLifeTime">Filter Life Time</MenuItem>
                        <MenuItem value="HEPAFilterLifeTime">HEPA Filter Life Time</MenuItem>
                        <MenuItem value="Max2FilterLifeTime">Max2 Filter Life Time</MenuItem>
                        <MenuItem value="PM2.5">PM2.5</MenuItem>
                        <MenuItem value="PM10">PM10</MenuItem>
                        <MenuItem value="PreFilterLifeTime">PreFilter Life Time</MenuItem>
                        <MenuItem value="SmokeLevel">Smoke Level</MenuItem>
                        <MenuItem value="WaterLeak">Water Leak</MenuItem>
                        <MenuItem value="RainDetection">Rain Detection</MenuItem>
                        <MenuItem value="VolatileOrganicCompounds">Volatile Organic Compounds</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="large" onClick={() => removeSensor(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Box>
              )
            })
          }
          <Box className="attribute_table_form_add_button">
            <Button
              variant="contained"
              className="attribute_table_form_add_button"
              onClick={addSensor}
            >
              Add
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
})

export default SensorState
