import React from 'react';
import getCookieValue from '../../../functions'
import { root } from '../../../constants'

const Enable = (props) => {

  const toggle = () => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          props.reload();
        } else {
          console.error(http.statusText);
        }
      }
    }
    http.open("POST", root + "api/status/update/");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send(JSON.stringify({
      "id": props.id,
      "param": "enable",
      "value": !props.status.enable
    }));
  }


  return (
    <div style={{float: 'left', marginLeft: '5px', height: "30px"}}>
      <img src={ props.status.enable ? '/devices/onoff_on_true.png' : '/devices/onoff_on_false.png'} onClick={ toggle } alt={ props.image } style={{width: '30px'}}/>
    </div>
  );
  
}

export default Enable
