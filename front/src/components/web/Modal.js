import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './Modal.css'

const Modal = (props) => (
  <Popup trigger={props.trigger} modal>
    <div className="modal">
      <h2>{props.title}</h2>
      <hr/>
      {props.content}
    </div>
  </Popup>
);

export default Modal
