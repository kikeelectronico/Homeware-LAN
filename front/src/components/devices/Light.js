import React, {useState, useEffect} from "react";
import OnOff from './traits/OnOff'
import Brightness from './traits/Brightness'
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

const Light = (props) => {

  const [color, setColor] = useState("yellow")

  useEffect(() => {
    var _color = 'yellow';
    if (props.device.traits.includes("action.devices.traits.ColorSetting" && Object.keys(props.states).includes("color"))){
      if (Object.keys(props.states.color).includes("spectrumRgb"))
      _color = "#" + props.states.color.spectrumRgb.toString(16);
      else
      _color = "#" + props.states.color.spectrumRGB.toString(16);
    }
    setColor(_color)
  }, [props.states, props.device.traits])

  return (
    <div>
      <div className="device_card">
        <div className="device_card_color_strip" style={{backgroundColor: color, opacity: props.states.on ? "1" : "0.4"}}></div>
        <h2 className="device_card_title">{ props.device.name.name }</h2>
        <hr className="device_card_divider"/>
        <div style={{paddingLeft: "35px"}}>
          {
            Object.keys(props.states).includes("on") ?
              <OnOff id={ props.device.id } on={ props.states.on } reload={ props.reload }/>
            :
            <></>
          }
          {
            Object.keys(props.states).includes("brightness") ?
              <Brightness id={ props.device.id } brightness={ props.states.brightness }/>
            :
            <></>
          }
          <Information id={ props.device.id }/>
          <Connecting id={ props.device.id }/>
          <Edit id={ props.device.id }/>
        </div>
      </div>
    </div>
  );
  
}

export default Light
