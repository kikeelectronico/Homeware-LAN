import React, {useState, useEffect}  from 'react'
import getCookieValue from '../../../../functions'
import { root } from '../../../../constants'

const ThermostatMode = (props) => {

  const [color, setColor] = useState("#777")

  useEffect(() => {
    if (Object.keys(props.states).includes("thermostatMode")) {
      if (props.states.thermostatMode === "heat") {
        props.setStripColor("#FF4500")
        setColor("#FF4500")
      } else if (props.states.thermostatMode === "cool") {
        props.setStripColor("#00BFFF")
        setColor("#00BFFF")
      } else if (props.states.thermostatMode === "fan-only") {
        props.setStripColor("#00CED1")
        setColor("#00CED1")
      } else if (props.states.thermostatMode === "off") {
        props.setStripColor("#757575")
        setColor("#757575")
      } else {
        props.setStripColor("#66BB6A")
        setColor("#66BB6A")
      }
      props.setStripOn(!props.states.thermostatMode == "off")
    }
  }, [props.states])

  const update = () => {
    const availableThermostatModes = props.device.attributes.availableThermostatModes
    const current_mode_index = availableThermostatModes.indexOf(props.states.thermostatMode)
    const new_mode_index = (current_mode_index + 1) < availableThermostatModes.length ? current_mode_index + 1 : 0
    const new_mode = availableThermostatModes[new_mode_index]
    
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
        "thermostatMode": new_mode,
      })
    );
  }

  const mayus = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    Object.keys(props.states).includes("thermostatTemperatureSetpoint") ?
      <div className="device_card_actions_block">
        <div className="device_card_mode_button" style={{backgroundColor: color}} onClick={update}>
          {mayus(props.states.thermostatMode)}
        </div>
      </div>
    : <></>
  );
}

export default ThermostatMode;
