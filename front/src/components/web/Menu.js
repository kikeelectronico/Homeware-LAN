import React from 'react';
import { Link } from "react-router-dom";

function Menu(props) {

  const menu = {
    marginTop: '5px',
    display: 'grid',
    gridTemplateColumns: '40px auto'
  }

  const image = {
    width: '30px'
  }

  const textContainer = {
    paddingTop: '4px'
  }

  const text = {
    fontSize: '18px',
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'black'
  }

  return (
    <div style={ menu }>
      <div>
        <img src={ props.image } alt={ props.image } style={ image }/>
      </div>
      <div style={ textContainer }>
        {
          props.exec
          ?
          <span style={ text } onClick={props.exec}>{ props.title }</span>
          :
          <Link to={props.href} style={ text }>
            <span > { props.title }</span>
          </Link>
        }
      </div>
    </div>
  );
}

export default Menu
