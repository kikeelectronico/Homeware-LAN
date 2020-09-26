import React from 'react';

class TemperatureControl extends React.Component {
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
            <label>
              <input type="checkbox" id="commandOnlyTemperatureControl" defaultChecked={this.props.attributes.commandOnlyTemperatureControl} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyTemperatureControl</i></span>
            </label>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the temperature.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel">
          </div>
          <div className="three_table_cel">
            <label>
              <input type="checkbox" id="queryOnlyTemperatureControl" defaultChecked={this.props.attributes.queryOnlyTemperatureControl} onChange={this.updateCheckbox}/>
              <span className=""><i>queryOnlyTemperatureControl</i></span>
            </label>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device temperature settings.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            Minimum temperature: <input type="number" id="temperatureRange/minThresholdCelsius" defaultValue={ this.props.attributes.temperatureRange ? this.props.attributes.temperatureRange.minThresholdCelsius : 0} min="0" max="400" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Minimum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            Maximum temperature: <input type="number" id="temperatureRange/maxThresholdCelsius" defaultValue={this.props.attributes.temperatureRange ? this.props.attributes.temperatureRange.maxThresholdCelsius : 0} min="0" max="400" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum temperature (in Celsius) supported by the device.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            Step: <input type="number" id="temperatureStepCelsius" defaultValue={this.props.attributes.temperatureStepCelsius} min="0" max="400" onChange={this.update} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Specifies the relative temperature step.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel">

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
