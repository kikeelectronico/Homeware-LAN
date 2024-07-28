import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  humiditySetpointRange: {
    minPercent: 0,
    maxPercent: 100,
  },
  commandOnlyHumiditySetting: false,
  queryOnlyHumiditySetting: false
}

const states = {
  humidityAmbientPercent: 22,
  humiditySetpointPercent: 22
}

const HumiditySetting = forwardRef((props, ref) => {
  
  const [commandOnlyHumiditySetting, setCommandOnlyHumiditySetting] = useState(attributes.commandOnlyHumiditySetting)
  const [queryOnlyHumiditySetting, setQueryOnlyHumiditySetting] = useState(attributes.queryOnlyHumiditySetting)
  const [humiditySetpointRange, setHumiditySetpointRange] = useState(attributes.humiditySetpointRange)
  
  useEffect(() => {
    if ("commandOnlyHumiditySetting" in props.attributes) {
      setCommandOnlyHumiditySetting(props.attributes.commandOnlyHumiditySetting)
      setQueryOnlyHumiditySetting(props.attributes.queryOnlyHumiditySetting)
      setHumiditySetpointRange(props.attributes.humiditySetpointRange)
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
    let _humiditySetpointRange = {...humiditySetpointRange}
    _humiditySetpointRange[key] = value
    setHumiditySetpointRange(_humiditySetpointRange)
    props.updateAttributes("humiditySetpointRange", _humiditySetpointRange, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyHumiditySetting</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyHumiditySetting(checked)
              props.updateAttributes("commandOnlyHumiditySetting", checked, "update")
            }}
            checked={commandOnlyHumiditySetting}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyHumiditySetting</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyHumiditySetting(checked)
              props.updateAttributes("queryOnlyHumiditySetting", checked, "update")
            }}
            checked={queryOnlyHumiditySetting}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Minimum humidity
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              updateRange("minPercent", parseInt(event.target.value))
            }}
            value={humiditySetpointRange.minPercent}
            min="0" max="100" className="int_input"
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Maximum humidity
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              updateRange("maxPercent", parseInt(event.target.value))
            }}
            value={humiditySetpointRange.maxPercent}
            min="0" max="100" className="int_input"
          />
        </div>
      </div>
    </>
  );
  
})

export default HumiditySetting
