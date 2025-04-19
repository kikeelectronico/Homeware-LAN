import React, {useEffect, forwardRef, useImperativeHandle} from 'react';

const states = {
  isLocked: false,
  isJammed: false
}

const LockUnlock = forwardRef((props, ref) => {

  useEffect(() => {
    if ("isLocked" in props.states) {
      
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

export default LockUnlock
