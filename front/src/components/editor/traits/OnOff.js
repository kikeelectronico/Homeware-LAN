import React from 'react';
import Switch from "react-switch";

class OnOff extends React.Component {
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
            <i>commandOnlyOnOff</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyOnOff")}} checked={this.props.attributes.commandOnlyOnOff} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
          </div>
        </div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>queryOnlyOnOff</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"queryOnlyOnOff")}} checked={this.props.attributes.queryOnlyOnOff} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device state.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default OnOff
