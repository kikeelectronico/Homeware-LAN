import React from 'react';
import Logic from './Logic'
import Device from './Device'

class Triggers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var operation = this.props.triggers[this.props.id]
    var device_triggers = ['d2b']

    if (operation.type === 'or'){
      return <Logic id={this.props.id} triggers={this.props.triggers} delete={this.props.delete}/>
    } else if (operation.type === 'and'){
      return <Logic id={this.props.id} triggers={this.props.triggers} delete={this.props.delete}/>
    } else if (device_triggers.includes(operation.type)){
      return <Device id={this.props.id} triggers={this.props.triggers} delete={this.props.delete}/>
    } else {
      return (
        <div>
          <button type="button" className="trigger_logic_button" onClick={ this.save }>Or</button>
          <button type="button" className="trigger_logic_button" onClick={ this.save }>And</button>
          <button type="button" className="trigger_logic_button" onClick={ this.save }>Trigger</button>
        </div>
      );
    }

  }
}

export default Triggers
