import React from 'react';

const Brightness = (props) => {
  
  return (
    Object.keys(props.states).includes("brightness") ?
      <div className="device_card_status">
          <span>{props.states.brightness} %</span>
      </div>
  : <></>
  );
  
}

export default Brightness
