import React from 'react';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.go = this.go.bind(this);
  }

  go(){
    window.location.href = "/devices/editor/" + this.props.id + "/"
  }

  render() {

    const image = {
      width: '30px',
      marginLeft: '10px'
    }

    return (
      <img src="/devices/edit.png" onClick={ this.go } alt={ this.props.image } style={ image }/>
    );
  }
}

export default Edit
