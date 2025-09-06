import getCookieValue from '../../../../functions'
import { root } from '../../../../constants'

const TemperatureSetting = (props) => {

  const up = () => {
    var temperature = props.states.thermostatTemperatureSetpoint + 1;
    update(temperature);
  }

  const down = () => {
    var temperature = props.states.thermostatTemperatureSetpoint - 1;
    update(temperature);
  }

  const update = (temperature) => {
    fetch(root + "api/devices/" + props.id + "/states", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "authorization": "bearer " + getCookieValue("token")
      },
      body: JSON.stringify({
        "thermostatTemperatureSetpoint": temperature
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      props.reload();
    })
    .catch(error => {
      console.error("Error updating thermostat setpoint:", error);
    });
  }

  return (
    Object.keys(props.states).includes("thermostatTemperatureSetpoint") ?
      <div className="device_card_actions_block">
        <div className="device_card_action_button">
          <img src="/devices/arrow_down.png" onClick={down} alt="Arrow up" style={{ width: "20px"}}/>
        </div>
        <span style={{fontSize: "25px", color: "#777"}}>
          {props.states.thermostatTemperatureSetpoint}
        </span>
        <div className="device_card_action_button">
          <img src="/devices/arrow_up.png" onClick={up} alt="Arrow down" style={{ width: "20px"}}/>
        </div>
      </div>
    : <></>
  );
}

export default TemperatureSetting;
