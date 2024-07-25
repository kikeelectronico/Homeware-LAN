import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const attributes = {
    occupancySensorConfiguration: [
        {
            occupancySensorType: "PIR",
            occupiedToUnoccupiedDelaySec: 10,
            unoccupiedToOccupiedDelaySec: 10,
            unoccupiedToOccupiedEventThreshold: 10
        }
    ]
  }
  
const states = {
    occupancy: "UNOCCUPIED"
}

const OccupancySensing = forwardRef((props, ref) => {

    const [occupancySensorConfiguration, setOccupancySensorConfiguration] = useState(attributes.occupancySensorConfiguration)

    useEffect(() => {
        if ("occupancySensorConfiguration" in props.attributes) {
            setOccupancySensorConfiguration(props.attributes.occupancySensorConfiguration)
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
    
    const addOccupancySensorConfiguration = () => {
        let _occupancySensorConfiguration = [...occupancySensorConfiguration]
        _occupancySensorConfiguration.push({...attributes.occupancySensorConfiguration[0]})
        setOccupancySensorConfiguration(_occupancySensorConfiguration)
        props.updateAttributes("occupancySensorConfiguration", _occupancySensorConfiguration, "update")
    }

    const removeOccupancySensorConfiguration = (index) => {
        let _occupancySensorConfiguration = [...occupancySensorConfiguration]
        _occupancySensorConfiguration.splice(index, 1)
        setOccupancySensorConfiguration(_occupancySensorConfiguration)
        props.updateAttributes("occupancySensorConfiguration", _occupancySensorConfiguration, "update")
    }

    const updateOccupancySensorConfigurationParam = (index, name, value) => {
        let _occupancySensorConfiguration = [...occupancySensorConfiguration]
        _occupancySensorConfiguration[index][name] = value
        setOccupancySensorConfiguration(_occupancySensorConfiguration)
        props.updateAttributes("occupancySensorConfiguration", _occupancySensorConfiguration, "update")
    }

    return (
            <div className="attribute_table">
                <div className="attribute_table_title">
                    <i>occupancySensorConfiguration</i>
                </div>
                <div className="attribute_table_form">
                    {
                        occupancySensorConfiguration.map((config, index) => {
                            return (
                                <Box className="attribute_table_subattribute" key={index}>
                                    <Box className="attribute_table_subattribute_row">
                                        <FormControl fullWidth>
                                            <InputLabel id="occupancySensorType-label">
                                                Sensor type
                                            </InputLabel>
                                            <Select
                                                id="occupancySensorType"
                                                data-test="occupancySensorType"
                                                label="Sensor type"
                                                className="attribute_table_subattribute_input"
                                                type="number"
                                                value={config.occupancySensorType}
                                                onChange={(event) => {
                                                    updateOccupancySensorConfigurationParam(index, "occupancySensorType", event.target.value)
                                                }}
                                            >
                                                <MenuItem value="PIR">PIR</MenuItem>
                                                <MenuItem value="ULTRASONIC">Ultrasonic</MenuItem>
                                                <MenuItem value="PHYSICAL_CONTACT">Physical contact</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box className="attribute_table_subattribute_row">
                                        <TextField
                                            data-test="occupiedToUnoccupiedDelaySec"
                                            label="Occupied to Unoccupied delay in seconds"
                                            className="attribute_table_subattribute_input"
                                            type="number"
                                            variant="outlined"
                                            value={config.occupiedToUnoccupiedDelaySec}
                                            onChange={(event) => {
                                                updateOccupancySensorConfigurationParam(index, "occupiedToUnoccupiedDelaySec", parseInt(event.target.value))
                                            }}
                                        />
                                    </Box>
                                    <Box className="attribute_table_subattribute_row">
                                        <TextField
                                            data-test="unoccupiedToOccupiedDelaySec"
                                            label="Uncccupied to Occupied delay in seconds"
                                            className="attribute_table_subattribute_input"
                                            type="number"
                                            variant="outlined"
                                            value={config.unoccupiedToOccupiedDelaySec}
                                            onChange={(event) => {
                                                updateOccupancySensorConfigurationParam(index, "unoccupiedToOccupiedDelaySec", parseInt(event.target.value))
                                            }}
                                        />
                                    </Box>
                                    <Box className="attribute_table_subattribute_row">
                                        <TextField
                                            data-test="unoccupiedToOccupiedEventThreshold"
                                            label="Unoccupied to Occupied events threshold"
                                            className="attribute_table_subattribute_input"
                                            type="number"
                                            variant="outlined"
                                            value={config.unoccupiedToOccupiedEventThreshold}
                                            onChange={(event) => {
                                                updateOccupancySensorConfigurationParam(index, "unoccupiedToOccupiedEventThreshold", parseInt(event.target.value))
                                            }}
                                        />
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton size="large" onClick={() => removeOccupancySensorConfiguration(index)}>
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
                            onClick={() => addOccupancySensorConfiguration()}
                        >
                            Add
                        </Button>
                    </Box>
                </div>
            </div>
    );
})

export default OccupancySensing
