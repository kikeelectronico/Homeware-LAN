import React from 'react';

class Cook extends React.Component {
  constructor(props) {
    super(props);
    this.updateMode = this.updateMode.bind(this);
    this.addMode = this.addMode.bind(this);
    this.updatePreset = this.updatePreset.bind(this);
    this.addPreset = this.addPreset.bind(this);
  }

  updateMode(event){
    const id = event.target.id.split('_')
    const mode_id = id[1]
    var temp_supportedCookingModes = this.props.attributes.supportedCookingModes

    if (event.target.value === 'delete'){
      temp_supportedCookingModes.splice(mode_id, 1)
    } else if (event.target.value !== 'select') {
      temp_supportedCookingModes[mode_id] = event.target.value;
    }

    this.props.update('attributes/supportedCookingModes', temp_supportedCookingModes);
  }

  addMode(){
    var temp_supportedCookingModes = this.props.attributes.supportedCookingModes
    temp_supportedCookingModes.push("");
    this.props.update('attributes/supportedCookingModes', temp_supportedCookingModes);
  }

  updatePreset(event){
    const id = event.target.id.split('_')
    const preset_id = id[1]
    var temp_foodPresets = this.props.attributes.foodPresets

    if(id[0] === 'lang'){
      temp_foodPresets[preset_id].food_synonyms[0].lang = event.target.value;
    } else if (id[0] === 'names'){
      temp_foodPresets[preset_id].food_synonyms[0].synonym = event.target.value.split(',');
      temp_foodPresets[preset_id].food_preset_name = event.target.value.split(',')[0]
    } else if (id[0] === 'units'){
      temp_foodPresets[preset_id].supported_units[0] = event.target.value;
    }
    this.props.update('attributes/foodPresets', temp_foodPresets);
  }

  addPreset(){
    var temp_foodPresets = this.props.attributes.foodPresets
    temp_foodPresets.push({
      "food_preset_name": "",
      "supported_units": [""],
      "food_synonyms": [{
        "synonym": [""],
        "language": "en"
      }]
    });
    this.props.update('attributes/foodPresets', temp_foodPresets);
  }

  render() {

    const names_box = {
      width: '150px'
    }

    const modes = this.props.attributes.supportedCookingModes.map((mode, i) => {

      return (
              <div key={i}>
                <div className="table_row">
                  <div className="table_cel">
                  </div>
                  <div className="table_cel">
                    <label>
                      <span>Mode: </span>
                      <select name="type" id={"mode_" + i} value={mode} onChange={this.updateMode}>
                        <option value="select">Select a mode</option>
                        <option value="delete">Delete this mode</option>
                        <option value="UNKNOWN_COOKING_MODE">UNKNOWN_COOKING_MODE</option>
                        <option value="BAKE">BAKE</option>
                        <option value="BEAT">BEAT</option>
                        <option value="BLEND">BLEND</option>
                        <option value="BOIL">BOIL</option>
                        <option value="BREW">BREW</option>
                        <option value="BROIL">BROIL</option>
                        <option value="CONVECTION_BAKE">CONVECTION_BAKE</option>
                        <option value="COOK">COOK</option>
                        <option value="DEFROST">DEFROST</option>
                        <option value="DEHYDRATE">DEHYDRATE</option>
                        <option value="FERMENT">FERMENT</option>
                        <option value="FRY">FRY</option>
                        <option value="KNEAD">KNEAD</option>
                        <option value="MICROWAVE">MICROWAVE</option>
                        <option value="PRESSURE_COOK">PRESSURE_COOK</option>
                        <option value="PUREE">PUREE</option>
                        <option value="ROAST">ROAST</option>
                        <option value="SAUTE">SAUTE</option>
                        <option value="SLOW_COOK">SLOW_COOK</option>
                        <option value="SOUS_VIDE">SOUS_VIDE</option>
                        <option value="STEAM">STEAM</option>
                        <option value="STEW">STEW</option>
                        <option value="WARM">WARM</option>
                        <option value="WHIP">WHIP</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>

              )
    });

    const presets = this.props.attributes.foodPresets.map((preset, i) => {

      return (
              <div key={i}>
                <div className="table_row">
                  <div className="table_cel">
                  </div>
                  <div className="table_cel">
                    <label>
                      <span>Language: </span>
                      <select name="type" id={"lang_" + i} value={preset.food_synonyms[0].lang} onChange={this.updatePreset}>
                        <option value="es">es</option>
                        <option value="en">en</option>
                      </select>
                    </label>
                    <label style={names_box}>
                      <span>Preset name: </span>
                      <input type="text" id={"names_" + i} defaultValue={preset.food_synonyms[0].synonym} placeholder="Preset name" onChange={this.updatePreset}/>
                    </label>
                    <label>
                      <span>Units: </span>
                      <select name="type" id={"units_" + i} value={preset.supported_units[0]} onChange={this.updatePreset}>
                        <option value="NO_UNITS">No units</option>
                        <option value="UNKNOWN_UNITS">Unkown</option>
                        <option value="CENTIMETERS">Centimeters</option>
                        <option value="CUPS">Cups</option>
                        <option value="DECILITERS">Deciliters</option>
                        <option value="FEET">Feet</option>
                        <option value="FLUID_OUNCES">Fluid ounces</option>
                        <option value="GALLONS">Gallons</option>
                        <option value="GRAMS">Grams</option>
                        <option value="INCHES">Inches</option>
                        <option value="KILOGRAMS">Kilograms</option>
                        <option value="LITERS">Liters</option>
                        <option value="METERS">Meters</option>
                        <option value="MILLIGRAMS">Miligrams</option>
                        <option value="MILLILITERS">Mililiters</option>
                        <option value="MILLIMETERS">Milimeters</option>
                        <option value="OUNCES">Ounces</option>
                        <option value="PINCH">Pinch</option>
                        <option value="PINTS">Pints</option>
                        <option value="PORTION">Portion</option>
                        <option value="POUNDS">Pounds</option>
                        <option value="QUARTS">Quarts</option>
                        <option value="TABLESPOONS">Tablespoons</option>
                        <option value="TEASPOONS">Teaspoons</option>
                      </select>
                    </label>
                  </div>
                </div>
              </div>
              )
    });

    return (
      <div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            Add a cooking mode <button type="button" className="add_attribute_button" onClick={ this.addMode }>Add</button>
          </div>
        </div>

        {modes}

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            Add a preset <button type="button" className="add_attribute_button" onClick={ this.addPreset }>Add</button>
          </div>
        </div>

        {presets}

      </div>
    );
  }
}

export default Cook
