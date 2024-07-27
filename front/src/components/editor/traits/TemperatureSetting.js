import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

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
      props.updateStatus(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStatus(null, states, "drop")
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
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyTemperatureSetting</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyTemperatureSetting(checked)
              props.updateAttributes("commandOnlyTemperatureSetting", checked, "update")
            }}
            checked={commandOnlyTemperatureSetting}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyTemperatureSetting</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyTemperatureSetting(checked)
              props.updateAttributes("queryOnlyTemperatureSetting", checked, "update")
            }}
            checked={queryOnlyTemperatureSetting}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Thermostat modes
        </div>
        <div className="three_table_cel">
          <i>heat</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("heat", checked)
            }}
            checked={availableThermostatModes.includes("heat")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>cool</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("cool", checked)
            }}
            checked={availableThermostatModes.includes("cool")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>on</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("on", checked)
            }}
            checked={availableThermostatModes.includes("on")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>heatcool</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("heatcool", checked)
            }}
            checked={availableThermostatModes.includes("heatcool")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>auto</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("auto", checked)
            }}
            checked={availableThermostatModes.includes("auto")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>fan-only</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("fan-only", checked)
            }}
            checked={availableThermostatModes.includes("fan-only")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>purifier</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("purifier", checked)
            }}
            checked={availableThermostatModes.includes("purifier")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>eco</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("eco", checked)
            }}
            checked={availableThermostatModes.includes("eco")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right"></div>
        <div className="three_table_cel">
          <i>dry</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              switchMode("dry", checked)
            }}
            checked={availableThermostatModes.includes("dry")}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>thermostatTemperatureUnit</i>
        </div>
        <div className="three_table_cel">
          <select 
            name="type"
            onChange={(event) => {
              setThermostatTemperatureUnit(event.target.value)
              props.updateAttributes("thermostatTemperatureUnit", event.target.value, "update")
            }}
            className="table_input"
            value={thermostatTemperatureUnit}
          >
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </select>
        </div>
      </div>      
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Minimum temperature
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              updateRange("minThresholdCelsius", parseInt(event.target.value))
            }}
            value={thermostatTemperatureRange.minThresholdCelsius}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Maximum temperature
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              updateRange("maxThresholdCelsius", parseInt(event.target.value))
            }}
            value={thermostatTemperatureRange.maxThresholdCelsius}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Range
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              setBufferRangeCelsius(parseInt(event.target.value))
              props.updateAttributes("bufferRangeCelsius", parseInt(event.target.value), "update")
            }}
            value={bufferRangeCelsius}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>

      {/* 

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Units
        </div>
        <div className="three_table_cel">
          <select name="type" id="thermostatTemperatureUnit" className="table_input" value={this.props.attributes.thermostatTemperatureUnit} onChange={this.update}>
            <option value="C">Celsius</option>
            <option value="F">Fahrenheit</option>
          </select>
        </div>
      </div> */}



    </>
  );
  
})

export default TemperatureSetting
