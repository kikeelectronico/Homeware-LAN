import React from 'react';

class LockUnlock extends React.Component {

  render() {

    const container = {
      float: 'left',
      marginLeft: '5px'
    }

    const image = {
      width: '30px'
    }

    var icon = 'lock_close';
    var title = ''
    if (this.props.status.isJammed) {
      icon = 'lock_alert';
      title = 'It is jammed';
    } else if (this.props.status.isLocked) {
      icon = 'lock_close';
      title = 'It is close';
    } else if (!this.props.status.isLocked) {
      icon = 'lock_open';
      title = 'It is open';
    } 

    return (
      <div style={container}>
        <img
          src={ '/devices/' + icon + '.png' }
          title={ title }
          alt={ this.props.image }
          style={ image }
        />
      </div>
    );
  }
}

export default LockUnlock
