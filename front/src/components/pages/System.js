import React from "react";
import getCookieValue from "../../functions";
import { root } from "../../constants";
import Component from "../system/Component.js";
import ReactMarkdown from 'react-markdown'

const COMPONENTS_CHECK_INTERVAL = 3;

class System extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
      show_system_message: false,
      system_message: "",
    };

    this.loadComponents = this.loadComponents.bind(this);
  }

  componentDidMount() {
    this.loadComponents();
    setInterval(this.loadComponents, COMPONENTS_CHECK_INTERVAL * 1000);
  }

  loadComponents() {
    var comp = new XMLHttpRequest();
    comp.onload = function (e) {
      if (comp.readyState === 4) {
        if (comp.status === 200) {
          var response = JSON.parse(comp.responseText);
          var components = [];
          var keys = Object.keys(response);
          for (var i = 0; i < keys.length; i++) {
            components.push(response[keys[i]]);
          }

          this.setState({ components: components });
        } else {
          console.error(comp.statusText);
        }
      }
    }.bind(this);
    comp.open("GET", root + "api/system/status/");
    comp.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    comp.send();
  }

  render() {

    const git_description = {
      marginTop: "20px",
      marginLeft: "10%",
      width: "80%",
      paddingLeft: "20px",
      paddingRight: "20px",
      paddingTop: "20px",
      paddingBottom: "20px",
      borderRadius: "20px",
      border: "1px solid #aaa",
      textAlign: "left",
    };

    const components = this.state.components.map((component) => (
      <Component
        title={component.title}
        status={component.status}
        enable={component.enable}
        key={component.title}
      />
    ));

    return (
      <div>
        {this.state.show_system_message ? (
          <div className="page_block_container">
            <h2>System message</h2>
            <hr />
            <div className="page_block_content_container">
              {this.state.system_message}
            </div>
          </div>
        ) : (
          <div>
            <div className="page_block_container">
              <h2>System status</h2>
              <hr />
              <div className="page_block_content_container">{components}</div>
              <div className="advise">
                <span>
                  These are the core elements of Homeware-LAN. All must be
                  running.
                </span>
              </div>
            </div>

            <div className="page_block_container">
              <h2>System update</h2>
              <hr />
              <div className="page_block_content_container text_left">
                <b>System version:</b> {this.props.version}
                {this.props.git.code !== 200 ? (
                  <div>
                    <br /> Unable to verify if there is a system update.
                  </div>
                ) : (
                  <div>
                    {this.props.version !== this.props.git.version ? (
                      <div>
                        <b>Available version:</b> {this.props.git.version}
                        <h3>
                          What's new?
                        </h3>
                        <div style={git_description}>
                          <ReactMarkdown>{this.props.git.description}</ReactMarkdown>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <br /> The system is up to date.
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="advise">
                <span>
                  Verify if there is any code update and upgrade if necessary.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default System;
