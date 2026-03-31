import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {TextField, Select, MenuItem} from '@mui/material';

const attributes = {
  availableThermostatModes: ["off"],
  thermostatTemperatureRange: {
    minThresholdCelsius: 18,
    maxThresholdCelsius: 22,
  },
  thermostatTemperatureUnit: "C",
  bufferRangeCelsius: 2,
  commandOnlyTemperatureSetting: false,
  queryOnlyTemperatureSetting: false
}

const states = {
  activeThermostatMode: "off",
  thermostatMode: "off",
  thermostatTemperatureAmbient: 22,
  thermostatTemperatureSetpoint: 22
}

const TemperatureSetting = forwardRef((props, ref) => {
  
  const [availableThermostatModes, setAvailableThermostatModes] = useState(attributes.availableThermostatModes)
  const [commandOnlyTemperatureSetting, setCommandOnlyTemperatureSetting] = useState(attributes.commandOnlyTemperatureSetting)
  const [queryOnlyTemperatureSetting, setQueryOnlyTemperatureSetting] = useState(attributes.queryOnlyTemperatureSetting)
  const [thermostatTemperatureUnit, setThermostatTemperatureUnit] = useState(attributes.thermostatTemperatureUnit)
  const [thermostatTemperatureRange, setThermostatTemperatureRange] = useState(attributes.thermostatTemperatureRange)
  const [bufferRangeCelsius, setBufferRangeCelsius] = useState(attributes.bufferRangeCelsius)
  
  useEffect(() => {
    if ("commandOnlyTemperatureSetting" in props.attributes) {
      setAvailableThermostatModes(props.attributes.availableThermostatModes)
      setCommandOnlyTemperatureSetting(props.attributes.commandOnlyTemperatureSetting)
      setQueryOnlyTemperatureSetting(props.attributes.queryOnlyTemperatureSetting)
      setThermostatTemperatureUnit(props.attributes.thermostatTemperatureUnit)
      setThermostatTemperatureRange(props.attributes.thermostatTemperatureRange)
      setBufferRangeCelsius(props.attributes.bufferRangeCelsius)
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

  const switchMode = (mode, checked) => {
    let _availableThermostatModes = [...availableThermostatModes]
    if (checked && !_availableThermostatModes.includes(mode)) {
      _availableThermostatModes.push(mode)
    } else if (!checked && _availableThermostatModes.includes(mode)) {
      let index = _availableThermostatModes.indexOf(mode);
      _availableThermostatModes.splice(index, 1);
    }
    setAvailableThermostatModes(_availableThermostatModes)
    props.updateAttributes("availableThermostatModes", _availableThermostatModes, "update")
  }

  const updateRange = (key, value) => {
    let _thermostatTemperatureRange = {...thermostatTemperatureRange}
    _thermostatTemperatureRange[key] = value
    setThermostatTemperatureRange(_thermostatTemperatureRange)
    props.updateAttributes("thermostatTemperatureRange", _thermostatTemperatureRange, "update")
  }

  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>commandOnlyTemperatureSetting</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setCommandOnlyTemperatureSetting(checked)
              props.updateAttributes("commandOnlyTemperatureSetting", checked, "update")
            }}
            checked={commandOnlyTemperatureSetting}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>queryOnlyTemperatureSetting</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setQueryOnlyTemperatureSetting(checked)
              props.updateAttributes("queryOnlyTemperatureSetting", checked, "update")
            }}
            checked={queryOnlyTemperatureSetting}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Thermostat modes
        </div>
        <div className="attributes_col_2">
          <i>off</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("off", checked)
            }}
            checked={availableThermostatModes.includes("off")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>heat</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("heat", checked)
            }}
            checked={availableThermostatModes.includes("heat")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>cool</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("cool", checked)
            }}
            checked={availableThermostatModes.includes("cool")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>on</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("on", checked)
            }}
            checked={availableThermostatModes.includes("on")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>heatcool</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("heatcool", checked)
            }}
            checked={availableThermostatModes.includes("heatcool")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>auto</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("auto", checked)
            }}
            checked={availableThermostatModes.includes("auto")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>fan-only</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("fan-only", checked)
            }}
            checked={availableThermostatModes.includes("fan-only")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>purifier</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("purifier", checked)
            }}
            checked={availableThermostatModes.includes("purifier")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>eco</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("eco", checked)
            }}
            checked={availableThermostatModes.includes("eco")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right"></div>
        <div className="attributes_col_2">
          <i>dry</i>
        </div>
        <div className="attributes_col_3">
          <Switch
            onChange={(checked) => {
              switchMode("dry", checked)
            }}
            checked={availableThermostatModes.includes("dry")}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>thermostatTemperatureUnit</i>
        </div>
        <div className="attributes_col_2">
          <Select
            name="ddns/provider"
            className="table_input"
            value={thermostatTemperatureUnit || "C"}
            onChange={(event) => {
              setThermostatTemperatureUnit(event.target.value)
              props.updateAttributes("thermostatTemperatureUnit", event.target.value, "update")
            }}
          >
            <MenuItem value="C">Celsius</MenuItem>
            <MenuItem value="F">Fahrenheit</MenuItem>
          </Select>
        </div>
      </div>      
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Minimum temperature
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={thermostatTemperatureRange.minThresholdCelsius}
            onChange={event => {
              if (event.target.value < thermostatTemperatureRange.maxThresholdCelsius)
                updateRange("minThresholdCelsius", parseInt(event.target.value))
            }}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Maximum temperature
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={thermostatTemperatureRange.maxThresholdCelsius}
            onChange={event => {
              if (event.target.value > thermostatTemperatureRange.minThresholdCelsius)
                updateRange("maxThresholdCelsius", parseInt(event.target.value))
            }}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Range
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={bufferRangeCelsius}
            onChange={event => {
              setBufferRangeCelsius(parseInt(event.target.value))
              props.updateAttributes("bufferRangeCelsius", parseInt(event.target.value), "update")
            }}
          />
        </div>
      </div>
    </div>
  );
  
})

export default TemperatureSetting
