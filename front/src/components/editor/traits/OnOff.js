import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  commandOnlyOnOff: false,
  queryOnlyOnOff: false
}

const states = {
  on: false
}

const OnOff = forwardRef((props, ref) => {

  const [commandOnlyOnOff, setCommandOnlyOnOff] = useState(false)
  const [queryOnlyOnOff, setQueryOnlyOnOff] = useState(false)

  useEffect(() => {
    if ("commandOnlyOnOff" in props.attributes) {
      setCommandOnlyOnOff(props.attributes.commandOnlyOnOff)
      setQueryOnlyOnOff(props.attributes.queryOnlyOnOff)
    } else {
      props.updateStatus(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStatus(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
    }
  }))

  return (
    <div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyOnOff</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyOnOff(checked)
              props.updateAttributes("commandOnlyOnOff", checked, "update")
            }}
            checked={commandOnlyOnOff}
          />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">
            Enable it if Homeware-LAN shouldn't inform Google Home about the state.
          </span>
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyOnOff</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyOnOff(checked)
              props.updateAttributes("queryOnlyOnOff", checked, "update")
            }}
            checked={queryOnlyOnOff}
          />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">
            Enable it if Google shouldn't change the device state.
          </span>
        </div>
      </div>
    </div>
  )
})

export default OnOff
