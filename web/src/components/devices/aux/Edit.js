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

    const container = {
      float: 'left',
      marginLeft: '5px'
    }

    const image = {
      width: '30px'
    }

    return (
      <div style={container}>
        <img src="/devices/edit.png" onClick={ this.go } alt={ this.props.image } style={ image }/>
      </div>
    );
  }
}

export default Edit
