import React from 'react';

import '../pages/Manager.css';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  render() {

    return (
      <div className="trigger_device_container">
        <span>{this.props.triggers[this.props.id].operation}</span>
        <img src="/menu/tasks_icon.png" alt="Delete icon" className="trigger_delete" onClick={this.delete}/>
      </div>
    );
  }
}

export default Device
