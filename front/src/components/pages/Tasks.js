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
      tasks: [],
      ordered_tasks: [],
      processed_tasks: [],
      order_by: "az",
      search_phrase: "",
    };
    this.loadData = this.loadData.bind(this);
    this.orderBy = this.orderBy.bind(this);
    this.search = this.search.bind(this);
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
          var tasks = data.tasks
          // Put the id in the object
          for (var i = 0; i < tasks.length; i++) {
            tasks[i]["id"] = i
          }
          this.setState({
            tasks: tasks,
          });
          this.orderBy(this.state.order_by)
          this.search(this.state.search_phrase)
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
      ordered_tasks: tasks_list,
    })
  }

  search(search_phrase) {
    this.setState({search_phrase})
    if (search_phrase === "") {
      this.setState({
        processed_tasks: this.state.ordered_tasks,
      })
    } else {
      var filtered_tasks = []
      this.state.ordered_tasks.forEach(task => {
        if (task.title.toLowerCase().includes(search_phrase)) {
          if (!filtered_tasks.includes(task)) {
            filtered_tasks.push(task)
          }
        }
      })
      this.setState({
        processed_tasks: filtered_tasks,
      })
    }
  }

  render() {
    const tasks = this.state.processed_tasks.map((task, i) => {
      return (
        
          <div key={task["id"]} className="task_card">
            <Link to={"/tasks/manager/" + task["id"]} className="task_link">
              <h2 className="task_card_title" id={"task_" + task["id"]}>
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
        <div className="page_search_containter">
          <input
            type="text"
            className="page_search_bar"
            placeholder="Type to search"
            id="search_bar"
            value={this.state.search_phrase}
            onChange={(event) => {
              this.search(event.target.value.toLowerCase());
            }}
          />
          <div
            className="page_search_x"
            onClick={
              () => {
                this.setState({search_phrase: ""});
                this.orderBy(this.state.order_by);
              }
            }
          >
            <span>X</span>
          </div>
        </div>
        
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
