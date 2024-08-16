import React, {useEffect, forwardRef, useImperativeHandle} from 'react';

const states = {
  currentRunCycle: [],
  currentTotalRemainingTime: 0,
  currentCycleRemainingTime: 0
}

const RunCycle = forwardRef((props, ref) => {

  useEffect(() => {
    if ("currentRunCycle" in props.status) {
      
    } else {
      props.updateStatus(null, states, "insert")
    }
  }, [])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStatus(null, states, "drop")
    }
  }))

  return (
    <>
      <div className="no_attributes_message">
        <span>This trait don't need to be configured.</span>
      </div>
    </>
  )
})

export default RunCycle
