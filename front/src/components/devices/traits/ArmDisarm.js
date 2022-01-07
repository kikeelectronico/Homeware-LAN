import React from 'react';

class ArmDisarm extends React.Component {

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

    var currentArmLevel = this.props.status.currentArmLevel
    if (currentArmLevel.length > 15) currentArmLevel = this.props.status.currentArmLevel.substring(0,15) + '...'

    return (
      <div style={container}>
        <span style={title}>{currentArmLevel}</span>
      </div>
    );
  }
}

export default ArmDisarm
