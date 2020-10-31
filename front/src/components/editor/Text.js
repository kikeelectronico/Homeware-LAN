import React from 'react';

import '../pages/Editor.css';

class Text extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
  }


  update(event){
    this.props.update(this.props.data,event.target.value);
  }

  render() {
    return (
      <div className="two_table_row">
        <div className="two_table_cel">
          {this.props.name}
        </div>
        <div className="two_table_cel">
          <input type="text" className="two_input" id={this.props.data} defaultValue={this.props.value} onChange={this.update}/>
        </div>
      </div>
    );
  }
}

export default Text
