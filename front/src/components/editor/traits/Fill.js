import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const attributes = {
  supportsFillPercent: false,
  availableFillLevels: {
    levels: [],
    ordered: false
  },
}

const states = {
  isFilled: false,
  currentFillLevel: "",
  currentFillPercent: 0
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

const Fill = forwardRef((props, ref) => {

  const [supportsFillPercent, setSupportsFillPercent] = useState(attributes.supportsFillPercent)
  const [availableFillLevels, setAvailableFillLevels] = useState(attributes.availableFillLevels)

  useEffect(() => {
    if ("supportsFillPercent" in props.attributes) {
      setSupportsFillPercent(props.attributes.supportsFillPercent)
      setAvailableFillLevels(props.attributes.availableFillLevels)
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

  const addLevel = () => {
    let _availableFillLevels = {...availableFillLevels}
    _availableFillLevels.levels.push({...level_template})
    setAvailableFillLevels(_availableFillLevels)
    props.updateAttributes("availableFillLevels", _availableFillLevels, "update")
  }

  const removeLevel = (index) => {
    let _availableFillLevels = {...availableFillLevels}
    _availableFillLevels.levels.splice(index, 1)
    setAvailableFillLevels(_availableFillLevels)
    props.updateAttributes("availableFillLevels", _availableFillLevels, "update")
  }

  const updateName = (index, value) => {
    let _availableFillLevels = {...availableFillLevels}
    _availableFillLevels["levels"][index]["level_name"] = value
    _availableFillLevels["levels"][index]["level_values"]= [
      {
        "level_synonym":  [value],
        "lang": _availableFillLevels["levels"][index]["level_values"][0]["lang"]
      }
    ]
    setAvailableFillLevels(_availableFillLevels)
    props.updateAttributes("availableFillLevels", _availableFillLevels, "update")
  }

  const updateLang = (index, value) => {
    let _availableFillLevels = {...availableFillLevels}
    _availableFillLevels["levels"][index]["level_values"]= [
      {
        "level_synonym":  _availableFillLevels["levels"][index]["level_values"][0]["level_synonym"],
        "lang": value
      }
    ]
    setAvailableFillLevels(_availableFillLevels)
    props.updateAttributes("availableFillLevels", _availableFillLevels, "update")
  }

  return (
    <>
      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>supportsFillPercent</i>
        </div>
        <div className="three_table_cel">
          <Switch
            onChange={(checked) => {
              setSupportsFillPercent(checked)
              props.updateAttributes("supportsFillPercent", checked, "update")
            }}
            checked={supportsFillPercent}
          />
        </div>
      </div>

      <div className="three_table_row">
        <div className="three_table_cel align_right">
          <i>availableFillLevels</i>
        </div>
        <div className="three_table_cel">
          {
            availableFillLevels.levels.map((level, index) => {
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

export default Fill
