import React from 'react';

class Modes extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.updateMode = this.updateMode.bind(this);
    this.addMode = this.addMode.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  updateMode(event){
    const id = event.target.id.split('_')
    const mode_id = id[1]
    var temp_availableModes = this.props.attributes.availableModes

    if(id[0] === 'lang'){
      temp_availableModes[mode_id].name_values[0].lang = event.target.value;
    } else if (id[0] === 'names'){
      temp_availableModes[mode_id].name_values[0].name_synonym = event.target.value.split(',');
      temp_availableModes[mode_id].name = event.target.value.split(',')[0]
    } else if (id[0] === 'settings'){
      var values = event.target.value.split(',')
      var settings = []
      for ( var i = 0; i < values.length; i ++){
        settings.push({
          setting_name: values[i],
            setting_values: [{
              setting_synonym: [values[i]],
              lang: this.props.attributes.availableModes[mode_id].name_values[0].lang
             }]
        })
      }
      temp_availableModes[mode_id].settings = settings
    }
    this.props.update('attributes/availableModes', temp_availableModes);
  }

  addMode(){
    var temp_availableModes = this.props.attributes.availableModes
    temp_availableModes.push({
      "name": "",
      "name_values": [
        {
          "name_synonym": [""],
          "lang": "en"
        }
      ],
      "settings": [
        {
          "setting_name": "",
            "setting_values": [{
              "setting_synonym": [""],
              "lang": "en"
             }]
        }
      ]
    });
    this.props.update('attributes/availableModes', temp_availableModes);
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


    const modes = this.props.attributes.availableModes.map((mode, i) => {
      const settings = mode.settings.map((setting,i) => {return setting.setting_name});

      return (
              <div key={i}>
                <hr style={separator}/>
                <div className="attribute_table_row">
                  <div className="attribute_table_cel">
                  </div>
                  <div className="attribute_table_cel">
                    <select name="type" id={"lang_" + i} style={select} value={mode.name_values[0].lang} onChange={this.updateMode}>
                      <option value="es">es</option>
                      <option value="en">en</option>
                    </select>
                    <input type="text" id={"names_" + i} style={names_box} defaultValue={mode.name_values[0].name_synonym} onChange={this.updateMode}/>
                  </div>
                  <div className="attribute_table_cel">
                    <span className="attribute_advise">Any modes has a language and a name.</span>
                  </div>
                </div>

                <div className="attribute_table_row">
                  <div className="attribute_table_cel">
                  </div>
                  <div className="attribute_table_cel">
                    <input type="text" id={"settings_" + i} style={settings_box} defaultValue={settings} onChange={this.updateMode}/>
                  </div>
                  <div className="attribute_table_cel">
                    <span className="attribute_advise">Every mode has different settings. Type a list separeted by commas.</span>
                  </div>
                </div>
              </div>

              )
    });

    return (
      <div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
            Modes
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="commandOnlyModes" defaultChecked={this.props.attributes.reversible} onChange={this.updateCheckbox}/>
              <span className=""><i>commandOnlyModes</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if Homeware-LAN shouldn't inform Google Home about the modes.</span>
          </div>
        </div>

        <div className="attribute_table_row">
          <div className="attribute_table_cel">
          </div>
          <div className="attribute_table_cel">
            Add a mode <button type="button" className="add_attribute_button" onClick={ this.addMode }>Add</button>
          </div>

        </div>

        {modes}

      </div>
    );
  }
}

export default Modes
