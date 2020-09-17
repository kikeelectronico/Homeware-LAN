import React from 'react';

class OpenClose extends React.Component {
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
              <input type="checkbox" id="discreteOnlyOpenClose" defaultChecked={this.props.attributes.discreteOnlyOpenClose} onChange={this.updateCheckbox}/>
              <span className=""><i>discreteOnlyOpenClose</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the device must either be fully open or fully closed.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyOpenClose" defaultChecked={this.props.attributes.commandOnlyOpenClose} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyOpenClose</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the state.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="queryOnlyOpenClose" defaultChecked={this.props.attributes.queryOnlyOpenClose} onChange={this.updateCheckbox}/>
              <span className=""><i>queryOnlyOpenClose</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Google shouldn't change the device state.</span>
          </div>
        </div>

      </div>
    );
  }
}

export default OpenClose
