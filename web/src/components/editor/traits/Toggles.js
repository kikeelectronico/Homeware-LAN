import React from 'react';

class Toggles extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updatetoggle = this.updatetoggle.bind(this);
    this.addToggle = this.addToggle.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  updatetoggle(event){
    const id = event.target.id.split('_')
    const toggle_id = id[1]
    //Process the attribute and value depending of the attribute
    const toggle_attribute = id[0] === 'lang' ? id[0] : 'name_synonym';
    const value = id[0] === 'lang' ? event.target.value : event.target.value.split(',')
    //Update the temporal data and update it
    var temp_availableToggles = this.props.attributes.availableToggles
    temp_availableToggles[toggle_id].name_values[0][toggle_attribute] = value
    if (id[0] === 'names') temp_availableToggles[toggle_id].name = value[0]
    this.props.update('attributes/availableToggles', temp_availableToggles);
  }

  addToggle(){
    var temp_availableToggles = this.props.attributes.availableToggles
    temp_availableToggles.push({
      "name": "",
      "name_values": [
        {
          "name_synonym": [""],
          "lang": "en"
        }
      ]
    });
    this.props.update('attributes/availableToggles', temp_availableToggles);
  }

  render() {

    const names_box = {
      marginLeft: '20px',
      width: '150px'
    }

    const toggles = this.props.attributes.availableToggles.map((toggle, i) => {
      return (
              <div key={i}>
                <div className="two_table_row">
                  <div className="two_table_cel">
                  </div>
                  <div className="two_table_cel">
                    <label>
                      <span>Languaje: </span>
                      <select name="type" id={"lang_" + i} value={toggle.name_values[0].lang} placeholder="Name for the toggle" onChange={this.updatetoggle}>
                        <option value="es">es</option>
                        <option value="en">en</option>
                      </select>
                    </label>
                    <label>
                      <span>Name: </span>
                      <input type="text" id={"names_" + i} style={names_box} defaultValue={toggle.name_values[0].name_synonym} placeholder="Name" onChange={this.updatetoggle}/>
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
            <label>
              <input type="checkbox" id="commandOnlyToggles" defaultChecked={this.props.attributes.reversible} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyToggles</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the states.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            Add a toggle <button type="button" className="add_attribute_button" onClick={ this.addToggle }>Add</button>
          </div>
        </div>

        {toggles}

      </div>
    );
  }
}

export default Toggles
