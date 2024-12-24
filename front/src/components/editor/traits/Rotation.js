import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  supportsDegrees: true,
  supportsPercent: true,
  rotationDegreesRange: {
    rotationDegreesMin: 0,
    rotationDegreesMax: 180,
  },
  supportsContinuousRotation: false,
  commandOnlyRotation: false
}

const states = {
  rotationDegrees: 22,
  rotationPercent: 22,
  targetRotationPercent: 22
}

const Rotation = forwardRef((props, ref) => {
  
  const [supportsDegrees, setSupportsDegrees] = useState(attributes.supportsDegrees)
  const [supportsPercent, setSupportsPercent] = useState(attributes.supportsPercent)
  const [rotationDegreesRange, setRotationDegreesRange] = useState(attributes.rotationDegreesRange)
  const [supportsContinuousRotation, setSupportsContinuousRotation] = useState(attributes.supportsContinuousRotation)
  const [commandOnlyRotation, setCommandOnlyRotation] = useState(attributes.commandOnlyRotation)
  
  useEffect(() => {
    if ("commandOnlyRotation" in props.attributes) {
      setSupportsDegrees(props.attributes.supportsDegrees)
      setSupportsPercent(props.attributes.supportsPercent)
      setRotationDegreesRange(props.attributes.rotationDegreesRange)
      setSupportsContinuousRotation(props.attributes.supportsContinuousRotation)
      setCommandOnlyRotation(props.attributes.commandOnlyRotation)
    } else {
      props.updateStatus(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStatus(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
    }
  }))

  const updateRange = (key, value) => {
    let _rotationDegreesRange = {...rotationDegreesRange}
    _rotationDegreesRange[key] = value
    setRotationDegreesRange(_rotationDegreesRange)
    props.updateAttributes("rotationDegreesRange", _rotationDegreesRange, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>supportsDegrees</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setSupportsDegrees(checked)
              props.updateAttributes("supportsDegrees", checked, "update")
            }}
            checked={supportsDegrees}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>supportsPercent</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setSupportsPercent(checked)
              props.updateAttributes("supportsPercent", checked, "update")
            }}
            checked={supportsPercent}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>supportsContinuousRotation</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setSupportsContinuousRotation(checked)
              props.updateAttributes("supportsContinuousRotation", checked, "update")
            }}
            checked={supportsContinuousRotation}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyRotation</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyRotation(checked)
              props.updateAttributes("commandOnlyRotation", checked, "update")
            }}
            checked={commandOnlyRotation}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Minimum degrees
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              updateRange("rotationDegreesMin", parseInt(event.target.value))
            }}
            value={rotationDegreesRange.rotationDegreesMin}
            min="0" max="100" className="int_input"
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          Maximum degrees
        </div>
        <div className="three_table_cel">
          <input
            type="number"
            onChange={event => {
              updateRange("rotationDegreesMax", parseInt(event.target.value))
            }}
            value={rotationDegreesRange.rotationDegreesMax}
            min="0" max="360" className="int_input"
          />
        </div>
      </div>
    </>
  );
  
})

export default Rotation
