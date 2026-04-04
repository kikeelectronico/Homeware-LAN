import React, {useEffect}  from 'react';

const Occupancy = (props) => {

  useEffect(() => {
      if (Object.keys(props.states).includes("occupancy")) {
        props.setStripColor("#2196F3")
        props.setStripOn(props.states.occupancy === "OCCUPIED")
      }
    }, [props])

  return (
    Object.keys(props.states).includes("occupancy") ?
      <div className="device_card_status">
        {
          props.states.occupancy === "OCCUPIED" ? "Occupied" : "Unoccupied"
        }
      </div>
    : <></>
  );
  
}

export default Occupancy
