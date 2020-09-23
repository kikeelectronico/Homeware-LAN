import React from 'react';

class Cook extends React.Component {
  constructor(props) {
    super(props);
    this.updatePreset = this.updatePreset.bind(this);
    this.addPreset = this.addPreset.bind(this);
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
      var values = event.target.value
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

    const separator = {
      width: '20%'
    }

    const select = {

    }

    const names_box = {
      marginLeft: '20px',
      width: '150px'
    }

    const settings_box = {
      marginLeft: '0px',
      width: '230px'
    }


    const modes = this.props.attributes.foodPresets.map((preset, i) => {

      return (
              <div key={i}>
                <hr style={separator}/>
                <div className="attribute_table_row">
                  <div className="attribute_table_cel">
                  </div>
                  <div className="attribute_table_cel">
                    <select name="type" id={"lang_" + i} style={select} value={preset.food_synonyms[0].lang} onChange={this.updatePreset}>
                      <option value="es">es</option>
                      <option value="en">en</option>
                    </select>
                    <input type="text" id={"names_" + i} style={names_box} defaultValue={preset.food_synonyms[0].synonym} onChange={this.updatePreset}/>
                  </div>
                  <div className="attribute_table_cel">
                    <span className="attribute_advise">Any preset has a language and a name.</span>
                  </div>
                </div>

                <div className="attribute_table_row">
                  <div className="attribute_table_cel">
                  </div>
                  <div className="attribute_table_cel">
                    <select name="type" id={"units_" + i} style={select} value={preset.supported_units[0]} onChange={this.updatePreset}>
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
                  </div>
                  <div className="attribute_table_cel">
                    <span className="attribute_advise">Units.</span>
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
            Add a preset <button type="button" className="add_attribute_button" onClick={ this.addPreset }>Add</button>
          </div>

        </div>

        {modes}

      </div>
    );
  }
}

export default Cook
