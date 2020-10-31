import React from 'react';
import { deviceReference } from '../../constants'

import '../pages/Manager.css';

class Target extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  render() {

    const container = {
        marginBottom: '10px'
    }

    return (
      <div className="trigger_device_container" style={container}>
        <span>{ (this.props.devices[this.props.target.device] ? this.props.devices[this.props.target.device] : this.props.target.device)
        + ' (' + (deviceReference.params[this.props.target.param] ? deviceReference.params[this.props.target.param].name : this.props.target.param)
        + ') = ' + this.props.target.value}</span>
        <img src="/global/bin_icon.png" alt="Delete icon" className="trigger_delete" onClick={this.delete}/>
      </div>
    );
  }
}

export default Target
