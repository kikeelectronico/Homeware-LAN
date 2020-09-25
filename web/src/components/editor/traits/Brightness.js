import React from 'react';

class Brightness extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
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
            <label>
              <input type="checkbox" id="commandOnlyBrightness" defaultChecked={this.props.commandOnlyBrightness} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyBrightness</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the brightness.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Brightness
