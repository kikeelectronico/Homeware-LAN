import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const states = {
  isDocked: false
}

const Dock = forwardRef((props, ref) => {

  useEffect(() => {
    if ("isDocked" in props.status) {
      
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

export default Dock