import React from "react";
import getCookieValue from "../../functions";
import { root } from "../../constants";
import Component from "../system/Component.js";
const ReactMarkdown = require("react-markdown");

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
    this.upgrade = this.upgrade.bind(this);
    this.areYouAwake = this.areYouAwake.bind(this);
    this.restart = this.restart.bind(this);
    this.reboot = this.reboot.bind(this);
    this.shutdown = this.shutdown.bind(this);
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

  upgrade() {
    if (window.confirm("Are you sure?")) {
      window.open(root + "files/buckup/homeware/" + getCookieValue("token"));
      this.setState({
        show_system_message: true,
        system_message:
          "Upgrading the system. It will take some time, it depends on your machine. Then you will be redirected to the home page.",
      });
      window.setTimeout(
        function () {
          var upg = new XMLHttpRequest();
          upg.onload = function (e) {
            if (upg.readyState === 4) {
              setInterval(this.areYouAwake, 2000);
            }
          }.bind(this);
          upg.open("GET", root + "api/system/upgrade/");
          upg.setRequestHeader(
            "authorization",
            "baerer " + getCookieValue("token")
          );
          upg.send();
        }.bind(this),
        180000
      );
    }
  }

  areYouAwake() {
    var awa = new XMLHttpRequest();
    awa.onload = function (e) {
      if (awa.readyState === 4) {
        if (awa.status === 200) {
          window.location.href = "/";
        } else {
          console.error(awa.statusText);
        }
      }
    };
    awa.open("GET", root + "test/");
    awa.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    awa.send();
  }

  restart() {
    this.setState({
      show_system_message: true,
      system_message:
        "Restarting Homeware. It will take a couple of minutes and then you will be redirected to the home page.",
    });
    var res = new XMLHttpRequest();
    res.onload = function (e) {
      if (res.readyState === 4) {
        setInterval(this.areYouAwake, 2000);
      }
    }.bind(this);
    res.open("GET", root + "api/system/restart");
    res.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    res.send();
  }

  reboot() {
    this.setState({
      show_system_message: true,
      system_message:
        "Rebooting the system. It will take a couple of minutes and then you will be redirected to the home page.",
    });
    var reb = new XMLHttpRequest();
    reb.onload = function (e) {
      if (reb.readyState === 4) {
        setInterval(this.areYouAwake, 2000);
      }
    }.bind(this);
    reb.open("GET", root + "api/system/reboot");
    reb.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    reb.send();
  }

  shutdown() {
    this.setState({
      show_system_message: true,
      system_message:
        "The system will be shut down, you will lose the connection with Homeware.",
    });
    var shu = new XMLHttpRequest();
    shu.open("GET", root + "api/system/shutdown");
    shu.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    shu.send();
  }

  render() {
    const upgrade_button = {
      width: "500px",
    };

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
                        <h2>
                          System update available - {this.props.git.version}
                        </h2>
                        <p>If you have installed Homeware using docker, please run 'docker-compose pull' in your host machine, <br/> do not use the <i>Download and install button</i>.</p>
                        <div style={git_description}>
                          <ReactMarkdown source={this.props.git.description} />
                          <button
                            type="button"
                            style={upgrade_button}
                            onClick={this.upgrade}
                          >
                            Download and install - If installed without docker
                          </button>
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

            <div className="page_block_container">
              <h2>Power</h2>
              <hr />
              <div className="page_block_buttons_container">
                <button type="button" onClick={this.restart}>
                  Restart Homeware
                </button>
                <button type="button" onClick={this.reboot}>
                  Reboot System
                </button>
                <button type="button" onClick={this.shutdown}>
                  Shutdown System
                </button>
              </div>
              <div className="advise">
                <span>
                  Control the device and restart the Homeware-LAN installation. Only for direct install.
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
