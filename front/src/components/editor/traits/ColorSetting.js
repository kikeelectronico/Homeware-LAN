import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

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
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyColorSetting</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyColorSetting(checked)
              props.updateAttributes("commandOnlyColorSetting", checked, "update")
            }}
            checked={commandOnlyColorSetting}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>Color type</i>
        </div>
        <div className="three_table_cel">
          <select 
            name="type"
            onChange={event => updateType(event.target.value)}
            className="table_input"
            value={colorModel}
          >
            <option value="">Color temperature</option>
            <option value="rgb">RGB light</option>
            <option value="hsv">HSV light</option>
          </select>
        </div>
      </div> 
      {
        colorTemperatureRange ?
          <>
             <div className="three_table_row">
              <div className="three_table_cel align_right">
                Minimum temperature
              </div>
              <div className="three_table_cel">
                <input
                  type="number"
                  onChange={event => {
                    updateRange("temperatureMinK", parseInt(event.target.value))
                  }}
                  value={colorTemperatureRange.temperatureMinK}
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
                    updateRange("temperatureMaxK", parseInt(event.target.value))
                  }}
                  value={colorTemperatureRange.temperatureMaxK}
                  min="0" max="10000" className="int_input"
                />
              </div>
            </div>
          </>
        : <></>
      }      
    </>
  );
  
})

export default ColorSetting
