import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  discreteOnlyOpenClose: false,
  commandOnlyOpenClose: false,
  queryOnlyOpenClose: false
}

const states = {
  openPercent: 0
}

const OpenClose = forwardRef((props, ref) => {

  const [discreteOnlyOpenClose, setDiscreteOnlyOpenClose] = useState(attributes.discreteOnlyOpenClose)
  const [commandOnlyOpenClose, setCommandOnlyOpenClose] = useState(attributes.commandOnlyOpenClose)
  const [queryOnlyOpenClose, setQueryOnlyOpenClose] = useState(attributes.queryOnlyOpenClose)

  useEffect(() => {
    if ("discreteOnlyOpenClose" in props.attributes) {
      setDiscreteOnlyOpenClose(props.attributes.discreteOnlyOpenClose)
      setCommandOnlyOpenClose(props.attributes.commandOnlyOpenClose)
      setQueryOnlyOpenClose(props.attributes.queryOnlyOpenClose)
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
          <i>discreteOnlyOpenClose</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setDiscreteOnlyOpenClose(checked)
              props.updateAttributes("discreteOnlyOpenClose", checked, "update")
            }}
            checked={discreteOnlyOpenClose}
          />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if the device must either be fully open or fully closed.</span>
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyOpenClose</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyOpenClose(checked)
              props.updateAttributes("commandOnlyOpenClose", checked, "update")
            }}
            checked={commandOnlyOpenClose}
          />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyOpenClose</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyOpenClose(checked)
              props.updateAttributes("queryOnlyOpenClose", checked, "update")
            }}
            checked={queryOnlyOpenClose}
          />
        </div>
        <div className="three_table_cel">
          <span className="attribute_advise">Enable it if Google shouldn't change the device state.</span>
        </div>
      </div>

    </div>
  );
})

export default OpenClose
