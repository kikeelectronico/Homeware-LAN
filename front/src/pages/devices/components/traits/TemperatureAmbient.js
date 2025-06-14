import React from "react";

const TemperatureAmbient = (props) => {
  return (
    Object.keys(props.states).includes("thermostatTemperatureAmbient") ?
      <span style={{color: "#777"}}>
        {props.states.thermostatTemperatureAmbient}
      </span>
    : <></>
  )
}

export default TemperatureAmbient;
