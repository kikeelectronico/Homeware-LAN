import React from 'react';
import { Link } from "react-router-dom";

class Connecting extends React.Component {
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
        <Link to={"/devices/connecting/" + this.props.id + "/"}>
          <img src="/devices/connecting.png" alt={ this.props.image } style={ image }/>
        </Link>
      </div>
    );
  }
}

export default Connecting
