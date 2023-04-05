import React from 'react';
import Switch from "react-switch";

class EnergyStorage extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }


  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }

  render() {
    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>Distance units</i>
          </div>
          <div className="three_table_cel">
            <select name="type" id="energyStorageDistanceUnitForUX" className="table_input" value={this.props.attributes.energyStorageDistanceUnitForUX} onChange={this.update}>
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
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"queryOnlyEnergyStorage")}} checked={this.props.attributes.queryOnlyEnergyStorage} />
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
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"isRechargeable")}} checked={this.props.attributes.isRechargeable} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the device is rechargeable.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default EnergyStorage
