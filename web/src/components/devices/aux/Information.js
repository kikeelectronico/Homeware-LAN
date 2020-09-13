import React from 'react';

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.go = this.go.bind(this);
  }

  go(){
    window.location.href = "/devices/info/" + this.props.id + "/"
  }

  render() {

    const image = {
      width: '30px',
      marginLeft: '10px'
    }

    return (
      <img src="/devices/information.png" onClick={ this.go } alt={ this.props.image } style={ image }/>
    );
  }
}

export default Information
