import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {TextField} from '@mui/material';

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
    <div className="attributes_table">
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>pausable</i>
        </div>
        <div className="attributes_col_2">
          <Switch
            onChange={(checked) => {
              setPausable(checked)
              props.updateAttributes("pausable", checked, "update")
            }}
            checked={pausable}
          />
        </div>
      </div>
      <div className="attributes_row">
        <div className="attributes_col_1 attributes_label align_right">
          <i>availableZones</i>
        </div>
        <div className="attributes_col_2">
          <TextField
            variant="outlined"
            placeholder="Separeted by commas"
            type="text"
            value={getAvailableZonesStr()}
            onChange={event => {
              setAvailableZones(event.target.value.split(","))
              props.updateAttributes("availableZones", event.target.value.split(","), "update")
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default StartStop
