import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import {Select, MenuItem} from '@mui/material';

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
  sensorStatesSupported: [{name: ""}],
}

const states = {
  currentSensorStateData: [],
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
    if (!name) return []

    const sensor = sensorCapabilities[name]
    const state = {name}

    if (sensor.descriptiveCapabilities) {
      state.currentSensorState = sensor.descriptiveCapabilities.availableStates[0]
    }

    if (sensor.numericCapabilities) {
      state.rawValue = 0
    }

    return [state]
  }

  const updateSensorType = (value) => {
    const _sensorStatesSupported = value ? [{name: value, ...sensorCapabilities[value]}] : attributes.sensorStatesSupported
    setSensorStatesSupported(_sensorStatesSupported)
    props.updateAttributes("sensorStatesSupported", _sensorStatesSupported, "update")
    props.updateStates("currentSensorStateData", getDefaultSensorState(value), "update")
  }

  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Sensor type
        </div>
        <div className="attributes_col_2">
          <Select
            name="type"
            id="sensorStatesSupported"
            className="table_input"
            value={sensorStatesSupported[0]?.name || ""}
            displayEmpty
            onChange={(event) => updateSensorType(event.target.value)}
          >
            <MenuItem value="">Select</MenuItem>
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
        </div>
      </div>
    </div>
  );
})

export default SensorState
