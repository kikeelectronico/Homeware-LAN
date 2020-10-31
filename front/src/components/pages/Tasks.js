import React from 'react';
import getCookieValue from '../../functions'
import { root } from '../../constants'

import './Tasks.css';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      tasks: []
    }
    this.loadData = this.loadData.bind(this);
    this.openManager = this.openManager.bind(this);
    this.newTask = this.newTask.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(){
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          this.setState({
             devices: data.devices,
             tasks: data.tasks
           });
        } else {
          console.error(http.statusText);
        }
      }
    }.bind(this);
    http.open("GET", root + "api/global/get/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

  openManager(event){
    window.location.href = '/tasks/manager/' +  event.target.id.split('_')[1]
  }

  newTask(){
    window.location.href = '/tasks/manager/'
  }

  render() {

    const tasks = this.state.tasks.map((task, i) => {
      return(
        <div key={i} className="task_card">
          <h2 className="task_card_title" id={ 'task_' + i } onClick={ this.openManager }>{ task.title }</h2>
          <hr className="task_card_divider"/>
          <p>{ task.description }</p>
        </div>
      )
    });

    return (
      <div>
        <div className="page_title_container">
          <h2>Tasks</h2>
        </div>

        <div className="page_cards_container">
          {tasks}
        </div>

        <div className="page_buttons_containter">
          <button type="button" onClick={ this.newTask }>New</button>
        </div>
      </div>
    );
  }
}

export default Tasks
