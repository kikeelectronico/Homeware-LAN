import React from 'react';

import BatteryUnknownIcon from '@mui/icons-material/BatteryUnknown';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import Battery20Icon from '@mui/icons-material/Battery20';
import Battery30Icon from '@mui/icons-material/Battery30';
import Battery50Icon from '@mui/icons-material/Battery50';
import Battery60Icon from '@mui/icons-material/Battery60';
import Battery80Icon from '@mui/icons-material/Battery80';
import Battery90Icon from '@mui/icons-material/Battery90';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

const CapacityRemaining = (props) => {

  const units = {
    "SECONDS": "s",
    "MILES": "m",
    "KILOMETERS": "km",
    "PERCENTAGE": "%",
    "KILOWATT_HOURS": "kW/h",
  }

  const getBatteryIcon = () => {
    const value = Math.trunc(props.states.capacityRemaining[0].rawValue / 10);

    switch (value) {
      case 0:
        return <Battery0BarIcon fontSize="small" color={"error"}/>;
      case 1:
        return <Battery0BarIcon fontSize="small" color={"error"}/>;
      case 2:
        return <Battery20Icon fontSize="small" color={"warning"}/>;
      case 3:
        return <Battery30Icon fontSize="small" color={"warning"}/>;
      case 4:
        return <Battery30Icon fontSize="small" color={""}/>;
      case 5:
        return <Battery50Icon fontSize="small" color={""}/>;
      case 6:
        return <Battery60Icon fontSize="small" color={""}/>;
      case 7:
        return <Battery60Icon fontSize="small" color={""}/>;
      case 8:
        return <Battery80Icon fontSize="small" color={""}/>;
      case 9:
        return <Battery90Icon fontSize="small" color={""}/>;
      case 10:
        return <BatteryFullIcon fontSize="small" color={""}/>;
      default:
        return <BatteryUnknownIcon fontSize="small" color={""}/>;
    }
  };
  
  return (
    Object.keys(props.states).includes("capacityRemaining") ?
      <div className="device_card_status">
        {getBatteryIcon()}
      </div>
  : <></>
  );
  
}

export default CapacityRemaining
