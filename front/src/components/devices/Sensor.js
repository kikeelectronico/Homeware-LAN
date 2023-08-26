import React from 'react';
import Information from './aux/Information'
import Connecting from './aux/Connecting'
import Edit from './aux/Edit'

function Sensor(props) {

    const traits_container = {
        paddingLeft: '50px'
    }

    const color_strip = {
        width: '100%',
        height: '20px',
        borderRadius: '20px 20px 0px 0px',
        backgroundColor: 'yellow',
        opacity: props.status.occupancy === "UCCUPIED" ? '1' : '0.4',
    }

    return (
        <div>
            <div className="device_card">
            <div style={ color_strip }></div>
            <h2 className="device_card_title">{ props.device.name.name }</h2>
            <hr className="device_card_divider"/>
            <div style={traits_container}>
                <Information id={ props.device.id }/>
                <Connecting id={ props.device.id }/>
                <Edit id={ props.device.id }/>
            </div>
            </div>
        </div>
    )
}

export default Sensor