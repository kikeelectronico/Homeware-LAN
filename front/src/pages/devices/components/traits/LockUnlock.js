import React, {useState, useEffect}  from 'react';

const LockUnlock = (props) => {

  const [title, setTitle] = useState("")
  const [color, setColor] = useState("#777")

  useEffect(() => {
    if (props.states.isJammed) {
      setTitle('Jammed')
      setColor("#FF5722")
    } else if (props.states.isLocked) {
      setTitle('Close')
      setColor("#4CAF50")
    } else if (!props.states.isLocked) {
      setTitle('Open')
      setColor("#2196F3")
    }
  }, [props.states])
    
  return (
    Object.keys(props.states).includes("isLocked") ?
      <div>
        <span style={{color: color}}>{title}</span>
      </div>
  : <></>
  );

}

export default LockUnlock
