import React from 'react';
import { Link } from "react-router-dom";

class Edit extends React.Component {
  constructor(props) {
    super(props);
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
        <Link to={"/devices/editor/" + this.props.id + "/"}>
          <img src="/devices/edit.png" alt={ this.props.image } style={ image }/>
        </Link>
      </div>
    );
  }
}

export default Edit
