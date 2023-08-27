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
    if (props.device.traits.includes("action.devices.traits.ColorSetting" && Object.keys(props.status).includes("color"))){
      if (Object.keys(props.status.color).includes("spectrumRgb"))
      _color = "#" + props.status.color.spectrumRgb.toString(16);
      else
      _color = "#" + props.status.color.spectrumRGB.toString(16);
    }
    setColor(_color)
  }, [props.status, props.device.traits])

  return (
    <div>
      <div className="device_card">
        <div className="device_card_color_strip" style={{backgroundColor: color, opacity: props.status.on ? "1" : "0.4"}}></div>
        <h2 className="device_card_title">{ props.device.name.name }</h2>
        <hr className="device_card_divider"/>
        <div style={{paddingLeft: "35px"}}>
          {
            Object.keys(props.status).includes("on") ?
              <OnOff id={ props.device.id } on={ props.status.on } reload={ props.reload }/>
            :
            <></>
          }
          {
            Object.keys(props.status).includes("brightness") ?
              <Brightness id={ props.device.id } brightness={ props.status.brightness }/>
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
