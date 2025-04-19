import React from 'react';
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

const Garage = (props) => {

  return (
    <div>
      <div className="device_card">
        <div className="device_card_color_strip"></div>
        <h2 className="device_card_title">{ props.device.name.name }</h2>
        <hr className="device_card_divider"/>
        <div style={{paddingLeft: "35px"}}>
          <Information id={ props.device.id }/>
          <Connecting id={ props.device.id }/>
          <Edit id={ props.device.id }/>
        </div>
      </div>
    </div>
  );
  
}

export default Garage
