import React from 'react';

const Open = (props) => {
  
  return (
    <div style={{float: 'left', marginLeft: '5px', height: "30px"}}>
      <span style={{color: "#777", fontSize: 25, lineHeight: "30px", verticalAlign: "middle"}}>{props.openPercent} %</span>
    </div>
  );
  
}


export default Open
