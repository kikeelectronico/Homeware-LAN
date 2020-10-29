import React from 'react';

class SensorState extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }

  update(event){
    const value = event.target.value;
    var sensor = {
      name: value
    }

    switch (value) {
      default:
        sensor['descriptiveCapabilities'] = {
          availableStates: ['fair','good','healthy','moderate','poor','severe','unhealthy','unhealthy for sensitive groups','very poor','very unhealthy','unknown'],
        }
        sensor['numericCapabilities']= { rawValueUnit: "AQI" }
        break;
      case 'AirQuality':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['fair','good','healthy','moderate','poor','severe','unhealthy','unhealthy for sensitive groups','very poor','very unhealthy','unknown'],
        }
        sensor['numericCapabilities']= { rawValueUnit: "AQI" }
        break;
      case 'CarbonDioxideLevel':
        sensor['descriptiveCapabilities'] = {
          numericCapabilities: { rawValueUnit: "PARTS_PER_MILLION" }
        }
        break;
      case 'CarbonMonoxideLevel':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['carbon monoxide detected','high','no carbon monoxide detected','unknown']
        }
        sensor['numericCapabilities']= { rawValueUnit: "PARTS_PER_MILLION" }
        break;
      case 'FilterCleanliness':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['clean','dirty','needs replacement','unknown']
        }
        break;
      case 'FilterLifeTime':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['good','new','replace soon','replace now','unknown']
        }
        sensor['numericCapabilities']= { rawValueUnit: "PERCENTAGE" }
        break;
      case 'HEPAFilterLifeTime':
        sensor['numericCapabilities']= { rawValueUnit: "PERCENTAGE" }
        break;
      case 'Max2FilterLifeTime':
        sensor['numericCapabilities']= { rawValueUnit: "PERCENTAGE" }
        break;
      case 'PM2.5':
        sensor['numericCapabilities']= { rawValueUnit: "MICROGRAMS_PER_CUBIC_METER" }
        break;
      case 'PM10':
        sensor['numericCapabilities']= { rawValueUnit: "MICROGRAMS_PER_CUBIC_METER" }
        break;
      case 'PreFilterLifeTime':
        sensor['numericCapabilities']= { rawValueUnit: "PERCENTAGE" }
        break;
      case 'SmokeLevel':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['smoke detected','high','no smoke detected','unknown']
        }
        sensor['numericCapabilities']= { rawValueUnit: "PARTS_PER_MILLION" }
        break;
      case 'WaterLeak':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['leak','no leak','unknown']
        }
        break;
      case 'RainDetection':
        sensor['descriptiveCapabilities'] = {
          availableStates: ['rain detected','no rain detected','unknown']
        }
        break;
      case 'VolatileOrganicCompounds':
        sensor['numericCapabilities']= { rawValueUnit: "PARTS_PER_MILLION" }
        break;
    }

    var sensorStatesSupported = []
    sensorStatesSupported.push(sensor);
    this.props.update('attributes/' + event.target.id,sensorStatesSupported);
  }

  render() {
    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel">

          </div>
          <div className="three_table_cel">
            <select name="type" id="sensorStatesSupported" className="table_input" value={this.props.attributes.sensorStatesSupported[0].name} onChange={this.update}>
              <option value="">Select</option>
              <option value="AirQuality">Air Quality</option>
              <option value="CarbonDioxideLevel">Carbon Dioxide Level</option>
              <option value="CarbonMonoxideLevel">Carbon Monoxide Level</option>
              <option value="FilterCleanliness">Filter Clean liness</option>
              <option value="FilterLifeTime">Filter Life Time</option>
              <option value="HEPAFilterLifeTime">HEPA Filter Life Time</option>
              <option value="Max2FilterLifeTime">Max2 Filter Life Time</option>
              <option value="PM2.5">PM2.5</option>
              <option value="PM10">PM10</option>
              <option value="PreFilterLifeTime">PreFilter Life Time</option>
              <option value="SmokeLevel">Smoke Level</option>
              <option value="WaterLeak">Water Leak</option>
              <option value="RainDetection">Rain Detection</option>
              <option value="VolatileOrganicCompounds">Volatile Organic Compounds</option>
            </select>
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise"></span>
          </div>
        </div>

      </div>
    );
  }
}

export default SensorState
