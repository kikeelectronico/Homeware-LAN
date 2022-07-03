import React from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import Triggers from "../manager/Triggers.js";
import AddTrigger from "../manager/AddTrigger.js";
import Target from "../manager/Target.js";
import AddTarget from "../manager/AddTarget.js";
import getCookieValue from "../../functions";
import { root } from "../../constants";

import "./Manager.css";

class Manager extends React.Component {
  constructor(props) {
    super(props);
    const id = window.location.pathname.split("/")[3];
    var create = false;
    if (id === "") create = true;
    this.state = {
      id: id,
      create: create,
      trigger_assistant_parent: 0,
      task: {
        title: "",
        description: "",
        triggers: {},
        target: [],
      },
      devices: [],
      status: {},
      mandatory_target: false,
      mandatory_name: false,
      mandatory_description: false,
    };
    this.update = this.update.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteTrigger = this.deleteTrigger.bind(this);
    this.addTriggerLogic = this.addTriggerLogic.bind(this);
    this.openTriggerAssistant = this.openTriggerAssistant.bind(this);
    this.addTriggerOperation = this.addTriggerOperation.bind(this);
    this.closeTriggerAssistant = this.closeTriggerAssistant.bind(this);
    this.addTarget = this.addTarget.bind(this);
    this.deleteTarget = this.deleteTarget.bind(this);
  }

  componentDidMount() {
    // Load devices data
    var dev = new XMLHttpRequest();
    dev.onload = function (e) {
      if (dev.readyState === 4) {
        if (dev.status === 200) {
          var data = JSON.parse(dev.responseText);
          var devices_names = {};
          data.devices.forEach((device) => {
            devices_names[device.id] = device.name.name;
          });
          this.setState({
            devices: devices_names,
            status: data.status,
          });
        } else {
          console.error(dev.statusText);
        }
      }
    }.bind(this);
    dev.open("GET", root + "api/global/get/");
    dev.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    dev.send();

    // Load task if neeeded
    if (!this.state.create) {
      var tas = new XMLHttpRequest();
      tas.onload = function (e) {
        if (tas.readyState === 4) {
          if (tas.status === 200) {
            var data = JSON.parse(tas.responseText);
            this.setState({
              task: data,
              mandatory_target: true,
              mandatory_name: true,
              mandatory_description: true,
            });
          } else {
            console.error(tas.statusText);
          }
        }
      }.bind(this);
      tas.open("GET", root + "api/tasks/get/" + this.state.id + "/");
      tas.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      tas.send();
    }
  }

  update(event) {
    var task = this.state.task;
    task[event.target.id] = event.target.value;
    this.setState({
      task: task,
    });
  }

