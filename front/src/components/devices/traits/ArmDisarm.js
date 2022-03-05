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

    const image = {
      width: '30px'
    }

    var icon = 'lock_close';
    var lock_title = 'Armed'
    if (!this.props.status.isArmed) {
      icon = 'lock_open';
      lock_title = 'Disarmed';
    }

    return (
      <div style={container}>
        <img
          src={ '/devices/' + icon + '.png' }
          title={ lock_title }
          alt={ this.props.image }
          style={ image }
        />
        <span style={title}>{currentArmLevel}</span>
      </div>
    );
  }
}

export default ArmDisarm
