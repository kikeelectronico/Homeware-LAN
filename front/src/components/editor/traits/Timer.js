import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  maxTimerLimitSec: 3600,
  commandOnlyTimer: false
}

const states = {
  timerRemainingSec: 0,
  timerPaused: false
}

const Timer = forwardRef((props, ref) => {

  const [maxTimerLimitSec, setMaxTimerLimitSec] = useState(attributes.maxTimerLimitSec)
  const [commandOnlyTimer, setCommandOnlyTimer] = useState(attributes.commandOnlyTimer)

  useEffect(() => {
    if ("commandOnlyTimer" in props.attributes) {
      setCommandOnlyTimer(props.attributes.commandOnlyTimer)
      setMaxTimerLimitSec(props.attributes.maxTimerLimitSec)
    } else {
      props.updateStates(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStates(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
    }
  }))

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyTimer</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyTimer(checked)
              props.updateAttributes("commandOnlyTimer", checked, "update")
            }}
            checked={commandOnlyTimer}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>maxTimerLimitSec</i>
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              setMaxTimerLimitSec(parseInt(event.target.value))
              props.updateAttributes("maxTimerLimitSec", parseInt(event.target.value), "update")
            }}
            value={maxTimerLimitSec}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>
    </>
  )
})

export default Timer