  save() {
    if(this.state.mandatory_description && this.state.mandatory_name && this.state.mandatory_target) {
      ToastsStore.warning("Saving");
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            if (this.state.create) {
              window.location.href = "/tasks";
            } else {
              ToastsStore.success("Saved correctly");
            }
          } else {
            console.error(http.statusText);
            ToastsStore.error("Error, the changes haven't been saved");
          }
        } else {
          ToastsStore.error("Error, the changes haven't been saved");
        }
      }.bind(this);
      var payload = {
        task: this.state.task,
      };
      if (this.state.create) {
        http.open("POST", root + "api/tasks/create/");
      } else {
        http.open("POST", root + "api/tasks/update/");
        payload["id"] = this.state.id;
      }
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
      http.send(JSON.stringify(payload));
    } else {
      ToastsStore.error("Verify the mandatory data");
    }
  }

  delete() {
    ToastsStore.warning("Deleting");
    if (window.confirm("Do you want to delete the task?")) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            ToastsStore.success("Deleted");
            window.location.href = "/tasks/";
          } else {
            console.error(http.statusText);
            ToastsStore.error("Error, the device hasn't been deleted");
          }
        } else {
          ToastsStore.error("Error, the device hasn't been deleted");
        }
      };
      http.open("POST", root + "api/tasks/delete/" + this.state.id + "/");
      http.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      http.send();
    } else {
      ToastsStore.warning("Ok. The device is save");
    }
  }

  deleteTrigger(id) {
    // Get the task
    var task = this.state.task;
    var triggers = task.triggers;
    // Get the the parent id
    const parent = triggers[id].parent;
    if (parent !== "triggers") {
      // Delete from the parent
      const index = triggers[parent].operation.indexOf(id);
      triggers[parent].operation.splice(index, 1);
      // Delete the trigger
      delete triggers[id];
      task.triggers = triggers;
    } else {
      task.triggers = {};
    }
    this.setState({
      task: task,
    });
  }

  addTriggerLogic(type, parent) {
    // Get the triggers
    var task = this.state.task;
    if (parent !== "triggers") {
      // Get the timestamp
      const ts = Date.now();
      // Compose and create the logic trigger
      task.triggers[ts] = {
        operation: [],
        parent: parent,
        type: type,
      };
      // Register the trigger in the parent
      task.triggers[parent].operation.push(ts);
    } else {
      task.triggers["trigger"] = {
        operation: [],
        parent: "triggers",
        type: type,
      };
    }
    // Update the component state
    this.setState({
      task: task,
    });
  }

  openTriggerAssistant(parent) {
    this.setState({
      trigger_assistant_parent: parent,
    });
  }

  addTriggerOperation(type, operation) {
    // Get the triggers
    var task = this.state.task;
    const parent = this.state.trigger_assistant_parent;
    if (parent !== "triggers") {
      // Get the timestamp
      const ts = Date.now();
      // Compose and create the logic trigger
      task.triggers[ts] = {
        operation: operation,
        parent: parent,
        type: type,
      };
      // Register the trigger in the parent
      task.triggers[parent].operation.push(ts);
    } else {
      task.triggers["trigger"] = {
        operation: operation,
        parent: "triggers",
        type: type,
      };
    }
    // Update the component state
    this.setState({
      task: task,
    });
  }

  closeTriggerAssistant() {
    this.setState({
      trigger_assistant_parent: 0,
    });
  }

  addTarget(target) {
    var task = this.state.task;
    task.target.push(target);
    this.setState({
      task: task,
      mandatory_target: task.target.length > 0,
    });
  }

  deleteTarget(id) {
    var task = this.state.task;
    task.target.splice(id, 1);
    this.setState({
      task: task,
    });
  }

  render() {
    const deleteButton = {
      backgroundColor: "red",
    };

    const deleteButtonDisabled = {
      backgroundColor: "red",
      opacity: "0.2",
    };

    const separator = {
      width: "70%",
    };

    const targets = this.state.task.target.map((target, i) => {
      return (
        <Target
          key={i}
          id={i}
          target={target}
          devices={this.state.devices}
          delete={this.deleteTarget}
        />
      );
    });

    return (
      <div className="page_block_container">
        <h2>Task</h2>
        <hr style={separator} />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">Name*</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                id="title"
                defaultValue={this.state.task.title}
                onChange={(event) => {
                  this.setState({mandatory_name: event.target.value.length > 0})
                  this.update(event)
                }}
              />
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">Description*</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                id="description"
                defaultValue={this.state.task.description}
                onChange={(event) => {
                  this.setState({mandatory_description: event.target.value.length > 0})
                  this.update(event)
                }}
              />
            </div>
          </div>
          <hr />
          <h2>Triggers</h2>
          <div className="advise">
            <span></span>
          </div>
          <Triggers
            id="trigger"
            triggers={this.state.task.triggers}
            devices={this.state.devices}
            delete={this.deleteTrigger}
            addTriggerLogic={this.addTriggerLogic}
            openTriggerAssistant={this.openTriggerAssistant}
          />
          {this.state.trigger_assistant_parent !== 0 ? (
            <AddTrigger
              devices={this.state.devices}
              status={this.state.status}
              closeTriggerAssistant={this.closeTriggerAssistant}
              addTriggerOperation={this.addTriggerOperation}
            />
          ) : (
            ""
          )}
          <hr />
          <h2>Targets</h2>
          <div className="advise">
            <span></span>
          </div>
          {targets}
          <AddTarget
            devices={this.state.devices}
            status={this.state.status}
            addTarget={this.addTarget}
          />
          <hr />
          <div className="two_table_cel">
            <button
              type="button"
              style={this.state.create ? deleteButtonDisabled : deleteButton}
              onClick={this.delete}
              disabled={this.state.create ? true : false}
            >
              Delete
            </button>
            <button type="button" onClick={this.save}>
              Save
            </button>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Manager;
