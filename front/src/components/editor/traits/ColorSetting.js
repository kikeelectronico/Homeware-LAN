import React from 'react';
import Switch from "react-switch";

class ColorSetting extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  updateNumber(event){
    this.props.update('attributes/' + event.target.id,parseInt(event.target.value));
  }

  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }

  render() {
    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>Color type</i>
          </div>
          <div className="three_table_cel">
            <select name="type" id="colorModel" className="table_input" value={this.props.attributes.colorModel} onChange={this.update}>
              <option value="">No color</option>
              <option value="rgb">RGB light</option>
              <option value="hsv">HSV light</option>
            </select>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Select a color coding format.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Minimum temperature
          </div>
          <div className="three_table_cel">
            <input type="number" id="colorTemperatureRange/temperatureMinK" defaultValue={ this.props.attributes.colorTemperatureRange ? this.props.attributes.colorTemperatureRange.temperatureMinK : 0} min="0" max="10000" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Minimum color temperature (in Kelvin) supported by the device.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Maximum temperature
          </div>
          <div className="three_table_cel">
            <input type="number" id="colorTemperatureRange/temperatureMaxK" defaultValue={this.props.attributes.colorTemperatureRange ? this.props.attributes.colorTemperatureRange.temperatureMaxK : 0} min="0" max="10000" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum color temperature (in Kelvin) supported by the device.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyColorSetting</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyColorSetting")}} checked={this.props.attributes.commandOnlyColorSetting} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the color.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default ColorSetting
