import React, {useEffect} from 'react';

const ArmDisarm = (props) => {

  useEffect(() => {
    if (Object.keys(props.states).includes("isArmed")) {
      props.setStripColor("#673AB7")
      props.setStripOn(props.states.isArmed)
    }
  }, [props])
    
  return (
    Object.keys(props.states).includes("currentArmLevel") ?
      <div className="device_card_status">
        <span>{props.states.currentArmLevel.length > 0 ? props.states.currentArmLevel : "Unknown"}</span>
      </div>
    : <></>
  );
  
}

export default ArmDisarm
