import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {TextField, Select, MenuItem} from '@mui/material';

const attributes = {
  temperatureRange: {
    minThresholdCelsius: 18,
    maxThresholdCelsius: 22,
  },
  temperatureStepCelsius: 2,
  temperatureUnitForUX: "C",
  commandOnlyTemperatureControl: false,
  queryOnlyTemperatureControl: false
}

const states = {
  temperatureSetpointCelsius: 22,
  temperatureAmbientCelsius: 22
}

const TemperatureControl = forwardRef((props, ref) => {
  
  const [commandOnlyTemperatureControl, setCommandOnlyTemperatureControl] = useState(attributes.commandOnlyTemperatureControl)
  const [queryOnlyTemperatureControl, setQueryOnlyTemperatureControl] = useState(attributes.queryOnlyTemperatureControl)
  const [temperatureStepCelsius, setTemperatureStepCelsius] = useState(attributes.temperatureStepCelsius)
  const [temperatureUnitForUX, setTemperatureUnitForUX] = useState(attributes.temperatureUnitForUX)
  const [temperatureRange, setTemperatureRange] = useState(attributes.temperatureRange)
  
  useEffect(() => {
    if ("commandOnlyTemperatureControl" in props.attributes) {
      setCommandOnlyTemperatureControl(props.attributes.commandOnlyTemperatureControl)
      setQueryOnlyTemperatureControl(props.attributes.queryOnlyTemperatureControl)
      setTemperatureStepCelsius(props.attributes.temperatureStepCelsius)
      setTemperatureUnitForUX(props.attributes.temperatureUnitForUX)
      setTemperatureRange(props.attributes.temperatureRange)
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

  const updateRange = (key, value) => {
    let _temperatureRange = {...temperatureRange}
    _temperatureRange[key] = value
    setTemperatureRange(_temperatureRange)
    props.updateAttributes("temperatureRange", _temperatureRange, "update")
  }

  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          <i>commandOnlyTemperatureControl</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setCommandOnlyTemperatureControl(checked)
              props.updateAttributes("commandOnlyTemperatureControl", checked, "update")
            }}
            checked={commandOnlyTemperatureControl}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          <i>queryOnlyTemperatureControl</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setQueryOnlyTemperatureControl(checked)
              props.updateAttributes("queryOnlyTemperatureControl", checked, "update")
            }}
            checked={queryOnlyTemperatureControl}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          <i>temperatureUnitForUX</i>
        </div>
        <div className="attributes_col_2">
          <Select
            name="ddns/provider"
            className="table_input"
            value={temperatureUnitForUX || "C"}
            onChange={(event) => {
              setTemperatureUnitForUX(event.target.value)
              props.updateAttributes("temperatureUnitForUX", event.target.value, "update")
            }}
          >
            <MenuItem value="C">Celsius</MenuItem>
            <MenuItem value="F">Fahrenheit</MenuItem>
          </Select>
        </div>
      </div>      
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          Minimum temperature
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={temperatureRange.minThresholdCelsius}
            onChange={event => {
              if (event.target.value < temperatureRange.maxThresholdCelsius)
                updateRange("minThresholdCelsius", parseInt(event.target.value))
            }}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          Maximum temperature
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={temperatureRange.maxThresholdCelsius}
            onChange={event => {
              if (event.target.value > temperatureRange.minThresholdCelsius)
                updateRange("maxThresholdCelsius", parseInt(event.target.value))
            }}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          <i>temperatureStepCelsius</i>
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={temperatureStepCelsius}
            onChange={event => {
              setTemperatureStepCelsius(parseInt(event.target.value))
              props.updateAttributes("temperatureStepCelsius", parseInt(event.target.value), "update")
            }}
          />
        </div>
      </div>
    </div>
  );
  
})

export default TemperatureControl
