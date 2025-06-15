import React from 'react';

const Open = (props) => {

  return (
    Object.keys(props.states).includes("openPercent") ?
      <div className="device_card_status">
        {
          props.device.attributes.discreteOnlyOpenClose ?
            props.states.openPercent === 0 ? "Open" : "Close"
          :
            <>{props.states.openPercent} %</>
        }
      </div>
    : <></>
  );
  
}

export default Open
