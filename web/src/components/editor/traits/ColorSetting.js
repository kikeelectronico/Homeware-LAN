import React from 'react';

class ColorSetting extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  render() {
    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            <select name="type" id="colorModel" className="table_input" value={this.props.attributes.colorModel} onChange={this.update}>
              <option value="">Select</option>
              <option value="rgb">RGB light</option>
              <option value="hsv">HSV light</option>
              <option value="">Color temperature</option>
            </select>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise"></span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            Minimum temperature: <input type="number" id="colorTemperatureRange/temperatureMinK" defaultValue={ this.props.attributes.colorTemperatureRange ? this.props.attributes.colorTemperatureRange.temperatureMinK : 0} min="0" max="10000" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Minimum color temperature (in Kelvin) supported by the device.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            Maximum temperature: <input type="number" id="colorTemperatureRange/temperatureMaxK" defaultValue={this.props.attributes.colorTemperatureRange ? this.props.attributes.colorTemperatureRange.temperatureMaxK : 0} min="0" max="10000" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum color temperature (in Kelvin) supported by the device.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyColorSetting" defaultChecked={this.props.attributes.commandOnlyColorSetting} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyColorSetting</i></span>
            </label>
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
