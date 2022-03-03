import React from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";

class Access extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        apikey: "",
      },
      change_password_message: "",
      new_pass: { new_pass: "", new_pass_2: "d" },
      equal_passwords: false,
    };
  }

  componentDidMount() {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          this.setState({ data: data });
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong. Unable to load the data.");
        }
      }
    }.bind(this);
    http.open("GET", root + "api/access/get/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }

  generateAPIKey() {
    ToastsStore.warning("Generating API key");
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          // var data = JSON.parse(http.responseText);
          window.location.href = "/access";
          ToastsStore.success("Generated");
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong.");
        }
      } else {
        ToastsStore.error("Something went wrong");
      }
    };
    http.open("GET", root + "api/access/create/");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send();
  }

  checkEqualPassword = (event) => {
    let new_pass = this.state.new_pass;
    new_pass[event.target.id] = event.target.value;
    let change_password_message = "Passwords don't mach";
    if (new_pass.new_pass === new_pass.new_pass_2) {
      change_password_message = "";
    }
    this.setState({
      change_password_message: change_password_message,
      new_pass: new_pass,
    });
  };

  changePassword = () => {
    ToastsStore.warning("Changing");
    let new_pass = this.state.new_pass;
    if (
      new_pass.new_pass === new_pass.new_pass_2 &&
      new_pass.new_pass.length > 0
    ) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            ToastsStore.success("Changed");
          } else {
            ToastsStore.success("Error, the changes haven't been saved.");
          }
        } else {
          ToastsStore.success("Error, the changes haven't been saved.");
        }
      };
      http.open("POST", root + "api/user/password/");
      http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      http.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      http.send(
        JSON.stringify({
          pass: this.state.pass,
          new_pass: this.state.new_pass.new_pass,
        })
      );
    }
  };

  render() {
    return (
      <div>
        <div className="page_block_container">
          <h2>API key</h2>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">API Key</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="apikey"
                  value={this.state.data.apikey}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={this.generateAPIKey}>
              Generate
            </button>
          </div>
          <div className="advise">
            <span>
              The API Key gives you access to the Homeware's API. Please do not
              generate an API Key if you are not sure of what you are doing.
            </span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Change password</h2>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">Password</div>
              <div className="two_table_cel">
                <input
                  type="password"
                  className="two_input"
                  id="pass"
                  onChange={(event) =>
                    this.setState({ pass: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">New password</div>
              <div className="two_table_cel">
                <input
                  type="password"
                  className="two_input"
                  id="new_pass"
                  onChange={this.checkEqualPassword}
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">New password</div>
              <div className="two_table_cel">
                <input
                  type="password"
                  className="two_input"
                  id="new_pass_2"
                  onChange={this.checkEqualPassword}
                />
              </div>
            </div>
          </div>

          <div className="page_block_buttons_container">
            <div className="two_table_cel">
              <button
                type="button"
                id="changePasswordButton"
                onClick={this.changePassword}
              >
                Change
              </button>
              <span>{this.state.change_password_message}</span>
            </div>
          </div>
        </div>
        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Access;
