import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";
import {Select, MenuItem} from '@mui/material';

const attributes = {
  queryOnlyEnergyStorage: false,
  isRechargeable: false,
  energyStorageDistanceUnitForUX: "KILOMETERS"
}

const states = {
  descriptiveCapacityRemaining: "HIGH",
  capacityRemaining: [
    {
      rawValue: 90,
      unit: "PERCENTAGE"
    }
  ]
}

const EnergyStorage = forwardRef((props, ref) => {

  const [queryOnlyEnergyStorage, setQueryOnlyEnergyStorage] = useState(attributes.queryOnlyEnergyStorage)
  const [isRechargeable, setIsRechargeable] = useState(attributes.isRechargeable)
  const [energyStorageDistanceUnitForUX, setEnergyStorageDistanceUnitForUX] = useState(attributes.energyStorageDistanceUnitForUX)

  useEffect(() => {
    if ("queryOnlyEnergyStorage" in props.attributes) {
      setQueryOnlyEnergyStorage(props.attributes.queryOnlyEnergyStorage)
      setIsRechargeable(props.attributes.isRechargeable)
      setEnergyStorageDistanceUnitForUX("energyStorageDistanceUnitForUX" in props.attributes ? props.attributes.energyStorageDistanceUnitForUX : "")
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

    return (
      <div className="attributes_table">
        <div className="attributes_row">
          <div className="attributes_col_1 attributes_label align_right">
            <i>Distance units</i>
          </div>
          <div className="attributes_col_2">
            <Select
              className="table_input"
              value={energyStorageDistanceUnitForUX || ""}
              onChange={event => {
                setEnergyStorageDistanceUnitForUX(event.target.value)
                if (event.target.value === "") props.updateAttributes("energyStorageDistanceUnitForUX", null, "delete")
                else props.updateAttributes("energyStorageDistanceUnitForUX", event.target.value, "update")
              }}
            >
              <MenuItem value="">No apply</MenuItem>
              <MenuItem value="KILOMETERS">Kilometers</MenuItem>
              <MenuItem value="MILES">Miles</MenuItem>
            </Select>
          </div>
        </div>
        <div className="attributes_row">
          <div className="attributes_col_1 attributes_label align_right">
            <i>Controlable</i>
          </div>
          <div className="attributes_col_2">
            <Switch
              onChange={(checked) => {
                setQueryOnlyEnergyStorage(checked)
                props.updateAttributes("queryOnlyEnergyStorage", checked, "update")
              }}
              checked={queryOnlyEnergyStorage}
            />
          </div>
        </div>
        <div className="attributes_row">
          <div className="attributes_col_1 attributes_label align_right">
            <i>Rechargeable</i>
          </div>
          <div className="attributes_col_2">
            <Switch
              onChange={(checked) => {
                setIsRechargeable(checked)
                props.updateAttributes("isRechargeable", checked, "update")
              }}
              checked={isRechargeable}
            />
          </div>
        </div>
      </div>
    )
})

export default EnergyStorage
