import React from "react";

const TemperatureAmbient = (props) => {

  return (
    Object.keys(props.states).includes("thermostatTemperatureAmbient") ?
      <span>
        {props.states.thermostatTemperatureAmbient} {props.device.attributes.thermostatTemperatureUnit === "C" ? "ºC" : "F"}
      </span>
    : <></>
  )
  
}

export default TemperatureAmbient;
