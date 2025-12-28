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
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          <i>commandOnlyOnOff</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setCommandOnlyOnOff(checked)
              props.updateAttributes("commandOnlyOnOff", checked, "update")
            }}
            checked={commandOnlyOnOff}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 align_right">
          <i>queryOnlyOnOff</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setQueryOnlyOnOff(checked)
              props.updateAttributes("queryOnlyOnOff", checked, "update")
            }}
            checked={queryOnlyOnOff}
          />
        </div>
      </div>
    </div>
  )
})

export default OnOff
