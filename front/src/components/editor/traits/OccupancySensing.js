import React from 'react';
import {InputLabel, Button, Select, MenuItem, Box, TextField, FormControl, IconButton, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const data_model = {
    "occupancySensorType": "PIR",
    "occupiedToUnoccupiedDelaySec": 10,
    "unoccupiedToOccupiedDelaySec": 10,
    "unoccupiedToOccupiedEventThreshold": 10
}

function OccupancySensing(props) {
    
    const addOccupancySensorConfiguration = () => {
        let _occupancySensorConfiguration = [...props.attributes.occupancySensorConfiguration]
        _occupancySensorConfiguration.push(data_model)
        props.update("attributes/occupancySensorConfiguration", _occupancySensorConfiguration)
    }

    const removeOccupancySensorConfiguration = (index) => {
        let _occupancySensorConfiguration = [...props.attributes.occupancySensorConfiguration]
        _occupancySensorConfiguration.splice(index, 1)
        props.update("attributes/occupancySensorConfiguration", _occupancySensorConfiguration)
    }

    const updateOccupancySensorConfigurationParam = (index, name, value) => {
        let _occupancySensorConfiguration = [...props.attributes.occupancySensorConfiguration]
        _occupancySensorConfiguration[index][name] = value
        props.update("attributes/occupancySensorConfiguration", _occupancySensorConfiguration)     
    }

    function OccupancySensorConfiguration(props) {
        return (
            <Box className="attribute_table_subattribute">
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
                            value={props.config.occupancySensorType}
                            onChange={(event) => {
                                props.updateConfigParam(props.index, "occupancySensorType", event.target.value)
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
                        id="occupiedToUnoccupiedDelaySec"
                        data-test="occupiedToUnoccupiedDelaySec"
                        label="Occupied to Unoccupied delay in seconds"
                        className="attribute_table_subattribute_input"
                        variant="outlined"
                        value={props.config.occupiedToUnoccupiedDelaySec}
                        onChange={(event) => {
                            props.updateConfigParam(props.index, "occupiedToUnoccupiedDelaySec", event.target.value)
                        }}
                    />
                </Box>
                <Box className="attribute_table_subattribute_row">
                    <TextField
                        id="unoccupiedToOccupiedDelaySec"
                        data-test="unoccupiedToOccupiedDelaySec"
                        label="Uncccupied to Occupied delay in seconds"
                        className="attribute_table_subattribute_input"
                        variant="outlined"
                        value={props.config.unoccupiedToOccupiedDelaySec}
                        onChange={(event) => {
                            props.updateConfigParam(props.index, "unoccupiedToOccupiedDelaySec", event.target.value)
                        }}
                    />
                </Box>
                <Box className="attribute_table_subattribute_row">
                    <TextField
                        id="unoccupiedToOccupiedEventThreshold"
                        data-test="unoccupiedToOccupiedEventThreshold"
                        label="Unoccupied to Occupied events threshold"
                        className="attribute_table_subattribute_input"
                        variant="outlined"
                        value={props.config.unoccupiedToOccupiedEventThreshold}
                        onChange={(event) => {
                            props.updateConfigParam(props.index, "unoccupiedToOccupiedEventThreshold", event.target.value)
                        }}
                    />
                </Box>
                <Stack direction="row" spacing={1}>
                    <IconButton size="large" onClick={() => props.removeConfig(props.index)}>
                        <DeleteIcon />
                    </IconButton>
                </Stack>
            </Box>
        );
    }

    return (
        <div>
            <div className="attribute_table">
                <div className="attribute_table_title">
                <i>occupancySensorConfiguration</i>
                </div>
                <div className="attribute_table_form">
                    {
                        props.attributes.occupancySensorConfiguration.map((config, index) => {
                            return <OccupancySensorConfiguration
                                        config={config}
                                        index={index}
                                        removeConfig={removeOccupancySensorConfiguration}
                                        updateConfigParam={updateOccupancySensorConfigurationParam}
                                        key={index}
                                    />
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
        </div>
    );
}

export default OccupancySensing
