import React from 'react';

const CapacityRemaining = (props) => {

  const units = {
    "SECONDS": "s",
    "MILES": "m",
    "KILOMETERS": "km",
    "PERCENTAGE": "%",
    "KILOWATT_HOURS": "kW/h",
  }
  
  const isCritical = () => {
    switch (props.states.capacityRemaining[0].unit) {
      default:
        return false
      case "PERCENTAGE":
        return props.states.capacityRemaining[0].rawValue <= 10 ? true : false
    }
  }
  
  return (
    Object.keys(props.states).includes("capacityRemaining") ?
      <div className="device_card_status">
          <span style={{color: isCritical() ? "red" : ""}}>
            {props.states.capacityRemaining[0].rawValue}{units[props.states.capacityRemaining[0].unit]}
          </span>
      </div>
  : <></>
  );
  
}

export default CapacityRemaining
