import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {TextField} from '@mui/material';

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
    let _humiditySetpointRange = {...humiditySetpointRange}
    _humiditySetpointRange[key] = value
    setHumiditySetpointRange(_humiditySetpointRange)
    props.updateAttributes("humiditySetpointRange", _humiditySetpointRange, "update")
  }

  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>commandOnlyHumiditySetting</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setCommandOnlyHumiditySetting(checked)
              props.updateAttributes("commandOnlyHumiditySetting", checked, "update")
            }}
            checked={commandOnlyHumiditySetting}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>queryOnlyHumiditySetting</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setQueryOnlyHumiditySetting(checked)
              props.updateAttributes("queryOnlyHumiditySetting", checked, "update")
            }}
            checked={queryOnlyHumiditySetting}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Minimum humidity
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={humiditySetpointRange.minPercent}
            onChange={event => {
              updateRange("minPercent", parseInt(event.target.value))
            }}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          Maximum humidity
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            type="number"
            value={humiditySetpointRange.maxPercent}
            onChange={event => {
              updateRange("maxPercent", parseInt(event.target.value))
            }}
          />
        </div>
      </div>
    </div>
  );
  
})

export default HumiditySetting
