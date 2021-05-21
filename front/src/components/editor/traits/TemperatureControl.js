import React from 'react';
import Switch from "react-switch";

class TemperatureControl extends React.Component {
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
            <i>commandOnlyTemperatureControl</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyTemperatureControl")}} checked={this.props.attributes.commandOnlyTemperatureControl} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the temperature.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>queryOnlyTemperatureControl</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"queryOnlyTemperatureControl")}} checked={this.props.attributes.queryOnlyTemperatureControl} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device temperature settings.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Minimum temperature
          </div>
          <div className="three_table_cel">
            <input type="number" id="temperatureRange/minThresholdCelsius" defaultValue={ this.props.attributes.temperatureRange ? this.props.attributes.temperatureRange.minThresholdCelsius : 0} min="0" max="400" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Minimum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Maximum temperature
          </div>
          <div className="three_table_cel">
            <input type="number" id="temperatureRange/maxThresholdCelsius" defaultValue={this.props.attributes.temperatureRange ? this.props.attributes.temperatureRange.maxThresholdCelsius : 0} min="0" max="400" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Step
          </div>
          <div className="three_table_cel">
            <input type="number" id="temperatureStepCelsius" defaultValue={this.props.attributes.temperatureStepCelsius} min="0" max="400" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Specifies the relative temperature step.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Units
          </div>
          <div className="three_table_cel">
            <select name="type" id="temperatureUnitForUX" className="table_input" value={this.props.attributes.temperatureUnitForUX} onChange={this.update}>
              <option value="C">Celsius</option>
              <option value="F">Fahrenheit</option>
            </select>
          </div>
        </div>



      </div>
    );
  }
}

export default TemperatureControl
