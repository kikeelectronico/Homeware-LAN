import React from 'react';
import getCookieValue from '../../../functions'
import { root } from '../../../constants'

class Deactivate extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          this.props.reload();
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this)
    http.open("POST", root + "api/status/update/");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send(JSON.stringify({
      "id": this.props.id,
      "param": "deactivate",
      "value": !this.props.status.deactivate
    }));
  }

  render() {

    const container = {
      float: 'left',
      marginLeft: '5px'
    }

    const image = {
      width: '30px'
    }

    return (
      <div style={container}>
        <img src={ !this.props.status.deactivate ? '/devices/onoff_on_true.png' : '/devices/onoff_on_false.png'} onClick={ this.toggle } alt={ this.props.image } style={ image }/>
      </div>
    );
  }
}

export default Deactivate
