import React from 'react';
import getCookieValue from '../../../../functions'
import { root } from '../../../../constants'

const OnOff = (props) => {

  const toggle = () =>{
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
    http.open("PATCH", root + "api/devices/" + props.id + "/states");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
    http.send(JSON.stringify({
      "on": !props.on
    }));
  }


  return (
    <div>
      <img src={ props.on ? '/devices/onoff_on_true.png' : '/devices/onoff_on_false.png'} onClick={ toggle } alt={ props.image } style={{width: '30px'}}/>
    </div>
  );
  
}

export default OnOff
