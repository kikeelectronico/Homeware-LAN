import React from 'react';

const Open = (props) => {
  
  return (
    Object.keys(props.states).includes("openPercent") ?
      <div>
        {props.states.openPercent} %
      </div>
  : <></>
    
  );
  
}


export default Open
