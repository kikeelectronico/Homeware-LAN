import React from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import { Link } from "react-router-dom";
import getCookieValue from "../../functions";
import { root } from "../../constants";

import "./Tasks.css";

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      tasks: [],
      order_by: "az",
    };
    this.loadData = this.loadData.bind(this);
    this.orderBy = this.orderBy.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          this.setState({
            devices: data.devices,
            tasks: data.tasks,
          });
          this.orderBy(this.state.order_by)
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong");
        }
      }
    }.bind(this);
    http.open("GET", root + "api/global/get/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }

  orderBy(by) {
    var tasks_list = this.state.tasks;
    tasks_list.sort(function(a, b){
      if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
      if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
      return 0;
    })
    
    this.setState({
      tasks: tasks_list,
    })
  }

  render() {
    const tasks = this.state.tasks.map((task, i) => {
      return (
        
          <div key={i} className="task_card">
            <Link to={"/tasks/manager/" + i} className="task_link">
              <h2 className="task_card_title" id={"task_" + i}>
                {task.title}
              </h2>
              <hr className="task_card_divider" />
              <p>{task.description}</p>
            </Link>
          </div>
      );
    });

    return (
      <div>
        <div className="page_cards_container">{tasks}</div>

        <div className="page_buttons_containter">
          <Link to="/tasks/manager/">
            <button type="button">New</button>
          </Link>
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Tasks;
