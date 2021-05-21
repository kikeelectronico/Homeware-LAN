import React from 'react';
import Switch from "react-switch";

class HumiditySetting extends React.Component {
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
            Minimum humidity
          </div>
          <div className="three_table_cel">
            <input type="number" id="humiditySetpointRange/minPercent" defaultValue={ this.props.attributes.humiditySetpointRange ? this.props.attributes.humiditySetpointRange.minPercent : 0} min="0" max="100" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Minimum humidity level as percentage.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            Maximum humidity
          </div>
          <div className="three_table_cel">
            <input type="number" id="humiditySetpointRange/maxPercent" defaultValue={this.props.attributes.humiditySetpointRange ? this.props.attributes.humiditySetpointRange.maxPercent : 0} min="0" max="100" onChange={this.updateNumber} className="int_input"/>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Maximum humidity level as percentage.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyHumiditySetting</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyHumiditySetting")}} checked={this.props.attributes.commandOnlyHumiditySetting} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the humidity.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>queryOnlyHumiditySetting</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"queryOnlyHumiditySetting")}} checked={this.props.attributes.queryOnlyHumiditySetting} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device humidity.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default HumiditySetting
