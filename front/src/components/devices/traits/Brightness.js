import React from 'react';

const Brightness = (props) => {
  
  return (
    <div style={{float: 'left', marginLeft: '5px', height: "30px"}}>
      <span style={{color: "#777", fontSize: 25, lineHeight: "30px", verticalAlign: "middle"}}>{props.brightness} %</span>
    </div>
  );
  
}

export default Brightness
