import React from "react";

class TemperatureAmbient extends React.Component {
  render() {
    const container = {
      float: "left",
      marginLeft: "5px",
      marginTop: 2,
    };

    const title = {
      color: "#777",
    };

    const temperature = {
      fontSize: "30px",
      marginLeft: "5px",
      marginRight: "5px",
      color: "#777",
    };

    return (
      <div style={container}>
        <span style={title}>from</span>
        <span style={temperature}>
          {this.props.status.thermostatTemperatureAmbient}
        </span>
      </div>
    );
  }
}

export default TemperatureAmbient;
