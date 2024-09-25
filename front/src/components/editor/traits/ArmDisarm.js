import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const attributes = {
  availableArmLevels: {
    levels: [],
    ordered: false
  },
}

const states = {
  isArmed: false,
  currentArmLevel: "",
  exitAllowance: 30
}

const level_template = {
  "level_name": "",
  "level_values": [
    {
      "level_synonym": [""],
      "lang": "en"
    }
  ]
}

const ArmDisarm = forwardRef((props, ref) => {

  const [availableArmLevels, setAvailableArmLevels] = useState(attributes.availableArmLevels)

  useEffect(() => {
    if ("availableArmLevels" in props.attributes) {
      setAvailableArmLevels(props.attributes.availableArmLevels)
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

  const addLevel = () => {
    let _availableArmLevels = {...availableArmLevels}
    _availableArmLevels.levels.push({...level_template})
    setAvailableArmLevels(_availableArmLevels)
    props.updateAttributes("availableArmLevels", _availableArmLevels, "update")
  }

  const removeLevel = (index) => {
    let _availableArmLevels = {...availableArmLevels}
    _availableArmLevels.levels.splice(index, 1)
    setAvailableArmLevels(_availableArmLevels)
    props.updateAttributes("availableArmLevels", _availableArmLevels, "update")
  }

  const updateName = (index, value) => {
    let _availableArmLevels = {...availableArmLevels}
    _availableArmLevels["levels"][index]["level_name"] = value
    _availableArmLevels["levels"][index]["level_values"]= [
      {
        "level_synonym":  [value],
        "lang": _availableArmLevels["levels"][index]["level_values"][0]["lang"]
      }
    ]
    setAvailableArmLevels(_availableArmLevels)
    props.updateAttributes("availableArmLevels", _availableArmLevels, "update")
  }

  const updateLang = (index, value) => {
    let _availableArmLevels = {...availableArmLevels}
    _availableArmLevels["levels"][index]["level_values"]= [
        {
          "level_synonym":  _availableArmLevels["levels"][index]["level_values"][0]["level_synonym"],
          "lang": value
        }
      ]
    setAvailableArmLevels(_availableArmLevels)
    props.updateAttributes("availableArmLevels", _availableArmLevels, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>availableArmLevels</i>
        </div>
        <div className="three_table_cel">
          {
            availableArmLevels.levels.map((level, index) => {
              return (
                <Box className="attribute_table_subattribute" key={index}>
                  <Box className="attribute_table_subattribute_row">
                    <TextField
                      data-test="speed_name"
                      label="Speed name"
                      className="attribute_table_subattribute_input"
                      type="text"
                      variant="outlined"
                      value={level.level_name}
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
                        value={level.level_values[0].lang}
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
                      <IconButton size="large" onClick={() => removeLevel(index)}>
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
                  onClick={addLevel}
              >
                  Add
              </Button>
          </Box>
        </div>
      </div>
    </>
  );

})

export default ArmDisarm
