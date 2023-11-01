import React, {useEffect, forwardRef, useImperativeHandle} from 'react';
import Switch from "react-switch";

const attributes = {
  commandOnlyOnOff: false,
  queryOnlyOnOff: false
}

const states = {
  on: false
}

const OnOff = forwardRef((props, ref) => {

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
          <i>commandOnlyOnOff</i>
        </div>
        <div className="three_table_cel">
          <Switch onChange={(checked) => props.updateAttributes("commandOnlyOnOff", checked, "update")} checked={props.attributes.commandOnlyOnOff} />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyOnOff</i>
        </div>
        <div className="three_table_cel">
          <Switch onChange={(checked) => props.updateAttributes("queryOnlyOnOff", checked, "update")} checked={props.attributes.queryOnlyOnOff} />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Google shouldn't change the device state.</span>
        </div>
      </div>
    </div>
  )
})

export default OnOff
