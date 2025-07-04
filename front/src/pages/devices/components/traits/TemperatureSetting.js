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
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send(
      JSON.stringify({
        "thermostatTemperatureSetpoint": temperature,
      })
    );
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
