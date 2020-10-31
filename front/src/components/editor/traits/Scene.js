import React from 'react';
import Switch from "react-switch";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.updateCheckbox = this.updateCheckbox.bind(this);
  }


  updateCheckbox(checked, attribute){
    this.props.update('attributes/' + attribute,checked);
  }

  render() {


    return (
      <div>
        <div className="three_table_row">
          <div className="three_table_cel align_right">
            <i>sceneReversible</i>
          </div>
          <div className="three_table_cel">
            <Switch onChange={(checked) => {this.updateCheckbox(checked,"sceneReversible")}} checked={this.props.attributes.sceneReversible} />
          </div>
          <div className="three_table_cel">
            <span className="attribute_advise">Enable it if the scene can be desabled.</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Scene
