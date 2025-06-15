import React, {useEffect}  from 'react';

const Open = (props) => {

  useEffect(() => {
      if (Object.keys(props.states).includes("openPercent")) {
        props.setStripColor("#2196F3")
        props.setStripOn(props.states.openPercent === 100)
      }
    }, [props.states])

  return (
    Object.keys(props.states).includes("openPercent") ?
      <div className="device_card_status">
        {
          props.device.attributes.discreteOnlyOpenClose ?
            props.states.openPercent === 0 ? "Close" : "Open"
          :
            <>{props.states.openPercent} %</>
        }
      </div>
    : <></>
  );
  
}

export default Open
