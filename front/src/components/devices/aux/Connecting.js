import React from 'react';
import { Link } from "react-router-dom";

const Connecting = (props) => {

  return (
    <div style={{float: 'left', marginLeft: '5px'}}>
      <Link to={"/devices/connecting/" + props.id + "/"}>
        <img src="/devices/connecting.png" alt={ props.image } style={{ width: '30px'}}/>
      </Link>
    </div>
  );
  
}

export default Connecting
