import React, {useState, useEffect} from "react";
import {Button} from '@mui/material';
import Switch from "react-switch";
import { ToastsContainer, ToastsStore } from "react-toasts";
import getCookieValue from "../../functions";
import { root } from "../../constants";

function Settings() {

  const [settings, setSettings] = useState({
      ddns: {
        enabled: false,
      },
      mqtt: {},
      apikey: "",
      sync_google: false,
      sync_devices: false,
      log: {},
      client_id: "",
      client_secret: ""
    })

  useEffect(() => {
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          var data = JSON.parse(http.responseText);
          setSettings(data)
        } else {
          console.error(http.statusText);
          ToastsStore.error("Something went wrong");
        }
      }
    }
    http.open("GET", root + "api/settings/get/");
    http.setRequestHeader(
      "authorization",
      "bearer " + getCookieValue("token")
    );
    http.send();
  }, [])

  useEffect(() => {
    var url = new URL(window.location);
    var status = url.searchParams.get("status");
    if(status === "Success")
      ToastsStore.success("Saved correctly");
  }, [])

  const update = (event) => {
    const id = event.target.id.split("/");
    const value = (event.target.id === "log/days" ? parseInt(event.target.value) : event.target.value)
    var _settings = {...settings};
    if (id.length === 1) {
      _settings[id[0]] = value;
    } else if (id.length === 2) {
      _settings[id[0]][id[1]] = value;
    }
    setSettings(_settings)
  }

  const enableSyncGoogle = (checked) => {
    var _settings = {...settings};
    _settings.sync_google = checked;
    setSettings(_settings)
    save();
  }

  const enableSyncDevices = (checked) => {
    var _settings = {...settings};
    _settings.sync_devices = checked;
    setSettings(_settings)
    save();
  }

  const enableDdnsProvider = (checked) => {
    var _settings = {...settings};
    _settings.ddns.enabled = checked;
    setSettings(_settings)
  }

  const save = () => {
    ToastsStore.warning("Saving");
    var http = new XMLHttpRequest();
    http.onload = function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          //JSON.parse(http.responseText);
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
    http.setRequestHeader("authorization", "bearer " + getCookieValue("token"));
    http.send(JSON.stringify(settings));
  }

  const uploadServiceAccountKey = (e) => {
    if (e.target.files) {
      var fileReader = new FileReader();
      fileReader.onload=function(){
        const backup = fileReader.result
        var http = new XMLHttpRequest();
        http.onload = function (e) {
          if (http.readyState === 4) {
            if (http.status === 200) {
              ToastsStore.success("Uploaded correctly");
            } else {
              ToastsStore.error("Something went wrong");
            }
          }
        }
        http.open("PUT", root + "api/settings/serviceaccountkey");
        http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        http.setRequestHeader('authorization', 'bearer ' + getCookieValue('token'))
        http.send(backup);
      }
      fileReader.readAsText(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className="page_block_container">
        <h2>Actions on Google</h2>
        <div className="advise">
          <span>
            This data is used to by Google to authenticate in Homeware. If you change it here, you must change it on the Actions Console &#62; Develop &#62; Account Linking.
          </span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">Client ID</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                id="client_id"
                defaultValue={settings.client_id}
                onChange={update}
              />
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">Client Secret</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                id="client_secret"
                defaultValue={settings.client_secret}
                onChange={update}
              />
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">Authorization URL</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                value={"https://" + settings.ddns.hostname + "/auth/"}
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
                value={"https://" + settings.ddns.hostname + "/token/"}
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
                value={"https://" + settings.ddns.hostname + "/smarthome/"}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="page_block_buttons_container">
          <Button variant="contained" onClick={save}>Save</Button>
        </div>
      </div>

      <div className="page_block_container">
        <h2>Automatic Sync with Google</h2>
        <div className="advise">
          <span>
            Inform Google automatically every time a device change. Upload the file needed for Google Auth. Read the{" "}
            <a
              href="https://kikeelectronico.github.io/Homeware-LAN/docs/google-auth"
              target="_blanck"
            >
              instructions.
            </a>
            .
          </span>
        </div>
        <hr />
        <div className="two_table_row">
          <div className="two_table_cel">Enable</div>
          <div className="two_table_cel">
            <Switch
              onChange={enableSyncGoogle}
              checked={settings.sync_google}
            />
          </div>
        </div>
        <div className="page_block_content_container">
          <input id="file" type="file" onChange={uploadServiceAccountKey} />
        </div>
      </div>

      <div className="page_block_container">
        <h2>MQTT</h2>
        <div className="advise">
          <span>This section tells Homeware its credentials. You must configure the username and password into Mosquitto manually from a terminal.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">User</div>
            <div className="two_table_cel">
              <input
                type="text"
                className="two_input"
                id="mqtt/user"
                defaultValue={settings.mqtt.user}
                onChange={update}
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
                defaultValue={settings.mqtt.password}
                onChange={update}
              />
            </div>
          </div>
        </div>
        <div className="page_block_buttons_container">
          <Button variant="contained" onClick={save}>Save</Button>
        </div>
      </div>

      <div className="page_block_container">
        <h2>Global settings for devices</h2>
        <div className="advise">
          <span>Settings that affects all the devices.</span>
        </div>
        <hr/>
        <div className="page_block_content_container">
          <div className="three_table_row">
            <div className="three_table_cel align_right">
              Automatic status sync
            </div>
            <div className="three_table_cel">
              <Switch
                onChange={enableSyncDevices}
                checked={settings.sync_devices}
              />
            </div>
            <div className="advise three_table_cel">
              <span >Send the status to the devices proactively.</span>
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
        <div className="advise">
          <span>Set up the access data to the DDNS provider account. Open an issue on Github if you want a DDNS provider that is not listed.</span>
        </div>
        <hr />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">Status:</div>
            <div className="two_table_cel">
              {settings.ddns.status}
            </div>
          </div>
          <div className="two_table_row">
            <div className="two_table_cel">IP and time:</div>
            <div className="two_table_cel">
              {settings.ddns.ip +
                " updated at " +
                settings.ddns.last}
            </div>
          </div>
        </div>
        <hr />
        <div className="page_block_content_container">
          <div className="two_table_row">
            <div className="two_table_cel">Enable</div>
            <div className="two_table_cel">
              <Switch
                onChange={enableDdnsProvider}
                checked={settings.ddns.enabled}
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
                value={settings.ddns.provider}
                onChange={update}
              >
                <option value="noip">Noip</option>
                <option value="duckdns">Duck DNS</option>
              </select>
            </div>
          </div>
          {
            settings.ddns.provider === "noip"
            ?
            <div>
              <div className="two_table_row">
                <div className="two_table_cel">Username</div>
                <div className="two_table_cel">
                  <input
                    type="text"
                    className="two_input"
                    id="ddns/username"
                    defaultValue={settings.ddns.username}
                    onChange={update}
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
                    defaultValue={settings.ddns.password}
                    onChange={update}
                  />
                </div>
              </div>
            </div>
            :
            <div></div>
          }
          {
            settings.ddns.provider === "duckdns"
            ?
            <div>
              <div className="two_table_row">
                <div className="two_table_cel">Token</div>
                <div className="two_table_cel">
                  <input
                    type="text"
                    className="two_input"
                    id="ddns/password"
                    defaultValue={settings.ddns.password}
                    onChange={update}
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
                defaultValue={settings.ddns.hostname}
                onChange={update}
              />
            </div>
          </div>
        </div>
        <div className="page_block_buttons_container">
          <Button variant="contained" onClick={save}>Save</Button>
        </div>
      </div>

      <div className="page_block_container">
        <h2>Log settings</h2>
        <div className="advise">
          <span>Homeware will save the log for the last {settings.log.days} days. It is no recommended to use a large number. Set 0 to disable this function.</span>
        </div>
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
                defaultValue={settings.log.days}
                onChange={update}
              />
            </div>
          </div>
        </div>
        <div className="page_block_buttons_container">
          <Button variant="contained" onClick={save}>Save</Button>
        </div>
      </div>

      <ToastsContainer store={ToastsStore} />
    </div>
  );
  
}

export default Settings;
