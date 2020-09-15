import React from 'react';

class TemperatureSetting extends React.Component {
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

        <div className="table_row">
          <div className="table_cel">
            Temperature Settings
          </div>
          <div className="table_cel">
            Modes <input type="text" id="availableThermostatModes" defaultValue={this.props.attributes.availableThermostatModes} onChange={this.update} className="text_input"/>
          </div>
        </div>

        <div className="table_row">
          <div className="table_cel">

          </div>
          <div className="table_cel">
            <span className="attribute_advise">A list of modes separeted by commas. Available Modes: off,heat,cool,on,heatcool,auto,fan-only,purifier,eco,dry</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyTemperatureSetting" defaultChecked={this.props.attributes.commandOnlyTemperatureSetting} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyTemperatureSetting</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the temperature.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="queryOnlyTemperatureSetting" defaultChecked={this.props.attributes.queryOnlyTemperatureSetting} onChange={this.updateCheckbox}/>
              <span className=""><i>queryOnlyTemperatureSetting</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device temperature settings.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Minimum temperature <input type="number" id="thermostatTemperatureRange/minThresholdCelsius" defaultValue={ this.props.attributes.thermostatTemperatureRange ? this.props.attributes.thermostatTemperatureRange.minThresholdCelsius : 0} min="0" max="50" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Minimum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Maximum temperature <input type="number" id="thermostatTemperatureRange/maxThresholdCelsius" defaultValue={this.props.attributes.thermostatTemperatureRange ? this.props.attributes.thermostatTemperatureRange.maxThresholdCelsius : 0} min="0" max="50" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Maximum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Range <input type="number" id="bufferRangeCelsius" defaultValue={this.props.attributes.bufferRangeCelsius} min="0" max="50" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Specifies the minimum offset between heat-cool setpoints in Celsius.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <select name="type" id="thermostatTemperatureUnit" className="table_input" value={this.props.attributes.thermostatTemperatureUnit} onChange={this.update}>
              <option value="C">Celsius</option>
              <option value="F">Fahrenheit</option>
            </select>
          </div>
        </div>



      </div>
    );
  }
}

export default TemperatureSetting
