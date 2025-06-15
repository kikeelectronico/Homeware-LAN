import React from "react";

const TemperatureAmbient = (props) => {

  return (
    <>
      {
        Object.keys(props.states).includes("thermostatTemperatureAmbient") ?
          <div className="device_card_status">
            {props.states.thermostatTemperatureAmbient} {props.device.attributes.thermostatTemperatureUnit === "C" ? "ºC" : "F"}
          </div>
        : <></>
      }
      {
        Object.keys(props.states).includes("temperatureAmbientCelsius") ?
          <div className="device_card_status">
            {props.states.temperatureAmbientCelsius} {props.device.attributes.temperatureUnitForUX === "C" ? "ºC" : "F"}
          </div>
        : <></>
      }
    </>
  )

}

export default TemperatureAmbient;
