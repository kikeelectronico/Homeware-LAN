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
    if (props.status.thermostatMode === "off") _color = "#666";
    else if (props.status.thermostatMode === "heat") _color = "red";
    else if (props.status.thermostatMode === "cool") _color = "lightblue";
    else if (props.status.thermostatMode === "on") _color = "yellow";
    else if (props.status.thermostatMode === "heatcool") _color = "#DC97FF";
    else if (props.status.thermostatMode === "auto") _color = "#EE357E";
    else if (props.status.thermostatMode === "fan-only") _color = "blue";
    else if (props.status.thermostatMode === "purifier") _color = "#F3882E";
    else if (props.status.thermostatMode === "eco") _color = "green";
    else if (props.status.thermostatMode === "dry") _color = "#753500";
    setColor(_color)
  }, [props.status.thermostatMode])

  return (
    <div>
      <div className="device_card">
        <div className="device_card_color_strip" style={{backgroundColor: color, opacity: props.status.on ? "1" : "0.4"}}></div>
        <h2 className="device_card_title">{props.device.name.name}</h2>
        <hr className="device_card_divider" />
        <div style={{paddingLeft: "35px"}}>
          <TemperatureAmbient
            id={props.device.id}
            status={props.status}
          />
          <TemperatureSetting
            id={props.device.id}
            status={props.status}
            on={props.status}
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
