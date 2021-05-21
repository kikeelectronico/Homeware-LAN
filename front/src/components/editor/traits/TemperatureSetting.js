import React from 'react';
import Switch from "react-switch";

class TemperatureSetting extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.updateMode = this.updateMode.bind(this);
    this.addMode = this.addMode.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }

  update(event){
    this.props.update('attributes/' + event.target.id,event.target.value);
  }

  updateNumber(event){
    this.props.update('attributes/' + event.target.id,parseInt(event.target.value));
  }

  updateMode(event){
    const id = event.target.id.split('_')
    const mode_id = id[1]
    var temp_availableThermostatModes = this.props.attributes.availableThermostatModes.split(',')

    if (event.target.value === 'delete'){
      temp_availableThermostatModes.splice(mode_id, 1)
    } else if (event.target.value !== 'select') {
      temp_availableThermostatModes[mode_id] = event.target.value;
    }

    this.props.update('attributes/availableThermostatModes', temp_availableThermostatModes.join(','));
  }

  addMode(){
    var temp_availableThermostatModes = this.props.attributes.availableThermostatModes
    temp_availableThermostatModes += ","
    this.props.update('attributes/availableThermostatModes', temp_availableThermostatModes);
  }

  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }


  render() {

    const modes = this.props.attributes.availableThermostatModes.split(',').map((mode, i) => {

      return (
          <div key={i}>
            <div className="two_table_row">
              <div className="two_table_cel">
              </div>
              <div className="two_table_cel">
                <label>
                  <span>Mode: </span>
                  <select name="type" id={"mode_" + i} value={mode} onChange={this.updateMode}>
                    <option value="select">Select a mode</option>
                    <option value="delete">Delete this mode</option>
                    <option value="off">Off</option>
                    <option value="heat">Heat</option>
                    <option value="cool">Cool</option>
                    <option value="on">On</option>
                    <option value="heatcool">Heatcool</option>
                    <option value="auto">Auto</option>
                    <option value="fan-only">Fan only</option>
                    <option value="purifier">Purifier</option>
                    <option value="eco">Eco</option>
                    <option value="dry">Dry</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          )
    });

    return (
      <div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Add a thermostat mode
          </div>
          <div className="three_table_cel">
            <button type="button" className="add_attribute_button" onClick={ this.addMode }>Add</button>
          </div>
        </div>

        {modes}

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyTemperatureSetting</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyTemperatureSetting")}} checked={this.props.attributes.commandOnlyTemperatureSetting} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the temperature.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>queryOnlyTemperatureSetting</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"queryOnlyTemperatureSetting")}} checked={this.props.attributes.queryOnlyTemperatureSetting} />
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
            <input type="number" id="thermostatTemperatureRange/minThresholdCelsius" defaultValue={ this.props.attributes.thermostatTemperatureRange ? this.props.attributes.thermostatTemperatureRange.minThresholdCelsius : 0} min="0" max="50" onChange={this.updateNumber} className="int_input"/>
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
            <input type="number" id="thermostatTemperatureRange/maxThresholdCelsius" defaultValue={this.props.attributes.thermostatTemperatureRange ? this.props.attributes.thermostatTemperatureRange.maxThresholdCelsius : 0} min="0" max="50" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Range
          </div>
          <div className="three_table_cel">
            <input type="number" id="bufferRangeCelsius" defaultValue={this.props.attributes.bufferRangeCelsius} min="0" max="50" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Specifies the minimum offset between heat-cool setpoints in Celsius.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Units
          </div>
          <div className="three_table_cel">
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
