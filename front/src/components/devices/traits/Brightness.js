import React from 'react';

class Brightness extends React.Component {

  render() {

    const container = {
      float: 'left',
      marginLeft: '5px',
      height: "30px",
    }

    const title = {
      color: "#777",
      fontSize: 25,
      lineHeight: "30px",
      verticalAlign: "middle",
    };

    return (
      <div style={container}>
        <span style={title}>{this.props.brightness} %</span>
      </div>
    );
  }
}

export default Brightness
