import React, {useState, useEffect}  from 'react';

const StartStop = (props) => {

  const [title, setTitle] = useState("")
  const [color, setColor] = useState("#777")

  useEffect(() => {
    if (Object.keys(props.states).includes("isRunning")) {
      if (props.states.isPaused) {
        setTitle("Pause")
        setColor("#FF9800")
        props.setStripColor("#FF9800")
      } else if (props.states.isRunning) {
        setTitle("Running")
        setColor("#4CAF50")
        props.setStripColor("#4CAF50")
      } else if (!props.states.isRunning) {
        setTitle("Stop")
        setColor("#777")
        props.setStripColor("#777")
      }
      props.setStripOn(true)
    }
  }, [props.states])
    
  return (
    Object.keys(props.states).includes("isRunning") ?
      <div className="device_card_status">
        <span style={{color: color}}>{title}</span>
      </div>
  : <></>
  );

}

export default StartStop
