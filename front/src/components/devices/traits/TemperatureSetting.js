import React from "react";
import getCookieValue from "../../../functions";
import { root } from "../../../constants";

class TemperatureSetting extends React.Component {
  constructor(props) {
    super(props);
    this.up = this.up.bind(this);
    this.down = this.down.bind(this);
    this.update = this.update.bind(this);
  }

  up() {
    var temperature = this.props.status.thermostatTemperatureSetpoint + 1;
    this.update(temperature);
  }

  down() {
    var temperature = this.props.status.thermostatTemperatureSetpoint - 1;
    this.update(temperature);
  }

  update(temperature) {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          this.props.reload();
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this);
    http.open("POST", root + "api/status/update/");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send(
      JSON.stringify({
        id: this.props.id,
        param: "thermostatTemperatureSetpoint",
        value: temperature,
      })
    );
  }

  render() {
    const container = {
      float: "left",
      marginLeft: "5px",
    };

    const title = {
      color: "#777",
    };

    const image = {
      width: "30px",
    };

    const temperature = {
      fontSize: "30px",
      marginLeft: "5px",
      marginRight: "5px",
      color: "#777",
    };

    return (
      <div style={container}>
        <span style={title}>to</span>
        <img
          src="/devices/arrow_down.png"
          onClick={this.down}
          alt="Arrow up"
          style={image}
        />
        <span style={temperature}>
          {this.props.status.thermostatTemperatureSetpoint}
        </span>
        <img
          src="/devices/arrow_up.png"
          onClick={this.up}
          alt="Arrow down"
          style={image}
        />
      </div>
    );
  }
}

export default TemperatureSetting;
