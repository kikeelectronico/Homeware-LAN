import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const attributes = {
  commandOnlyModes: false,
  queryOnlyModes: false,
  availableModes: []
}

const states = {
  currentModeSettings: []
}

const mode_template = {
  "name": "",
  "name_values": [
    {
      "name_synonym": [""],
      "lang": "en"
    }
  ],
  "settings": []
}

const Modes = forwardRef((props, ref) => {

  const [commandOnlyModes, setCommandOnlyModes] = useState(attributes.commandOnlyModes)
  const [queryOnlyModes, setQueryOnlyModes] = useState(attributes.queryOnlyModes)
  const [availableModes, setAvailableModes] = useState(attributes.availableModes)

  useEffect(() => {
    if ("commandOnlyModes" in props.attributes) {
      setCommandOnlyModes(props.attributes.commandOnlyModes)
      setQueryOnlyModes(props.attributes.queryOnlyModes)
      setAvailableModes(props.attributes.availableModes)
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

  const getSettingsStr = (index) => {
    let settings = [...availableModes[index]["settings"]]
    let settings_str = ""
    for (let i = 0; i < settings.length; i++) {
      settings_str += settings[i]["setting_name"]
      if (i < settings.length-1)
        settings_str += ","
    }
    return settings_str
  }

  const addMode = () => {
    let _availableModes = [...availableModes]
    _availableModes.push({...mode_template})
    setAvailableModes(_availableModes)
    props.updateAttributes("availableModes", _availableModes, "update")
  }

  const removeMode = (index) => {
    let _availableModes = [...availableModes]
    let _name = _availableModes[index]["name"]
    _availableModes.splice(index, 1)
    setAvailableModes(_availableModes)
    props.updateAttributes("availableModes", _availableModes, "update")
    // Update status
    let _currentModeSettings = {...props.status.currentModeSettings}
    if (_name in _currentModeSettings)
      delete _currentModeSettings[_name]
    props.updateStatus("currentModeSettings", _currentModeSettings, "update")
  }

  const updateName = (index, name) => {
    let _availableModes = [...availableModes]
    let _prev_name = _availableModes[index]["name"]
    _availableModes[index]["name"] = name
    _availableModes[index]["name_values"]= [
      {
        "name_synonym":  [name],
        "lang": _availableModes[index]["name_values"][0]["lang"]
      }
    ]
    setAvailableModes(_availableModes)
    props.updateAttributes("availableModes", _availableModes, "update")
    // Update status
    let _currentModeSettings = {...props.status._currentModeSettings}
    if (_prev_name in _currentModeSettings)
      delete _currentModeSettings[_prev_name]
    _currentModeSettings[name] = ""
    props.updateStatus("currentModeSettings", _currentModeSettings, "update")
  }

  const updatesettings = (index, settings_str) => {
    let _availableModes = [...availableModes]
    let settings = settings_str.split(",")
    _availableModes[index]["settings"] = []
    for (let i = 0; i < settings.length; i++) {
      _availableModes[index]["settings"].push(
        {
          "setting_name": settings[i],
          "setting_values": [
            {
              "setting_synonym": [
                settings[i]
              ],
              "lang": _availableModes[index]["name_values"][0]["lang"]
            }
          ]
        },
      )
    }
    setAvailableModes(_availableModes)
    props.updateAttributes("availableModes", _availableModes, "update")
  }

  const updatelanguaje = (index, lang) => {
    let _availableModes = [...availableModes]
    _availableModes[index]["name_values"]= [
      {
        "name_synonym":  _availableModes[index]["name_values"][0]["name_synonym"],
        "lang": lang
      }
    ]
    for (let i = 0; i < _availableModes[index]["settings"].length; i++) {
      _availableModes[index]["settings"][i]["setting_values"][0]["lang"] = lang
      
    }
    setAvailableModes(_availableModes)
    props.updateAttributes("availableModes", _availableModes, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>commandOnlyModes</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setCommandOnlyModes(checked)
              props.updateAttributes("commandOnlyModes", checked, "update")
            }}
            checked={commandOnlyModes}
          />
        </div>
      </div>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>queryOnlyModes</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setQueryOnlyModes(checked)
              props.updateAttributes("queryOnlyModes", checked, "update")
            }}
            checked={queryOnlyModes}
          />
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>availableModes</i>
        </div>
        <div className="three_table_cel">
          {
            availableModes.map((mode, index) => {
              return (
                <Box className="attribute_table_subattribute" key={index}>
                  <Box className="attribute_table_subattribute_row">
                    <TextField
                      data-test="mode_name"
                      label="Mode name"
                      className="attribute_table_subattribute_input"
                      type="text"
                      variant="outlined"
                      value={mode.name}
                      onChange={(event) => {
                        updateName(index, event.target.value)
                      }}
                    />
                  </Box>
                  <Box className="attribute_table_subattribute_row">
                    <TextField
                      data-test="settings"
                      label="Settings - Separated by commas"
                      className="attribute_table_subattribute_input"
                      type="text"
                      variant="outlined"
                      value={getSettingsStr(index)}
                      onChange={(event) => {
                        updatesettings(index, event.target.value)
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
                        value={mode.name_values[0].lang}
                        onChange={(event) => {
                          updatelanguaje(index, event.target.value)
                        }}
                      >
                        <MenuItem value="en">en</MenuItem>
                        <MenuItem value="es">es</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="large" onClick={() => removeMode(index)}>
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
              onClick={addMode}
            >
              Add
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
  
})

export default Modes
