import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const attributes = {
  reversible: false,
  commandOnlyFanSpeed: false,
  supportsFanSpeedPercent: true,
}

const states = {
  currentFanSpeedPercent: 0
}

const speed_template = {
  "speed_name": "sdf",
  "speed_values": [
    {
      "speed_synonym": [""],
      "lang": "en"
    }
  ]
}

const FanSpeed = forwardRef((props, ref) => {

  const [reversible, setReversible] = useState(false)
  const [commandOnlyFanSpeed, setCommandOnlyFanSpeed] = useState(false)
  const [supportsFanSpeedPercent, setSupportsFanSpeedPercent] = useState(true)
  const [availableFanSpeeds, setAvailableFanSpeeds] = useState({speeds: [], ordered: false})

  useEffect(() => {
    if ("reversible" in props.attributes) {
      setReversible(props.attributes.reversible)
      setCommandOnlyFanSpeed(props.attributes.commandOnlyFanSpeed)
      if ("supportsFanSpeedPercent" in props.attributes)
        setSupportsFanSpeedPercent(props.attributes.supportsFanSpeedPercent)      
      if ("availableFanSpeeds" in props.attributes)
        setAvailableFanSpeeds(props.attributes.availableFanSpeeds)
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

  useEffect(() => {
    if (!supportsFanSpeedPercent) {
      props.updateAttributes("supportsFanSpeedPercent", null, "delete")
      props.updateAttributes("availableFanSpeeds", availableFanSpeeds, "update")
      props.updateStatus("currentFanSpeedPercent", null, "delete")
      props.updateStatus("currentFanSpeedSetting", "", "update")
    } else {
      props.updateAttributes("supportsFanSpeedPercent", supportsFanSpeedPercent, "update")
      props.updateAttributes("availableFanSpeeds", null, "delete")
      props.updateStatus("currentFanSpeedPercent", 0, "update")
      props.updateStatus("currentFanSpeedSetting", null, "delete")
    }
      
      
  }, [supportsFanSpeedPercent])

  const addFanSpeed = () => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    _availableFanSpeeds.speeds.push({...speed_template})
    console.log(_availableFanSpeeds)
    setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
  }

  const removeFanSpeed = (index) => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    _availableFanSpeeds.speeds.splice(index, 1)
    setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
  }

  const updateFanSpeed = (index, name, value) => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    if (name === "speed_name") {
      _availableFanSpeeds["speeds"][index]["speed_name"] = value
      _availableFanSpeeds["speeds"][index]["speed_values"][0]["speed_synonym"] = [value]
    }  else if (name === "lang") {
      _availableFanSpeeds["speeds"][index]["speed_values"][0]["lang"] = value
    }
    console.log(index, _availableFanSpeeds)
    setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
  }

  const Speed = (props) => {
    return (
      <Box className="attribute_table_subattribute">
          <Box className="attribute_table_subattribute_row">
              <FormControl fullWidth>
                  <InputLabel id="occupancySensorType-label">
                      Languaje
                  </InputLabel>
                  <Select
                      id="lang"
                      data-test="lang"
                      label="Languaje"
                      className="attribute_table_subattribute_input"
                      value={props.speed.speed_values[0].lang}
                      onChange={(event) => {
                          props.updateSpeedParam(props.index, "lang", event.target.value)
                      }}
                  >
                      <MenuItem value="en">en</MenuItem>
                      <MenuItem value="es">es</MenuItem>
                  </Select>
              </FormControl>
          </Box>
          <Box className="attribute_table_subattribute_row">
              <TextField
                  data-test="speed_name"
                  label="Speed name"
                  className="attribute_table_subattribute_input"
                  type="text"
                  variant="outlined"
                  value={props.speed.speed_name}
                  onChange={(event) => {
                      props.updateSpeedParam(props.index, "speed_name", event.target.value)
                  }}
              />
          </Box>
          <Stack direction="row" spacing={1}>
              <IconButton size="large" onClick={() => props.removeSpeed(props.index)}>
                  <DeleteIcon />
              </IconButton>
          </Stack>
      </Box>
  );
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>reversible</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setReversible(checked)
              props.updateAttributes("reversible", checked, "update")
            }}
            checked={reversible}
          />
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyFanSpeed</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyFanSpeed(checked)
              props.updateAttributes("commandOnlyFanSpeed", checked, "update")
            }}
            checked={commandOnlyFanSpeed}
          />
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>supportsFanSpeedPercent</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setSupportsFanSpeedPercent(checked)
              props.updateAttributes("supportsFanSpeedPercent", checked, "update")
            }}
            checked={supportsFanSpeedPercent}
          />
        </div>
      </div>

      {
        supportsFanSpeedPercent ? <></> :

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>availableFanSpeeds</i>
          </div>
          <div className="three_table_cel">
            {
                availableFanSpeeds.speeds.map((speed, index) => {
                    return (
                      <Box className="attribute_table_subattribute" key={index}>
                        <Box className="attribute_table_subattribute_row">
                            <FormControl fullWidth>
                                <InputLabel id="occupancySensorType-label">
                                    Languaje
                                </InputLabel>
                                <Select
                                    id="lang"
                                    data-test="lang"
                                    label="Languaje"
                                    className="attribute_table_subattribute_input"
                                    value={speed.speed_values[0].lang}
                                    onChange={(event) => {
                                      updateFanSpeed(index, "lang", event.target.value)
                                    }}
                                >
                                    <MenuItem value="en">en</MenuItem>
                                    <MenuItem value="es">es</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className="attribute_table_subattribute_row">
                            <TextField
                                data-test="speed_name"
                                label="Speed name"
                                className="attribute_table_subattribute_input"
                                type="text"
                                variant="outlined"
                                value={speed.speed_name}
                                onChange={(event) => {
                                  updateFanSpeed(index, "speed_name", event.target.value)
                                }}
                            />
                        </Box>
                        <Stack direction="row" spacing={1}>
                            <IconButton size="large" onClick={() => removeFanSpeed(props.index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                    )
                })
            }
            <Box className="attribute_table_form_add_button">
                <Button
                    variant="contained"
                    className="attribute_table_form_add_button"
                    onClick={addFanSpeed}
                >
                    Add
                </Button>
            </Box>
          </div>
        </div>
      }

    </>
  );

})

export default FanSpeed
