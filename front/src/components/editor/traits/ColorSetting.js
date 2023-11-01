import React, {useEffect, forwardRef, useImperativeHandle} from 'react';
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

  useEffect(() => {
    if ("commandOnlyColorSetting" in props.attributes) {} else {
      props.updateAttributes(null, attributes, "insert")
      props.updateStatus(null, states, "insert")
    }
  }, [])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateAttributes(null, attributes, "drop")
      props.updateStatus(null, states, "drop")
    }
  }))

  const updateRange = (sub_attribute, value) => {
    let colorTemperatureRange = {...props.attributes.colorTemperatureRange}
    colorTemperatureRange[sub_attribute] = value
    props.updateAttributes("colorTemperatureRange", colorTemperatureRange, "update")
  }

  return (
    <div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>Color type</i>
        </div>
        <div className="three_table_cel">
          <select name="type" onChange={event => props.updateAttributes("colorModel", event.target.value, "update")} className="table_input" value={props.attributes.colorModel ? props.attributes.colorModel : "temperature"}>
            <option value="">No color</option>
            <option value="rgb">RGB light</option>
            <option value="hsv">HSV light</option>
          </select>
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Select a color coding format.</span>
        </div>
      </div>
      
          
            <div className="three_table_row">
              <div className="three_table_cel align_right">
                Minimum temperature
              </div>
              <div className="three_table_cel">
                <input type="number"  onChange={event => updateRange("temperatureMinK", parseInt(event.target.value))} defaultValue={props.attributes.colorTemperatureRange ? props.attributes.colorTemperatureRange.temperatureMinK : 0} min="0" max="10000" className="int_input"/>
              </div>
              <div className="three_table_cel">
                <span className="attribute_advise">Minimum color temperature (in Kelvin) supported by the device.</span>
              </div>
            </div>
            <div className="three_table_row">
              <div className="three_table_cel align_right">
                Maximum temperature
              </div>
              <div className="three_table_cel">
                <input type="number"  onChange={event => updateRange("temperatureMaxK", parseInt(event.target.value))} defaultValue={props.attributes.colorTemperatureRange ? props.attributes.colorTemperatureRange.temperatureMaxK : 0} min="0" max="10000" className="int_input"/>
              </div>
              <div className="three_table_cel">
                <span className="attribute_advise">Maximum color temperature (in Kelvin) supported by the device.</span>
              </div>
            </div>
            <div className="three_table_row">
              <div className="three_table_cel align_right">
                <i>commandOnlyColorSetting</i>
              </div>
              <div className="three_table_cel">
                <Switch onChange={(checked) => props.updateAttributes("commandOnlyColorSetting", checked, "update")} checked={props.attributes.commandOnlyColorSetting} />
              </div>
              <div className="three_table_cel">
                <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the color.</span>
              </div>
            </div>
    </div>
  );
  
})

export default ColorSetting
