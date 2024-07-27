import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const attributes = {
  commandOnlyToggles: false,
  queryOnlyToggles: false,
  availableToggles: [],
}

const states = {
  currentToggleSettings: {}
}

const toggle_template = {
  "name": "",
  "name_values": [
    {
      "name_synonym": [""],
      "lang": "en"
    }
  ]
}

const Toggles = forwardRef((props, ref) => {

  const [commandOnlyToggles, setCommandOnlyToggles] = useState(attributes.commandOnlyToggles)
  const [queryOnlyToggles, setQueryOnlyToggles] = useState(attributes.queryOnlyToggles)
  const [availableToggles, setAvailableToggles] = useState(attributes.availableToggles)

  useEffect(() => {
    if ("commandOnlyToggles" in props.attributes) {
      setCommandOnlyToggles(props.attributes.commandOnlyToggles)
      setQueryOnlyToggles(props.attributes.queryOnlyToggles)
      setAvailableToggles(props.attributes.availableToggles) 
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

  const addToggle = () => {
    let _availableToggles = [...availableToggles]
    _availableToggles.push({...toggle_template})
    setAvailableToggles(_availableToggles)
    props.updateAttributes("availableToggles", _availableToggles, "update")
  }

  const removeToggle = (index) => {
    let _availableToggles = [...availableToggles]
    let _name = _availableToggles[index]["name"]
    _availableToggles.splice(index, 1)
    setAvailableToggles(_availableToggles)
    props.updateAttributes("availableToggles", _availableToggles, "update")
    // Update status
    let _currentToggleSettings = {...props.status.currentToggleSettings}
    if (_name in _currentToggleSettings)
      delete _currentToggleSettings[_name]
    props.updateStatus("currentToggleSettings", _currentToggleSettings, "update")
  }

  const updateName = (index, name) => {
    let _availableToggles = [...availableToggles]
    let _prev_name = _availableToggles[index]["name"]
    _availableToggles[index]["name"] = name
    _availableToggles[index]["name_values"][0]["name_synonym"][0] = name
    setAvailableToggles(_availableToggles)
    props.updateAttributes("availableToggles", _availableToggles, "update")
    // Update status
    let _currentToggleSettings = {...props.status.currentToggleSettings}
    if (_prev_name in _currentToggleSettings)
      delete _currentToggleSettings[_prev_name]
    _currentToggleSettings[name] = false
    props.updateStatus("currentToggleSettings", _currentToggleSettings, "update")
  }

  const updateLang = (index, value) => {
    let _availableToggles = [...availableToggles]
    _availableToggles[index]["name_values"] = [
      {
        "name_synonym":  _availableToggles[index]["name_values"][0]["name_synonym"],
        "lang": value
      }
    ]
    setAvailableToggles(_availableToggles)
    props.updateAttributes("availableToggles", _availableToggles, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyToggles</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyToggles(checked)
              props.updateAttributes("commandOnlyToggles", checked, "update")
            }}
            checked={commandOnlyToggles}
          />
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyToggles</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyToggles(checked)
              props.updateAttributes("queryOnlyToggles", checked, "update")
            }}
            checked={queryOnlyToggles}
          />
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>availableToggles</i>
        </div>
        <div className="three_table_cel">
          {
            availableToggles.map((toggle, index) => {
              return (
                <Box className="attribute_table_subattribute" key={index}>
                  <Box className="attribute_table_subattribute_row">
                    <TextField
                      data-test="speed_name"
                      label="Speed name"
                      className="attribute_table_subattribute_input"
                      type="text"
                      variant="outlined"
                      value={toggle.name}
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
                        value={toggle.name_values[0].lang}
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
                    <IconButton size="large" onClick={() => removeToggle(index)}>
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
              onClick={addToggle}
            >
              Add
            </Button>
          </Box>
        </div>
      </div>

    </>
  );
  
})

export default Toggles
