import React from 'react';
import ArmDisarm from './traits/ArmDisarm'
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

const SecuritySystem = (props) => {

  return (
    <div>
      <div className="device_card">
        <div className="device_card_color_strip"></div>
        <h2 className="device_card_title">{ props.device.name.name }</h2>
        <hr className="device_card_divider"/>
        <div style={{paddingLeft: "35px"}}>
          <ArmDisarm id={ props.device.id } status={ props.status }/>
          <Information id={ props.device.id }/>
          <Connecting id={ props.device.id }/>
          <Edit id={ props.device.id }/>
        </div>
      </div>
    </div>
  );
  
}

export default SecuritySystem
