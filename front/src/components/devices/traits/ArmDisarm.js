import React, {useState, useEffect} from 'react';

const ArmDisarm = (props) => {

  const [currentArmLevel, setCurrentArmLevel] = useState("")

  useEffect(() => {
    var _currentArmLevel = props.states.currentArmLevel
    if (_currentArmLevel.length > 15) _currentArmLevel = props.states.currentArmLevel.substring(0,15) + '...'
    setCurrentArmLevel(_currentArmLevel)
  }, [props.states.currentArmLevel])
  
  return (
    <div
      style={{float: 'left', marginLeft: '5px', height: "30px"}}
    >
      <img src={props.states.isArmed ? "/devices/lock_close.png" : "/devices/lock_open.png"} title={props.states.isArmed ? "Armed" : "Disarmed"} alt={"lock icon"} style={{width: '30px'}} />
      <span
        style={{color: "#777", fontSize: 25, lineHeight: "30px", verticalAlign: "middle"}}
      >
        {currentArmLevel} %
      </span>
    </div>
  );
  
}

export default ArmDisarm
