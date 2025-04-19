import React, {useState, useEffect} from "react";
import TemperatureAmbient from "./traits/TemperatureAmbient";
import TemperatureSetting from "./traits/TemperatureSetting";
import Information from "./aux/Information";
import Connecting from "./aux/Connecting";
import Edit from "./aux/Edit";

const Thermostat = (props) => {

  const [color, setColor] = useState("yellow")

  useEffect(() => {
    var _color = "yellow";
    if (props.states.thermostatMode === "off") _color = "#666";
    else if (props.states.thermostatMode === "heat") _color = "red";
    else if (props.states.thermostatMode === "cool") _color = "lightblue";
    else if (props.states.thermostatMode === "on") _color = "yellow";
    else if (props.states.thermostatMode === "heatcool") _color = "#DC97FF";
    else if (props.states.thermostatMode === "auto") _color = "#EE357E";
    else if (props.states.thermostatMode === "fan-only") _color = "blue";
    else if (props.states.thermostatMode === "purifier") _color = "#F3882E";
    else if (props.states.thermostatMode === "eco") _color = "green";
    else if (props.states.thermostatMode === "dry") _color = "#753500";
    setColor(_color)
  }, [props.states.thermostatMode])

  return (
    <div>
      <div className="device_card">
        <div className="device_card_color_strip" style={{backgroundColor: color, opacity: props.states.on ? "1" : "0.4"}}></div>
        <h2 className="device_card_title">{props.device.name.name}</h2>
        <hr className="device_card_divider" />
        <div style={{paddingLeft: "35px"}}>
          <TemperatureAmbient
            id={props.device.id}
            states={props.states}
          />
          <TemperatureSetting
            id={props.device.id}
            states={props.states}
            on={props.states}
            reload={props.reload}
          />
          <Information id={props.device.id} />
          <Connecting id={props.device.id} />
          <Edit id={props.device.id} />
        </div>
      </div>
    </div>
  );
  
}

export default Thermostat;
