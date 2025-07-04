import React, {useState, useEffect}  from 'react';

const LockUnlock = (props) => {

  const [title, setTitle] = useState("")
  const [color, setColor] = useState("#777")

  useEffect(() => {
    if (Object.keys(props.states).includes("isLocked")) {
      if (props.states.isJammed) {
        setTitle("Jammed")
        setColor("#FF5722")
        props.setStripColor("#FF5722")
      } else if (props.states.isLocked) {
        setTitle("Locked")
        setColor("#4CAF50")
        props.setStripColor("#4CAF50")
      } else if (!props.states.isLocked) {
        setTitle("Unlocked")
        setColor("#2196F3")
        props.setStripColor("#2196F3")
      }
      props.setStripOn(true)
    }
  }, [props])
    
  return (
    Object.keys(props.states).includes("isLocked") ?
      <div className="device_card_status">
        <span style={{color: color}}>{title}</span>
      </div>
    : <></>
  );

}

export default LockUnlock
