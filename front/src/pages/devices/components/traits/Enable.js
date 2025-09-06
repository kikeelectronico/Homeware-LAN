import React, {useEffect} from 'react';
import getCookieValue from '../../../../functions'
import { root } from '../../../../constants'

const Enable = (props) => {

  useEffect(() => {
    if(Object.keys(props.states).includes("enable")) {
      props.setStripColor("lightsalmon")
      props.setStripOn(props.states.enable)
    }
  }, [props])

  const toggle = () => {
    fetch(root + "api/devices/" + props.id + "/states", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "authorization": "bearer " + getCookieValue("token")
      },
      body: JSON.stringify({
        "enable": !props.states.enable
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      props.reload();
    })
    .catch(error => {
      console.error("Error updating device state:", error);
    });
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
