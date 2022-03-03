import React from "react";
import Switch from "react-switch";
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        google: {},
        ddns: {
          enabled: false,
        },
        mqtt: {},
        apikey: "",
        sync_google: false,
        sync_devices: false,
        log: {}
      },
      url: {
        auth: "",
        token: "",
        fulfillment: "",
      },
      status: "",
    };
    this.update = this.update.bind(this);
    this.enableSyncGoogle= this.enableSyncGoogle.bind(this);
    this.enableSyncDevices = this.enableSyncDevices.bind(this);
    this.enableDdnsProvider = this.enableDdnsProvider.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    if (!this.state.create) {
      var http = new XMLHttpRequest();
      http.onload = function (e) {
        if (http.readyState === 4) {
          if (http.status === 200) {
            var data = JSON.parse(http.responseText);
            this.setState({
              settings: data,
              url: {
                auth: "https://" + data.ddns.hostname + "/auth/",
                token: "https://" + data.ddns.hostname + "/token/",
                fulfillment: "https://" + data.ddns.hostname + "/smarthome/",
              },
            });
          } else {
            console.error(http.statusText);
            ToastsStore.error("Something went wrong");
          }
        }
      }.bind(this);
      http.open("GET", root + "api/settings/get/");
      http.setRequestHeader(
        "authorization",
        "baerer " + getCookieValue("token")
      );
      http.send();
    }

    var url = new URL(window.location);
    var status = url.searchParams.get("status");
    if(status === "Success")
      ToastsStore.success("Saved correctly");
    this.setState({ status });
  }

  update(event) {
    // this.props.update('attributes/' + event.target.id,event.target.value);
    const id = event.target.id.split("/");
    var settings = this.state.settings;
    if (id.length === 1) {
      settings[id[0]] = event.target.value;
    } else if (id.length === 2) {
      settings[id[0]][id[1]] = event.target.value;
    }
    this.setState({
      settings: settings,
    });
  }

  enableSyncGoogle(checked) {
    var settings = this.state.settings;
    settings.sync_google = checked;
    this.setState({
      settings: settings,
    });
    this.save();
  }

  enableSyncDevices(checked) {
    var settings = this.state.settings;
    settings.sync_devices = checked;
    this.setState({
      settings: settings,
    });
    this.save();
  }

  enableDdnsProvider(checked) {
    var settings = this.state.settings;
    settings.ddns.enabled = checked;
    this.setState({
      settings: settings,
    });
  }

  save() {
    ToastsStore.warning("Saving");
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          JSON.parse(http.responseText);
          ToastsStore.success("Saved correctly");
        } else {
          ToastsStore.error("Error, the changes haven't been saved");
        }
      } else {
        ToastsStore.error("Error, the changes haven't been saved");
      }
    };
    http.open("POST", root + "api/settings/update/");
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.setRequestHeader("authorization", "baerer " + getCookieValue("token"));
    http.send(JSON.stringify(this.state.settings));
  }

  render() {
    const google_url =
      root + "files/upload/google/" + getCookieValue("token") + "/";

    return (
      <div>
        <div className="page_block_container">
          <h2>Actions on Google</h2>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">Client ID</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="google/client_id"
                  defaultValue={this.state.settings.google.client_id}
                  onChange={this.update}
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Client Secret</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="google/client_secret"
                  defaultValue={this.state.settings.google.client_secret}
                  onChange={this.update}
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Authorization URL</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  defaultValue={this.state.url.auth}
                  disabled
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Token URL</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  defaultValue={this.state.url.token}
                  disabled
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Fulfillment URL</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  defaultValue={this.state.url.fulfillment}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={this.save}>
              Save
            </button>
          </div>
          <div className="advise">
            <span>
              Actions on Google settings. It is used to authenticate with
              Google. If you change it here, you must change it on the Actions
              Console &#62; Develop &#62; Account Linking.
            </span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Automatic Sync with Google</h2>
          <hr />
          <div className="two_table_row">
            <div className="two_table_cel">Enable</div>
            <div className="two_table_cel">
              <Switch
                onChange={this.enableSyncGoogle}
                checked={this.state.settings.sync_google}
              />
            </div>
          </div>
          <hr/>
          <div className="page_block_content_container">
            <form
              method="post"
              encType="multipart/form-data"
              action={google_url}
            >
              <input type="file" name="file" />
              <button type="submit">Upload</button>
            </form>
          </div>
          <div className="advise">
            <span>
              Upload the file needed for Google Auth. Read the{" "}
              <a
                href="https://kikeelectronico.github.io/Homeware-LAN/docs/google-auth"
                target="_blanck"
              >
                instructions.
              </a>
              .
            </span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>MQTT</h2>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">User</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="mqtt/user"
                  defaultValue={this.state.settings.mqtt.user}
                  onChange={this.update}
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Password</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="mqtt/password"
                  defaultValue={this.state.settings.mqtt.password}
                  onChange={this.update}
                />
              </div>
            </div>
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={this.save}>
              Save
            </button>
          </div>
          <div className="advise">
            <span>
              Important. You must configure the username and password into
              Mosquitto manually from a terminal. This is only for telling
              Homeware its credentials. Clear both if you don't use credentials.
            </span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Global settings for devices</h2>
          <hr/>
          <div className="page_block_content_container">
            <div className="three_table_row">
              <div className="three_table_cel align_right">
                Automatic status sync
              </div>
              <div className="three_table_cel">
                <Switch
                  onChange={this.enableSyncDevices}
                  checked={this.state.settings.sync_devices}
                />
              </div>
              <div className="three_table_cel">
                <span className="attribute_advise">Send the status to the devices proactively.</span>
              </div>
            </div>
          </div>
          <div className="advise">
            <span>
              
            </span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>DDNS provider</h2>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">Status:</div>
              <div className="two_table_cel">
                {this.state.settings.ddns.status}
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">IP and time:</div>
              <div className="two_table_cel">
                {this.state.settings.ddns.ip +
                  " updated at " +
                  this.state.settings.ddns.last}
              </div>
            </div>
          </div>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">Enable</div>
              <div className="two_table_cel">
                <Switch
                  onChange={this.enableDdnsProvider}
                  checked={this.state.settings.ddns.enabled}
                />
              </div>
            </div>
            <div className="two_table_row">
              <div className="two_table_cel">Provider</div>
              <div className="two_table_cel">
                <select
                  name="type"
                  className="settings_select"
                  id="ddns/provider"
                  value={this.state.settings.ddns.provider}
                  onChange={this.update}
                >
                  <option value="noip">Noip</option>
                  <option value="duckdns">Duck DNS</option>
                </select>
              </div>
            </div>
            {
              this.state.settings.ddns.provider === "noip"
              ?
              <div>
                <div className="two_table_row">
                  <div className="two_table_cel">Username</div>
                  <div className="two_table_cel">
                    <input
                      type="text"
                      className="two_input"
                      id="ddns/username"
                      defaultValue={this.state.settings.ddns.username}
                      onChange={this.update}
                    />
                  </div>
                </div>
                <div className="two_table_row">
                  <div className="two_table_cel">Password</div>
                  <div className="two_table_cel">
                    <input
                      type="text"
                      className="two_input"
                      id="ddns/password"
                      defaultValue={this.state.settings.ddns.password}
                      onChange={this.update}
                    />
                  </div>
                </div>
              </div>
              :
              <div></div>
            }
            {
              this.state.settings.ddns.provider === "duckdns"
              ?
              <div>
                <div className="two_table_row">
                  <div className="two_table_cel">Token</div>
                  <div className="two_table_cel">
                    <input
                      type="text"
                      className="two_input"
                      id="ddns/password"
                      defaultValue={this.state.settings.ddns.password}
                      onChange={this.update}
                    />
                  </div>
                </div>
              </div>
              :
              <div></div>
            }
            

            <div className="two_table_row">
              <div className="two_table_cel">Hostname</div>
              <div className="two_table_cel">
                <input
                  type="text"
                  className="two_input"
                  id="ddns/hostname"
                  defaultValue={this.state.settings.ddns.hostname}
                  onChange={this.update}
                />
              </div>
            </div>
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={this.save}>
              Save
            </button>
          </div>
          <div className="advise">
            <span>
              Set up the access data to the DDNS provider account. Open an issue
              on Github if you want a DDNS provider that is not listed.
            </span>
          </div>
        </div>

        <div className="page_block_container">
          <h2>Log settings</h2>
          <hr />
          <div className="page_block_content_container">
            <div className="two_table_row">
              <div className="two_table_cel">Days to save</div>
              <div className="two_table_cel">
                <input
                  type="number"
                  min="0"
                  className="two_input"
                  id="log/days"
                  defaultValue={this.state.settings.log.days}
                  onChange={this.update}
                />
              </div>
            </div>
          </div>
          <div className="page_block_buttons_container">
            <button type="button" onClick={this.save}>
              Save
            </button>
          </div>
          <div className="advise">
            <span>
              Homeware will save the log for the last {this.state.settings.log.days} days. It is no recommended to use a large number. Set 0 to disable this function.
            </span>
          </div>
        </div>

        <ToastsContainer store={ToastsStore} />
      </div>
    );
  }
}

export default Settings;
