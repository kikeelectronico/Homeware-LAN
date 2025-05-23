import React from "react";
import getCookieValue from "../../../functions";
import { root } from "../../../constants";

const TemperatureSetting = (props) => {

  const up = () => {
    var temperature = props.states.thermostatTemperatureSetpoint + 1;
    update(temperature);
  }

  const down = () => {
    var temperature = props.states.thermostatTemperatureSetpoint - 1;
    update(temperature);
  }

  const update = (temperature) => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          props.reload();
        } else {
          console.error(http.statusText);
        }
      }
    }
    http.open("PATCH", root + "api/devices/" + props.id + "/states");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send(
      JSON.stringify({
        "thermostatTemperatureSetpoint": temperature,
      })
    );
  }

  return (
    <div style={{float: 'left', marginLeft: '5px', height: "30px"}}>
      <span style={{color: "#777"}}>to</span>
      <img src="/devices/arrow_down.png" onClick={down} alt="Arrow up" style={{ width: "30px"}}/>
      <span style={{fontSize: "30px", marginLeft: "5px", marginRight: "5px", color: "#777"}}>
        {props.states.thermostatTemperatureSetpoint}
      </span>
      <img src="/devices/arrow_up.png" onClick={up} alt="Arrow down" style={{ width: "30px"}}/>
    </div>
  );
}

export default TemperatureSetting;
