import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

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

  const updateRange = (key, value) => {
    let _temperatureRange = {...temperatureRange}
    _temperatureRange[key] = value
    setTemperatureRange(_temperatureRange)
    props.updateAttributes("temperatureRange", _temperatureRange, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyTemperatureControl</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyTemperatureControl(checked)
              props.updateAttributes("commandOnlyTemperatureControl", checked, "update")
            }}
            checked={commandOnlyTemperatureControl}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyTemperatureControl</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyTemperatureControl(checked)
              props.updateAttributes("queryOnlyTemperatureControl", checked, "update")
            }}
            checked={queryOnlyTemperatureControl}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>temperatureUnitForUX</i>
        </div>
        <div className="three_table_cel">
          <select 
            name="type"
            onChange={(event) => {
              setTemperatureUnitForUX(event.target.value)
              props.updateAttributes("temperatureUnitForUX", event.target.value, "update")
            }}
            className="table_input"
            value={temperatureUnitForUX}
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
            value={temperatureRange.minThresholdCelsius}
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
            value={temperatureRange.maxThresholdCelsius}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>temperatureStepCelsius</i>
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              setTemperatureStepCelsius(parseInt(event.target.value))
              props.updateAttributes("temperatureStepCelsius", parseInt(event.target.value), "update")
            }}
            value={temperatureStepCelsius}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>
    </>
  );
  
})

export default TemperatureControl
