import React, {useEffect, forwardRef, useImperativeHandle} from 'react';
import Switch from "react-switch";

const attributes = {
  commandOnlyBrightness: false,
}

const states = {
  brightness: 100
}

const Brightness = forwardRef((props, ref) => {

  useEffect(() => {
    props.updateAttributes(null, attributes, "insert")
    props.updateStatus(null, states, "insert")
  }, [])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateAttributes(null, attributes, "drop")
      props.updateStatus(null, states, "drop")
    }
  }))

  return (
    <div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyBrightness</i>
        </div>
        <div className="three_table_cel">
          <Switch onChange={(checked) => props.updateAttributes("commandOnlyBrightness", checked, "update")} checked={props.attributes.commandOnlyBrightness} />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the brightness.</span>
        </div>
      </div>
    </div>
  );
  
})

export default Brightness
