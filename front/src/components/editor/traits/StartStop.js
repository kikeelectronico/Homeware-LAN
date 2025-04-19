import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

const attributes = {
  availableZones: [],
  pausable: false
}

const states = {
  isRunning: false,
  isPaused: false,
  activeZones: []
}

const StartStop = forwardRef((props, ref) => {

  const [availableZones, setAvailableZones] = useState(attributes.availableZones)
  const [pausable, setPausable] = useState(attributes.pausable)

  useEffect(() => {
    if ("pausable" in props.attributes) {
      setPausable(props.attributes.pausable)
      setAvailableZones(props.attributes.availableZones)
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

  const getAvailableZonesStr = () => {
    let _availableZones_str = ""
    for (let i = 0; i < availableZones.length; i++) {
      _availableZones_str += availableZones[i]
      if (i < availableZones.length - 1)
        _availableZones_str += ","
    }
    return _availableZones_str
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>pausable</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setPausable(checked)
              props.updateAttributes("pausable", checked, "update")
            }}
            checked={pausable}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>availableZones</i> - Separeted by commas
        </div>
        <div className="three_table_cel">
          <input
            type="text"
            onChange={event => {
              setAvailableZones(event.target.value.split(","))
              props.updateAttributes("availableZones", event.target.value.split(","), "update")
            }}
            value={getAvailableZonesStr()}
            min="0" max="10000" className="int_input"
          />
        </div>
      </div>
    </>
  )
})

export default StartStop
