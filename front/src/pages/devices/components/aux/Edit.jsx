import React from 'react';

const Edit = (props) => {

  return (
    <div className="device_card_action_button device_card_edit_button" onClick={() => {props.setContextualMenu(true)}}>
      <img src="/devices/edit.png" alt="" style={{ width: '25px'}}/>
    </div>
  );
  
}

export default Edit
