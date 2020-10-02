import React from 'react';
import Triggers from './Triggers'

import '../pages/Manager.css';

class Logic extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.id);
  }

  render() {

    const operations = this.props.triggers[this.props.id].operation.map((op, i) => {
      return (
        <div key={op + i }>
          <Triggers id={op} triggers={this.props.triggers}  delete={this.props.delete}/>
        </div>
      );
    });

    return (
      <div className="trigger_logic_container">
        <h2 className="trigger_logic_title">{this.props.triggers[this.props.id].type}</h2>
          {operations}
          <div className="">
            <button type="button" className="trigger_logic_button" onClick={ this.save }>Or</button>
            <button type="button" className="trigger_logic_button" onClick={ this.save }>And</button>
            <button type="button" className="trigger_logic_button" onClick={ this.save }>Trigger</button>
            <button type="button" className="trigger_logic_button" onClick={ this.delete }>Delete</button>
          </div>
      </div>
    );
  }
}

export default Logic
