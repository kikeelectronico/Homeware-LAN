import React from 'react';
import { Link } from "react-router-dom";

import './MenuElement.css'

const MenuElement = (props) => (
    <div className="menu_element">
      <div>
        <img src={ props.image } alt={ props.image } className="menu_element_image"/>
      </div>
      <div className="menu_element_text_container">
        {
          props.exec
          ?
          <span className="menu_element_text" onClick={props.exec}>
            { props.title }
          </span>
          :
          <Link to={props.href} className="menu_element_text">
            <span > { props.title }</span>
          </Link>
        }
      </div>
    </div>
);

export default MenuElement
