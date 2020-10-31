import React from 'react';
import Switch from "react-switch";

class Brightness extends React.Component {
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
            <i>commandOnlyBrightness</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"commandOnlyBrightness")}} checked={this.props.commandOnlyBrightness} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the brightness.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Brightness
