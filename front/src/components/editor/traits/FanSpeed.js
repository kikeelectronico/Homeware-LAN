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
  "speed_name": "",
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
      setSupportsFanSpeedPercent(props.attributes.supportsFanSpeedPercent) 
      if ("availableFanSpeeds" in props.attributes)
        setAvailableFanSpeeds(props.attributes.availableFanSpeeds)
    } else {
      props.updateStates(null, states, "insert")
      props.updateAttributes(null, attributes, "insert")
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    deleteAttributes() {
      props.updateStates(null, states, "drop")
      props.updateAttributes(null, attributes, "drop")
      props.updateAttributes("availableFanSpeeds", null, "delete")
      props.updateStates("currentFanSpeedSetting", null, "delete")
    }
  }))

  useEffect(() => {
    if (!supportsFanSpeedPercent) {
      props.updateAttributes("availableFanSpeeds", availableFanSpeeds, "update")
      props.updateStates("currentFanSpeedPercent", null, "delete")
      props.updateStates("currentFanSpeedSetting", "", "update")
    } else {
      props.updateAttributes("availableFanSpeeds", null, "delete")
      props.updateStates("currentFanSpeedPercent", 0, "update")
      props.updateStates("currentFanSpeedSetting", null, "delete")
    }
  }, [supportsFanSpeedPercent, availableFanSpeeds, props])

  const addFanSpeed = () => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    _availableFanSpeeds.speeds.push({...speed_template})
    setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
  }

  const removeFanSpeed = (index) => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    _availableFanSpeeds.speeds.splice(index, 1)
    setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
  }

  const updateName = (index, value) => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    _availableFanSpeeds["speeds"][index]["speed_name"] = value
    _availableFanSpeeds["speeds"][index]["speed_values"]= [
      {
        "speed_synonym":  [value],
        "lang": _availableFanSpeeds["speeds"][index]["speed_values"][0]["lang"]
      }
    ]
    setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
  }

  const updateLang = (index, value) => {
    let _availableFanSpeeds = {...availableFanSpeeds}
    _availableFanSpeeds["speeds"][index]["speed_values"]= [
        {
          "speed_synonym":  _availableFanSpeeds["speeds"][index]["speed_values"][0]["speed_synonym"],
          "lang": value
        }
      ]
      setAvailableFanSpeeds(_availableFanSpeeds)
    props.updateAttributes("availableFanSpeeds", _availableFanSpeeds, "update")
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
                      <TextField
                        data-test="speed_name"
                        label="Speed name"
                        className="attribute_table_subattribute_input"
                        type="text"
                        variant="outlined"
                        value={speed.speed_name}
                        onChange={(event) => {
                          updateName(index, event.target.value)
                        }}
                      />
                    </Box>
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
                            updateLang(index, event.target.value)
                          }}
                        >
                          <MenuItem value="en">en</MenuItem>
                          <MenuItem value="es">es</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <IconButton size="large" onClick={() => removeFanSpeed(index)}>
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
