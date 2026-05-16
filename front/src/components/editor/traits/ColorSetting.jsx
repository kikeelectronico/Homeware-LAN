import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {TextField, Select, MenuItem} from '@mui/material';

const attributes = {
  commandOnlyColorSetting: false,
  colorModel: "rgb",
  colorTemperatureRange: {
    temperatureMinK: 2000,
    temperatureMaxK: 3000
  }
}

const states = {
  color: {
    spectrumRgb: 16711935
  }
}

const ColorSetting = forwardRef((props, ref) => {

  const [commandOnlyColorSetting, setCommandOnlyColorSetting] = useState(attributes.commandOnlyColorSetting)
  const [colorModel, setColorModel] = useState(attributes.colorModel)
  const [colorTemperatureRange, setColorTemperatureRange] = useState(attributes.colorTemperatureRange)

  useEffect(() => {
    if ("commandOnlyColorSetting" in props.attributes) {
      setCommandOnlyColorSetting(props.attributes.commandOnlyColorSetting)
      setColorModel("colorModel" in props.attributes ? props.attributes.colorModel : "")
      setColorTemperatureRange("colorTemperatureRange" in props.attributes ? props.attributes.colorTemperatureRange : undefined)
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

  const updateType = (type) => {
    setColorModel(type)
    if (type === "") {
      props.updateAttributes("colorModel", null, "delete")
      setColorTemperatureRange(attributes.colorTemperatureRange)
      props.updateAttributes("colorTemperatureRange", attributes.colorTemperatureRange, "update")
      props.updateStates("color", {temperatureK: 3000}, "update")
    } else if (type === "hsv") {
      props.updateAttributes("colorModel", type, "update")
      setColorTemperatureRange(undefined)
      props.updateAttributes("colorTemperatureRange", null, "delete")
      props.updateStates("color", {spectrumHSV: {hue: 300, saturation: 1, value: 1}}, "update")
    } else {
      props.updateAttributes("colorModel", type, "update")
      setColorTemperatureRange(undefined)
      props.updateAttributes("colorTemperatureRange", null, "delete")
      props.updateStates("color", states.color, "update")
    }
  }

  const updateRange = (sub_attribute, value) => {
    let _colorTemperatureRange = {...colorTemperatureRange}
    _colorTemperatureRange[sub_attribute] = value
    setColorTemperatureRange(_colorTemperatureRange)
    props.updateAttributes("colorTemperatureRange", _colorTemperatureRange, "update")
  }

  return (
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>commandOnlyColorSetting</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setCommandOnlyColorSetting(checked)
              props.updateAttributes("commandOnlyColorSetting", checked, "update")
            }}
            checked={commandOnlyColorSetting}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>Color type</i>
        </div>
        <div className="attributes_col_2">
          <Select
            name="ddns/provider"
            className="table_input"
            value={colorModel || ""}
            displayEmpty
            onChange={event => updateType(event.target.value)}
          >
            <MenuItem value="">Color temperature</MenuItem>
            <MenuItem value="rgb">RGB light</MenuItem>
            <MenuItem value="hsv">HSV light</MenuItem>
          </Select>
        </div>
      </div> 
      {
        colorTemperatureRange ?
          <>
             <div className="attributes_row">
              <div className="attributes_col_1 attributes_label align_right">
                Minimum temperature
              </div>
              <div className="attributes_col_2">
                <TextField
                  variant="outlined"
                  type="number"
                  value={colorTemperatureRange.temperatureMinK}
                  onChange={(event) =>  updateRange("temperatureMinK", parseInt(event.target.value))}
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
                  value={colorTemperatureRange.temperatureMaxK}
                  onChange={(event) => updateRange("temperatureMaxK", parseInt(event.target.value))}
                />
              </div>
            </div>
          </>
        : <></>
      }      
    </div>
  );
  
})

export default ColorSetting
