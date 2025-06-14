import React from 'react';

const Open = (props) => {

  return (
    Object.keys(props.states).includes("openPercent") ?
      <div className="device_card_status">
        {props.states.openPercent} %
      </div>
    : <></>
  );
  
}

export default Open
