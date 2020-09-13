import React from 'react';

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }


  updateCheckbox(event){
    this.props.update('attributes/' + event.target.id,event.target.checked);
  }

  render() {


    return (
      <div>
        <div className="attribute_table_row">
          <div className="attribute_table_cel">
            Brightness
          </div>
          <div className="attribute_table_cel">
            <label>
              <input type="checkbox" id="sceneReversible" defaultChecked={this.props.sceneReversible} onChange={this.updateCheckbox}/>
              <span className=""><i>sceneReversible</i></span>
            </label>
          </div>
          <div className="attribute_table_cel">
            <span className="attribute_advise">Enable it if the scene can be desabled.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Scene
