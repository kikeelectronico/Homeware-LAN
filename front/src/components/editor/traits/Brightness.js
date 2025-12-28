import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  commandOnlyBrightness: false,
}

const states = {
  brightness: 100
}

const Brightness = forwardRef((props, ref) => {

  const [commandOnlyBrightness, setCommandOnlyBrightness] = useState(false)

  useEffect(() => {
    if ("commandOnlyBrightness" in props.attributes) {
      setCommandOnlyBrightness(props.attributes.commandOnlyBrightness)
    } else {
      props.updateStates(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateAttributes(null, attributes, "drop")
      props.updateStates(null, states, "drop")
    }
  }))

  return (
      <div className="attributes_table">
        <div className="attributes_row">
          <div className="attributes_col_1 align_right">
            <i>commandOnlyBrightness</i>
          </div>
          <div className="attributes_col_2">
            <Switch
              onChange={(checked) => {
                setCommandOnlyBrightness(checked)
                props.updateAttributes("commandOnlyBrightness", checked, "update")
              }}
              checked={commandOnlyBrightness}
            />
          </div>
        </div>
      </div>
  );
  
})

export default Brightness
