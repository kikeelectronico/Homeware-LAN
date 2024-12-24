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
      props.updateStatus(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateAttributes(null, attributes, "drop")
      props.updateStatus(null, states, "drop")
    }
  }))

  return (
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyBrightness</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyBrightness(checked)
              props.updateAttributes("commandOnlyBrightness", checked, "update")
            }}
            checked={commandOnlyBrightness}
          />
        </div>
      </div>
  );
  
})

export default Brightness
