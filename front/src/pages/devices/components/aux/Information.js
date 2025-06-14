import React from 'react';
import { Link } from "react-router-dom";

const Information = (props) => {

  return (
    <div style={{float: 'left', marginLeft: '5px'}}>
      <Link to={"/devices/info/" + props.id + "/"}>
        <img src="/devices/information.png" alt={ props.image } style={{ width: '30px'}}/>
      </Link>
    </div>
  );
  
}

export default Information
