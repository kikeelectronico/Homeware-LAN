import React, {useEffect, forwardRef, useImperativeHandle} from 'react';

const states = {
  currentStatusReport: []
}

const StatusReport = forwardRef((props, ref) => {

  useEffect(() => {
    if ("currentStatusReport" in props.states) {
      
    } else {
      props.updateStates(null, states, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStates(null, states, "drop")
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

export default StatusReport
