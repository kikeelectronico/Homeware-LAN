import React from 'react';
import Switch from "react-switch";

class OpenClose extends React.Component {
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
            <i>discreteOnlyOpenClose</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"discreteOnlyOpenClose")}} checked={this.props.attributes.discreteOnlyOpenClose} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the device must either be fully open or fully closed.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>commandOnlyOpenClose</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyOpenClose")}} checked={this.props.attributes.commandOnlyOpenClose} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
          </div>
        </div>

        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>queryOnlyOpenClose</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"queryOnlyOpenClose")}} checked={this.props.attributes.queryOnlyOpenClose} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device state.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default OpenClose
