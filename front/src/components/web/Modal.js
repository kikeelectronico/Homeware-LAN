import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import './Modal.css'

const Modal = (props) => {
  const popupProps = {
    modal: true
  };
  if (props.trigger) {
    popupProps.trigger = props.trigger;
  }
  if (props.open !== undefined) {
    popupProps.open = props.open;
  }
  if (props.onClose) {
    popupProps.onClose = props.onClose;
  }

  return (
    <Popup {...popupProps}>
      <div className="modal">
        <h2>{props.title}</h2>
        <hr/>
        {props.content}
      </div>
    </Popup>
  );
};

export default Modal
