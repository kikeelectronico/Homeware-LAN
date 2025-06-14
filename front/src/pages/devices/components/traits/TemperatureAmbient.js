import React from "react";

const TemperatureAmbient = (props) => {

  return (
    Object.keys(props.states).includes("thermostatTemperatureAmbient") ?
      <div className="device_card_status">
        {props.states.thermostatTemperatureAmbient} {props.device.attributes.thermostatTemperatureUnit === "C" ? "ºC" : "F"}
      </div>
    : <></>
  )

}

export default TemperatureAmbient;
