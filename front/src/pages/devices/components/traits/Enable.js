import React, {useEffect} from 'react';
import getCookieValue from '../../../../functions'
import { root } from '../../../../constants'

const Enable = (props) => {

  useEffect(() => {
    if(Object.keys(props.states).includes("enable")) {
      props.setStripColor("lightsalmon")
      props.setStripOn(props.states.enable)
    }
  }, [props.states])

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
    http.open("PATCH", root + "api/devices/" + props.id + "/states");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
    http.send(JSON.stringify({
      "enable": !props.states.enable
    }));
  }


  return (
    Object.keys(props.states).includes("enable") ?
      <div className="device_card_actions_block">
        <div className="device_card_action_button">
          <img src={ props.states.enable ? '/devices/onoff_on_true.png' : '/devices/onoff_on_false.png'} onClick={ toggle } alt={ props.image } style={{width: '30px'}}/>
        </div>
      </div>
    : <></>
  );
  
}

export default Enable
