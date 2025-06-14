import React from "react";

const TemperatureAmbient = (props) => {
  return (
    Object.keys(props.states).includes("thermostatTemperatureAmbient") ?
      <span>
        {props.states.thermostatTemperatureAmbient}
      </span>
    : <></>
  )
}

export default TemperatureAmbient;
