import React from 'react';

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
      <div className="table_row">
        <div className="table_cel">
          {this.props.name}
        </div>
        <div className="table_cel">
          <input type="text" id={this.props.data} defaultValue={this.props.value} onChange={this.update} className="table_input"/>
        </div>
      </div>
    );
  }
}

export default Text
