import React from 'react';

class HumiditySetting extends React.Component {
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

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Minimum humidity <input type="number" id="humiditySetpointRange/minPercent" defaultValue={ this.props.attributes.humiditySetpointRange ? this.props.attributes.humiditySetpointRange.minPercent : 0} min="0" max="100" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Minimum humidity level as percentage.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            Maximum humidity <input type="number" id="humiditySetpointRange/maxPercent" defaultValue={this.props.attributes.humiditySetpointRange ? this.props.attributes.humiditySetpointRange.maxPercent : 0} min="0" max="100" onChange={this.update} className="int_input"/>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Maximum humidity level as percentage.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyHumiditySetting" defaultChecked={this.props.attributes.commandOnlyHumiditySetting} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyHumiditySetting</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the humidity.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">

          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="queryOnlyHumiditySetting" defaultChecked={this.props.attributes.queryOnlyHumiditySetting} onChange={this.updateCheckbox}/>
              <span className=""><i>queryOnlyHumiditySetting</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device humidity.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default HumiditySetting
