import React from "react";

const TemperatureAmbient = (props) => {
  return (
    <div style={{float: "left", marginLeft: "5px", marginTop: 2}}>
      <span style={{color: "#777"}}>from</span>
      <span style={{fontSize: "30px", marginLeft: "5px", marginRight: "5px", color: "#777"}}>
        {props.status.thermostatTemperatureAmbient}
      </span>
    </div>
  )
}

export default TemperatureAmbient;
