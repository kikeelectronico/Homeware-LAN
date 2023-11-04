import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import Switch from "react-switch";

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
      setEnergyStorageDistanceUnitForUX(props.attributes.energyStorageDistanceUnitForUX)
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

    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>Distance units</i>
          </div>
          <div className="three_table_cel">
            <select
              name="type"
              className="table_input"
              onChange={event => {
                setEnergyStorageDistanceUnitForUX(event.target.value)
                if (event.target.value === "") props.updateAttributes("energyStorageDistanceUnitForUX", null, "delete")
                else props.updateAttributes("energyStorageDistanceUnitForUX", event.target.value, "update")
              }}
              value={energyStorageDistanceUnitForUX}
            >
              <option value="">No apply</option>
              <option value="KILOMETERS">Kilometers</option>
              <option value="MILES">Miles</option>
            </select>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Select the units of distance for remaining range if apply.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>Controlable</i>
          </div>
          <div className="three_table_cel">
            <Switch
              onChange={(checked) => {
                setQueryOnlyEnergyStorage(checked)
                props.updateAttributes("queryOnlyEnergyStorage", checked, "update")
              }}
              checked={queryOnlyEnergyStorage}
            />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Google Home can't control the device, only read the state.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>Rechargeable</i>
          </div>
          <div className="three_table_cel">
            <Switch
              onChange={(checked) => {
                setIsRechargeable(checked)
                props.updateAttributes("isRechargeable", checked, "update")
              }}
              checked={isRechargeable}
            />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the device is rechargeable.</span>
          </div>
        </div>
      </div>
    )
})

export default EnergyStorage
