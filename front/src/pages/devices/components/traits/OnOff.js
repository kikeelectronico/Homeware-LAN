import React, {useEffect} from 'react';
import getCookieValue from '../../../../functions'
import { root } from '../../../../constants'

const OnOff = (props) => {

  useEffect(() => {
    if(Object.keys(props.states).includes("on")) {
      props.setStripColor("#90EE90")
      props.setStripOn(props.states.on)
    }
  }, [props])

  const toggle = () =>{
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          props.reload();
          console.log(http.responseText)
        } else {
          console.error(http.statusText);
        }
      }
    }
    http.open("PATCH", root + "api/devices/" + props.id + "/states");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
    http.send(JSON.stringify({
      "on": !props.states.on
    }));
  }


  return (
    Object.keys(props.states).includes("on") ?
      <div className="device_card_actions_block">
        <div className="device_card_action_button">
          <img src={ props.states.on ? '/devices/onoff_on_true.png' : '/devices/onoff_on_false.png'} onClick={ toggle } alt={ props.image } style={{width: '25px'}}/>
        </div>
      </div>
    : <></>
  );
  
}

export default OnOff
