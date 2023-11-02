import React from 'react';
import { Link } from "react-router-dom";

const Edit = (props) => {

  return (
    <div style={{float: 'left', marginLeft: '5px'}}>
      <Link to={"/devices/editor/" + props.id + "/"}>
        <img src="/devices/edit.png" alt={ props.image } style={{ width: '30px'}}/>
      </Link>
    </div>
  );
  
}

export default Edit
