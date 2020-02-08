
function loadDevices(device, deviceID) {
    //Status
    var operation = 'create';
    console.log(deviceID);


    if(deviceID != ''){
      operation = 'update';
      loadDeviceData(device);
    }
    document.getElementById('operation').value = operation;

}

function loadDeviceData(device){
  //Get the device info
  document.getElementById("id").value = device.id;
  document.getElementById("id").readOnly = true;
  document.getElementById("type").value = device.type;
  if(device.deviceInfo){
    document.getElementById("hwVersion").value = device.deviceInfo.hwVersion;
    document.getElementById("swVersion").value = device.deviceInfo.swVersion;
    document.getElementById("manufacturer").value = device.deviceInfo.manufacturer;
    document.getElementById("model").value = device.deviceInfo.model;
  }
  document.getElementById("name").value = device.name.name;


  //Show traits
  updateTraits(device.traits);

  updateThermostatModes([]);
  //Show default names
  var html = "";
  var string = "";
  Object(device.name.defaultNames).forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'default_names\',\'' + name + '\')">' + name + '</button>';
    string += name + ';';
  });
  document.getElementById("badge_default_names_container").innerHTML = html;
  document.getElementById("default_names").value = string;
  //Show nick names
  var html = "";
  var string = "";
  Object(device.name.nicknames).forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'nick_names\',\'' + name + '\')">' + name + '</button>';
    string += name + ';';
  });
  document.getElementById("badge_nick_names_container").innerHTML = html;
  document.getElementById("nick_names").value = string;
  //Show attributes
  if(device.attributes){
    if(device.attributes.availableToggles){
      var availableToggles = device.attributes.availableToggles;
      var html = "";
      Object(availableToggles).forEach(function(toggle){
        html += composeToggle(toggle.name, toggle.names_values.lang, toggle.names_values.name_synonym);
      });

      document.getElementById("availableToggles").value = JSON.stringify(availableToggles);
      document.getElementById("badge_toggles_container").innerHTML = html
    }

    if(device.attributes.commandOnlyOnOff){
      document.getElementById("customSwitch_commandOnlyOnOff").checked = device.attributes.commandOnlyOnOff;
    }

    if(device.attributes.colorModel){
      document.getElementById("colorModel").value = device.attributes.colorModel;
    }
    if(device.attributes.colorTemperatureRange){
      document.getElementById("customSwitch_colorTemperaturRange").checked = true;
      document.getElementById("temperatureMinK").value = device.attributes.colorTemperatureRange.temperatureMinK;
      document.getElementById("temperatureMaxK").value = device.attributes.colorTemperatureRange.temperatureMaxK;
    } else {
      document.getElementById("customSwitch_colorTemperaturRange").checked = false;
    }
    if(device.attributes.commandOnlyColorSetting){
      document.getElementById("customSwitch_commandOnlyColorSetting").checked = device.attributes.commandOnlyColorSetting;
    }

    if(device.attributes.availableFanSpeeds){
      document.getElementById("customSwitch_ordered").checked = device.attributes.availableFanSpeeds.ordered;
      document.getElementById("customSwitch_reversible").checked = device.attributes.reversible;
      document.getElementById("customSwitch_commandOnlyFanSpeed").checked = device.attributes.commandOnlyFanSpeed;
      var availableFanSpeeds = device.attributes.availableFanSpeeds.speeds;
      var html = "";
      Object(availableFanSpeeds).forEach(function(fanSpeed){
        html += composeFanSpeed(fanSpeed.speed_name, fanSpeed.speed_values.lang, fanSpeed.speed_values.speed_synonym);
      });

      document.getElementById("availableFanSpeeds").value = JSON.stringify(availableFanSpeeds);
      document.getElementById("badge_fan_speeds_container").innerHTML = html
    }

    if(device.attributes.supportedEffects){
      document.getElementById("customSwitch_colorLoop").checked = true;
    }

    if (device.attributes.openDirection){
      var html = "";
      var string = "";
      Object(device.attributes.openDirection).forEach(function(name){
        html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
        string += name + ';';
      });
      document.getElementById("openDirection").value = string;
      document.getElementById("badge_openDirection_container").innerHTML = html;
      document.getElementById("customSwitch_queryOnlyOpenClose").checked = device.attributes.queryOnlyOpenClose;
    }

    if(device.attributes.queryOnlyTemperatureControl){
      document.getElementById("customSwitch_queryOnlyTemperatureControl").checked = device.attributes.queryOnlyTemperatureControl;
    }
    if(device.attributes.commandOnlyTemperatureControl){
      document.getElementById("customSwitch_commandOnlyTemperatureControl").checked = device.attributes.commandOnlyTemperatureControl;
    }
    if(device.attributes.temperatureRange){
      document.getElementById("minThresholdCelsius").value = device.attributes.temperatureRange.minThresholdCelsius;
      document.getElementById("maxThresholdCelsius").value = device.attributes.temperatureRange.maxThresholdCelsius;
      document.getElementById("temperatureStepCelsius").value = device.attributes.temperatureStepCelsius;
      document.getElementById("temperatureUnitForUX").value = device.attributes.temperatureUnitForUX;
    }

    if(device.attributes.commandOnlyTimer){
      document.getElementById("customSwitch_commandOnlyTimer").checked = device.attributes.commandOnlyTimer;
    }
    if(device.attributes.maxTimerLimitSec){
      document.getElementById("maxTimerLimitSec").value = device.attributes.maxTimerLimitSec;
    }

    if(device.attributes.sceneReversible){
      document.getElementById("customSwitch_sceneReversible").checked = device.attributes.sceneReversible;
    }

    if(device.attributes.availableArmLevels){
      document.getElementById("customSwitch_arm_levels_ordered").checked = device.attributes.availableArmLevels.ordered;
      var availableArmLevels = device.attributes.availableArmLevels.levels;
      var html = "";
      Object(availableArmLevels).forEach(function(level){
        html += composeArmLevels(level.level_name, level.level_values.lang, level.level_values.level_synonym);
      });

      document.getElementById("availableArmLevels").value = JSON.stringify(availableArmLevels);
      document.getElementById("badge_arm_levels_container").innerHTML = html
    }

    if(device.attributes.cameraStreamSupportedProtocols){
      var protocols = ["hls","dash"];
      var supportedProtocols = device.attributes.cameraStreamSupportedProtocols;
      var html = "";
      Object(protocols).forEach(function(protocol){

            if(supportedProtocols.indexOf(protocol) >= 0){
              html += '<option selected>' + protocol + '</option>';
            } else {
              html += '<option>' + protocol + '</option>';
            }
      });
      document.getElementById("cameraStreamSupportedProtocols").innerHTML = html;

      document.getElementById("customSwitch_cameraStreamNeedAuthToken").checked = device.attributes.cameraStreamNeedAuthToken;
      document.getElementById("customSwitch_cameraStreamNeedDrmEncryption").checked = device.attributes.cameraStreamNeedDrmEncryption;
    }

    if(device.attributes.availableThermostatModes){
      updateThermostatModes(device.attributes.availableThermostatModes.split(","));
      document.getElementById("thermostatTemperatureUnit").value = device.attributes.thermostatTemperatureUnit;
      document.getElementById("bufferRangeCelsius").value = device.attributes.bufferRangeCelsius;

      document.getElementById("customSwitch_queryOnlyTemperatureSetting").checked = device.attributes.queryOnlyTemperatureSetting;
      document.getElementById("customSwitch_commandOnlyTemperatureSetting").checked = device.attributes.commandOnlyTemperatureSetting;
    }

    if (device.attributes.availableZones){
      var html = "";
      var string = "";
      Object(device.attributes.availableZones).forEach(function(zone){
        html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
        string += zone + ';';
      });
      document.getElementById("zones").value = string;
      document.getElementById("badge_zones_container").innerHTML = html;
      document.getElementById("customSwitch_pausable").checked = device.attributes.pausable;
    }

    if(device.attributes.sceneReversible){
      document.getElementById("customSwitch_sceneReversible").checked = device.attributes.sceneReversible;
    }

  }

}

save.addEventListener('click', e => {
  //Compose JSON
  var device = {
    id: document.getElementById("id").value,
    name: {
      defaultNames: [],
      name: document.getElementById("name").value,
      nicknames: []
    },
    attributes:{
    },
    traits: [],
    type: document.getElementById("type").value
  }

  if(true){
    //Save commandOnlyOnOff
    if(document.getElementById("hwVersion").value != ""){
      device.deviceInfo = {
        hwVersion: document.getElementById("hwVersion").value,
        manufacturer: document.getElementById("manufacturer").value,
        model:  document.getElementById("model").value,
        swVersion:  document.getElementById("swVersion").value
      };
    }

    //Save traits
    var traits=document.getElementById("trais");
    for (var i = 0; i < traits.options.length; i++) {
       if(traits.options[i].selected ==true){
            device.traits.push(traits.options[i].value);
        }
    }

    //Save default names
    var defaultNamesArray = [];
    var defaultNames=document.getElementById("default_names").value.split(";");
    defaultNames.pop();
    defaultNames.forEach(function(dName){
      defaultNamesArray.push(dName);
    });
    device.name.defaultNames = defaultNamesArray;

    //Save nick names
    var nickNamesArray = [];
    var nickNames=document.getElementById("nick_names").value.split(";");
    nickNames.pop();
    nickNames.forEach(function(nName){
      nickNamesArray.push(nName);
    });
    device.name.nicknames = nickNamesArray;

    //Save the available toggles
    var toggles = document.getElementById("availableToggles").value;
    if (toggles != "-1"){
      device.attributes.availableToggles = {}
      device.attributes.availableToggles = JSON.parse(toggles);
    }

    //Save the available ColorSetting
    var colorModel = document.getElementById("colorModel").value;
    var colorTemperatureRange = document.getElementById("customSwitch_colorTemperaturRange").checked;
    var temperatureMinK = document.getElementById("temperatureMinK").value;
    var temperatureMaxK = document.getElementById("temperatureMaxK").value;

    if (colorModel == "rgb" || colorModel == "hsv"){
      device.attributes.colorModel = colorModel;
      //Save commandOnlyColorSetting
      device.attributes.commandOnlyColorSetting = document.getElementById("customSwitch_commandOnlyColorSetting").checked;
    }
    if(colorTemperatureRange){
        device.attributes.colorTemperatureRange = {};
        device.attributes.colorTemperatureRange.temperatureMinK = temperatureMinK;
        device.attributes.colorTemperatureRange.temperatureMaxK = temperatureMaxK;
        //Save commandOnlyColorSetting
        device.attributes.commandOnlyColorSetting = document.getElementById("customSwitch_commandOnlyColorSetting").checked;
    }


    //Save commandOnlyOnOff
    if(document.getElementById("customSwitch_commandOnlyOnOff").checked){
      device.attributes.commandOnlyOnOff = document.getElementById("customSwitch_commandOnlyOnOff").checked;
    }

    //Save Fan Speed
    var fanSpeeds = document.getElementById("availableFanSpeeds").value;
    var ordered = document.getElementById("customSwitch_ordered").checked;
    if (fanSpeeds != "-1"){
      device.attributes.availableFanSpeeds = {
        speeds: JSON.parse(fanSpeeds),
        ordered: ordered
      }

      device.attributes.reversible = document.getElementById("customSwitch_reversible").checked;
      device.attributes.commandOnlyFanSpeed = document.getElementById("customSwitch_commandOnlyFanSpeed").checked;
    }

    //Save colorLoop
    if(document.getElementById("customSwitch_colorLoop").checked){
      device.attributes.supportedEffects = ["colorLoop"];
    }

    //Save OpenClose
    var openClose = document.getElementById("openDirection").value;
    if (openClose != "-1"){
      names = openClose.split(";");
      names.pop();
      device.attributes.openDirection = names;
      device.attributes.queryOnlyOpenClose = document.getElementById("customSwitch_queryOnlyOpenClose").checked;
    }

    //Save commandOnlyTemperatureControl
    if(document.getElementById("customSwitch_commandOnlyTemperatureControl").checked){
      device.attributes.commandOnlyTemperatureControl = document.getElementById("customSwitch_commandOnlyTemperatureControl").checked;
    }

    //Save queryOnlyTemperatureControl
    if(document.getElementById("customSwitch_queryOnlyTemperatureControl").checked){
      device.attributes.queryOnlyTemperatureControl = document.getElementById("customSwitch_queryOnlyTemperatureControl").checked;
    }

    if (document.getElementById("minThresholdCelsius").value != ""){
      device.attributes.commandOnlyTemperatureControl = document.getElementById("customSwitch_commandOnlyTemperatureControl").checked;
      device.attributes.queryOnlyTemperatureControl = document.getElementById("customSwitch_queryOnlyTemperatureControl").checked;
      device.attributes.temperatureRange = {
        minThresholdCelsius: parseInt(document.getElementById("minThresholdCelsius").value),
        maxThresholdCelsius: parseInt(document.getElementById("maxThresholdCelsius").value)
      };
      device.attributes.temperatureStepCelsius = parseInt(document.getElementById("temperatureStepCelsius").value);
      device.attributes.temperatureUnitForUX = document.getElementById("temperatureUnitForUX").value;
    }

    //Save commandOnlyTimer
    if(document.getElementById("customSwitch_commandOnlyTimer").checked){
      device.attributes.commandOnlyTimer = document.getElementById("customSwitch_commandOnlyTimer").checked;
    }
    if (document.getElementById("maxTimerLimitSec").value != ""){
      device.attributes.maxTimerLimitSec = parseInt(document.getElementById("maxTimerLimitSec").value);
    }

    //Save sceneReversible
    if(document.getElementById("customSwitch_sceneReversible").checked){
      device.attributes.sceneReversible = document.getElementById("customSwitch_sceneReversible").checked;
    }

    //Save security levels
    var armLevels = document.getElementById("availableArmLevels").value;
    var ordered = document.getElementById("customSwitch_arm_levels_ordered").checked;
    if (armLevels != "-1"){
      device.attributes.availableArmLevels = {
        levels: JSON.parse(armLevels),
        ordered: ordered
      }
    }

    //Save CameraStream
    var protocols=document.getElementById("cameraStreamSupportedProtocols");
    for (var i = 0; i < protocols.options.length; i++) {
      if(protocols.options[i].selected == true){
        if(!device.attributes.cameraStreamSupportedProtocols){
          device.attributes.cameraStreamSupportedProtocols = [];
        }

        device.attributes.cameraStreamSupportedProtocols.push(protocols.options[i].value);
        device.attributes.cameraStreamNeedAuthToken = document.getElementById("customSwitch_cameraStreamNeedAuthToken").checked;
        device.attributes.cameraStreamNeedDrmEncryption = document.getElementById("customSwitch_cameraStreamNeedDrmEncryption").checked;
      }
    }

    //Save TemperatureSetting
    var modes=document.getElementById("availableThermostatModes");
    for (var i = 0; i < modes.options.length; i++) {
      if(modes.options[i].selected == true){
        if(!device.attributes.availableThermostatModes){
          device.attributes.availableThermostatModes = modes.options[i].value;
        } else {
          device.attributes.availableThermostatModes = device.attributes.availableThermostatModes + ',' + modes.options[i].value;
        }
        device.attributes.thermostatTemperatureUnit = document.getElementById("thermostatTemperatureUnit").value;
        device.attributes.bufferRangeCelsius = parseInt(document.getElementById("bufferRangeCelsius").value);

        device.attributes.queryOnlyTemperatureSetting = document.getElementById("customSwitch_queryOnlyTemperatureSetting").checked;
        device.attributes.commandOnlyTemperatureSetting = document.getElementById("customSwitch_commandOnlyTemperatureSetting").checked;
      }
    }

    //Save StarStop
    var zones_list = document.getElementById("zones").value;
    if (zones_list != "-1"){
      zones = zones_list.split(";");
      zones.pop();
      device.attributes.availableZones = zones;
      device.attributes.pausable = document.getElementById("customSwitch_pausable").checked;
    }

    //Save commandOnlyOnOff
    if(document.getElementById("customSwitch_sceneReversible").checked){
      device.attributes.sceneReversible = document.getElementById("customSwitch_sceneReversible").checked;
    }
  }

  console.log(device);

  //Create or update the device
  var operation = document.getElementById('operation').value;
  var current_date = new Date().getTime();

  data = {
    devices: device,
    alive: {
      timestamp: current_date,
    },
    status: {
      online: true
    }

  }

  //Send the data to the API
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    console.log(http.responseText);
  });
  http.open("GET", "/front/device/" + operation + "/" + JSON.stringify(data));
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();


   $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>Success!</b> The device has been saved correctly.</div>');
   $('#savedAlert').alert()
   setTimeout(function() {
      $("#savedAlert").remove();
    }, 5000);

});

deleteDevice.addEventListener('click', e => {

  if (confirm("Do you want to delete the device?")){
    var deviceID = document.getElementById("id").value;
    //Send the data to the API
    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
        window.location = '/devices/';
    });
    http.open("GET", "/front/device/delete/" + deviceID);
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  } else {
    //Make alert show up
     $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>OK</b> The device hasn\'t been deleted. Be careful!</div>');
     $('#savedAlert').alert()
     setTimeout(function() {
        $("#savedAlert").remove();
      }, 5000);
  }


});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function addName(id){
  names = document.getElementById(id).value.split(";");
  names.pop();
  var new_names = document.getElementById("add_" + id).value.split(";");
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'' + id + '\',\'' + name + '\')">' + name + '</button>';
    string += name + ';';
  });
  new_names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'' + id + '\',\'' + name + '\')">' + name + '</button>';
    string += name + ';';
  });
  document.getElementById("badge_" + id + "_container").innerHTML = html;
  document.getElementById(id).value = string;
  document.getElementById("add_" + id).value = "";
}

function deleteName(id, delete_name){
  names = document.getElementById(id).value.split(";");
  names.pop();
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    if (name != delete_name){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'' + id + '\',\'' + name + '\')">' + name + '</button>';
      string += name + ';';
    }
  });
  document.getElementById("badge_" + id + "_container").innerHTML = html;
  document.getElementById(id).value = string;
  document.getElementById("add_" + id).value = "";
}

function getElementsByIdStartsWith(container, selectorTag, prefix) {
    var items = [];
    var myPosts = document.getElementById(container).getElementsByTagName(selectorTag);
    for (var i = 0; i < myPosts.length; i++) {
        //omitting undefined null check for brevity
        if (myPosts[i].id.lastIndexOf(prefix, 0) === 0) {
            items.push(myPosts[i]);
        }
    }
    return items;
}

function updateTraits(deviceTrait){
  var tratis = {
    "action.devices.types.AC_UNIT": [
          "action.devices.traits.OnOff",
          "action.devices.traits.FanSpeed",
          "action.devices.traits.TemperatureSetting",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.AIRFRESHENER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.AIRPURIFIER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.FanSpeed",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.AWNING": [
          "action.devices.traits.OpenClose",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.BLINDS": [
          "action.devices.traits.OpenClose",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.BOILER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.CAMERA": [
          "action.devices.traits.CameraStream"
    ],
    "action.devices.types.COFFEE_MAKER": [
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.CURTAIN": [
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.DISHWASHER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.StartStop",
          "action.devices.traits.RunCycle",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.DOOR": [
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.DRYER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.StartStop",
          "action.devices.traits.Modes",
          "action.devices.traits.Toggles",
          "action.devices.traits.RunCycle"
    ],
    "action.devices.types.FAN": [
          "action.devices.traits.OnOff",
          "action.devices.traits.FanSpeed",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.FIREPLACE": [
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.GARAGE": [
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.GATE": [
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.HEATER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.TemperatureSetting",
          "action.devices.traits.FanSpeed",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.HOOD": [
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.FanSpeed",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.KETTLE": [
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.LIGHT" : [
          "action.devices.traits.Brightness",
          "action.devices.traits.ColorSetting",
          "action.devices.traits.OnOff"
    ],
    "action.devices.types.LOCK": [
          "action.devices.traits.LockUnlock"
    ],
    "action.devices.types.MICROWAVE": [
          "action.devices.traits.OnOff",
          "action.devices.traits.Timer",
          "action.devices.traits.StartStop",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.MOP": [
          "action.devices.traits.StartStop",
          "action.devices.traits.Toggles",
          "action.devices.traits.Dock",
          "action.devices.traits.Locator",
          "action.devices.traits.OnOff",
          "action.devices.traits.RunCycle",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.OUTLET": [
          "action.devices.traits.OnOff"
    ],
    "action.devices.types.OVEN": [
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.StartStop",
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.PERGOLA": [
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.REFRIGERATOR": [
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.OnOff",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.SECURITYSYSTEM": [
          "action.devices.traits.ArmDisarm",
          "action.devices.traits.StatusReport"
    ],
    "action.devices.types.SHOWER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.Modes",
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.StartStop"
    ],
    "action.devices.types.SHUTTER": [
          "action.devices.traits.OpenClose",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.SPRINKLER": [
          "action.devices.traits.StartStop"
    ],
    "action.devices.types.SWITCH": [
          "action.devices.traits.OnOff"
    ],
    "action.devices.types.THERMOSTAT": [
          "action.devices.traits.TemperatureSetting"
    ],
    "action.devices.types.VACUUM": [
          "action.devices.traits.Dock",
          "action.devices.traits.Locator",
          "action.devices.traits.OnOff",
          "action.devices.traits.RunCycle",
          "action.devices.traits.StartStop",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.VALVE": [
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.WASHER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.StartStop",
          "action.devices.traits.Modes",
          "action.devices.traits.Toggles",
          "action.devices.traits.RunCycle"
    ],
    "action.devices.types.WATERHEATER": [
          "action.devices.traits.OnOff",
          "action.devices.traits.TemperatureControl",
          "action.devices.traits.Toggles",
          "action.devices.traits.Modes"
    ],
    "action.devices.types.WINDOW": [
          "action.devices.traits.LockUnlock",
          "action.devices.traits.OpenClose"
    ],
    "action.devices.types.SCENE": [
          "action.devices.traits.Scene"
    ]
  }

  var traitsList = [
    "action.devices.traits.Toggles",
    "action.devices.traits.ArmDisarm",
    "action.devices.traits.CameraStream",
    "action.devices.traits.ColorSetting",
    "action.devices.traits.FanSpeed",
    "action.devices.traits.LightEffects",
    "action.devices.traits.Modes",
    "action.devices.traits.OnOff",
    "action.devices.traits.OpenClose",
    "action.devices.traits.Scene",
    "action.devices.traits.StartStop",
    "action.devices.traits.TemperatureControl",
    "action.devices.traits.TemperatureSetting",
    "action.devices.traits.Timer",

  ];

  traitsList.forEach(function(trait){
    document.getElementById(trait).style.display = "none";
  });

  var html = "";
  Object(tratis[document.getElementById("type").value]).forEach(function(trait){

        if(deviceTrait.indexOf(trait) >= 0){
          html += '<option selected value="' + trait + '">' + getTraitCoolName(trait) + '</option>';
        } else {
          html += '<option value="' + trait + '">' + getTraitCoolName(trait) + '</option>';
        }
  });
  document.getElementById("trais").innerHTML = html;

  updateTraitsDependencies();
}

function updateTraitsDependencies(){

  //Save traits
  var traits=document.getElementById("trais");
  for (var i = 0; i < traits.options.length; i++) {
    if(document.getElementById(traits.options[i].value)){
     if(traits.options[i].selected ==true){
        document.getElementById(traits.options[i].value).style.display = "block";
      } else {
        document.getElementById(traits.options[i].value).style.display = "none";
      }
    }
  }

  updateThermostatModes([]);
}

function updateThermostatModes(deviceModes){

  var modes = [
    "off",
    "heat",
    "cool",
    "on",
    "heatcool",
    "auto",
    "fan-only",
    "purifier",
    "eco",
    "dry"
  ];


  var html = "";
  Object(modes).forEach(function(mode){

        if(deviceModes.indexOf(mode) >= 0){
          html += '<option selected>' + mode + '</option>';
        } else {
          html += '<option>' + mode + '</option>';
        }
  });
  document.getElementById("availableThermostatModes").innerHTML = html;

}

////////////////////////////////////////
//Toggle Magic
////////////////////////////////////////
function addToggle(){
  //Get lasst JSON
  var availableToggles = [];
  if (document.getElementById("availableToggles").value != "-1"){
    availableToggles = JSON.parse(document.getElementById("availableToggles").value);
  }
  //Create the new toggle JSON
  var newToggle = {
    name: document.getElementById("name_toggle").value,
    names_values: {
      name_synonym: [

      ],
      lang: document.getElementById("languaje_toggle").value
    }
  }

  var synonyms = document.getElementById("synonyms_toggle").value.split(";");
  newToggle.names_values.name_synonym = synonyms;
  //Save the new JSON
  availableToggles.push(newToggle);
  document.getElementById("availableToggles").value = JSON.stringify(availableToggles);
  console.log(newToggle);
  //Create the new HTML card
  var html = "";
  html += composeToggle(document.getElementById("name_toggle").value, document.getElementById("languaje_toggle").value, synonyms);
  document.getElementById("badge_toggles_container").innerHTML += html;

  //Clear form
  document.getElementById("name_toggle").value = "";
  document.getElementById("synonyms_toggle").value = "";
}

function deleteToggle(name){
  var availableToggles = JSON.parse(document.getElementById("availableToggles").value);
  var newToggles = []

  var html = "";
  Object(availableToggles).forEach(function(toggle){
    if (toggle.name != name){
      html += composeToggle(toggle.name, toggle.names_values.lang, toggle.names_values.name_synonym);
      newToggles.push(toggle);
    }
  });

  document.getElementById("availableToggles").value = JSON.stringify(newToggles);
  document.getElementById("badge_toggles_container").innerHTML = html
}

function composeToggle(name, lang, synonyms){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + ' - ' + lang + '</h5>';
        synonyms.forEach(function(word){
          html += '<span class="badge badge-primary" style="margin: 5px;">' + word + '</span>';
        });
        html += '<br><br>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteToggle(\'' + name + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}


////////////////////////////////////////
//Fan Speed Magic
////////////////////////////////////////
function addFanSpeed(){
  //Get lasst JSON
  var availableFanSpeeds = [];
  if (document.getElementById("availableFanSpeeds").value != "-1"){
    availableFanSpeeds = JSON.parse(document.getElementById("availableFanSpeeds").value);
  }
  //Create the new toggle JSON
  var newFanSpeed = {
    speed_name: document.getElementById("name_fan_speed").value,
    speed_values: {
      speed_synonym: [

      ],
      lang: document.getElementById("languaje_fan_speeds").value
    }
  }

  var synonyms = document.getElementById("synonyms_fan_speed").value.split(";");
  newFanSpeed.speed_values.speed_synonym = synonyms;
  //Save the new JSON
  availableFanSpeeds.push(newFanSpeed);
  document.getElementById("availableFanSpeeds").value = JSON.stringify(availableFanSpeeds);
  console.log(newFanSpeed);
  //Create the new HTML card
  var html = "";
  html += composeFanSpeed(document.getElementById("name_fan_speed").value, document.getElementById("languaje_fan_speeds").value, synonyms);
  document.getElementById("badge_fan_speeds_container").innerHTML += html;

  //Clear form
  document.getElementById("name_fan_speed").value = "";
  document.getElementById("synonyms_fan_speed").value = "";
}

function deleteFanSpeed(name){
  var availableFanSpeeds = JSON.parse(document.getElementById("availableFanSpeeds").value);
  var newFanSpeed = []

  console.log(availableFanSpeeds);
  console.log(name);

  var html = "";
  Object(availableFanSpeeds).forEach(function(fanSpeed){
    if (fanSpeed.speed_name != name){
      html += composeFanSpeed(fanSpeed.speed_name, fanSpeed.speed_values.lang, fanSpeed.speed_values.speed_synonym);
      newFanSpeed.push(fanSpeed);
    }
  });

  document.getElementById("availableFanSpeeds").value = JSON.stringify(newFanSpeed);
  document.getElementById("badge_fan_speeds_container").innerHTML = html
}

function composeFanSpeed(name, lang, synonyms){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + ' - ' + lang + '</h5>';
        synonyms.forEach(function(word){
          html += '<span class="badge badge-primary" style="margin: 5px;">' + word + '</span>';
        });
        html += '<br><br>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteFanSpeed(\'' + name + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}

////////////////////////////////////////
//Open Direction Magic
////////////////////////////////////////
function addOpenDirection(){
  names = document.getElementById("openDirection").value.split(";");
  names.pop();
  var new_names = document.getElementById("name_openDirection").value.split(";");
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
    string += name + ';';
  });
  new_names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
    string += name + ';';
  });
  document.getElementById("badge_openDirection_container").innerHTML = html;
  document.getElementById("openDirection").value = string;
  document.getElementById("name_openDirection").value = "";
}

function deleteOpenDirection(delete_name){
  names = document.getElementById("openDirection").value.split(";");
  names.pop();
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    if (name != delete_name){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
      string += name + ';';
    }
  });
  document.getElementById("badge_openDirection_container").innerHTML = html;
  document.getElementById("openDirection").value = string;
}

////////////////////////////////////////
//Arm Levels Magic
////////////////////////////////////////
function addArmLevels(){
  //Get lasst JSON
  var availableArmLevels = [];
  if (document.getElementById("availableArmLevels").value != "-1"){
    availableArmLevels = JSON.parse(document.getElementById("availableArmLevels").value);
  }
  //Create the new toggle JSON
  var newArmLevel = {
    level_name: document.getElementById("name_arm_levels").value,
    level_values: {
      level_synonym: [

      ],
      lang: document.getElementById("languaje_arm_levels").value
    }
  }

  var synonyms = document.getElementById("synonyms_arm_levels").value.split(";");
  newArmLevel.level_values.level_synonym = synonyms;
  //Save the new JSON
  availableArmLevels.push(newArmLevel);
  document.getElementById("availableArmLevels").value = JSON.stringify(availableArmLevels);
  console.log(newArmLevel);
  //Create the new HTML card
  var html = "";
  html += composeArmLevels(document.getElementById("name_arm_levels").value, document.getElementById("languaje_arm_levels").value, synonyms);
  document.getElementById("badge_arm_levels_container").innerHTML += html;

  //Clear form
  document.getElementById("name_arm_levels").value = "";
  document.getElementById("synonyms_arm_levels").value = "";
}

function deleteArmLevels(name){
  var availableArmLevels = JSON.parse(document.getElementById("availableArmLevels").value);
  var newArmLevel = []

  console.log(availableArmLevels);

  var html = "";
  Object(availableArmLevels).forEach(function(armLevel){
    if (armLevel.level_name != name){
      html += composeArmLevels(armLevel.level_name, armLevel.level_values.lang, armLevel.level_values.level_synonym);
      newArmLevel.push(armLevel);
    }
  });

  document.getElementById("availableArmLevels").value = JSON.stringify(newArmLevel);
  document.getElementById("badge_arm_levels_container").innerHTML = html
}

function composeArmLevels(name, lang, synonyms){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + ' - ' + lang + '</h5>';
        synonyms.forEach(function(word){
          html += '<span class="badge badge-primary" style="margin: 5px;">' + word + '</span>';
        });
        html += '<br><br>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteArmLevels(\'' + name + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}

////////////////////////////////////////
//StartStop Magic
////////////////////////////////////////
function addZones(){
  zones = document.getElementById("zones").value.split(";");
  zones.pop();
  var new_zones = document.getElementById("name_zones").value.split(";");
  console.log(zones);
  var html = "";
  var string = "";
  zones.forEach(function(zone){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
    string += zone + ';';
  });
  new_zones.forEach(function(zone){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
    string += zone + ';';
  });
  document.getElementById("badge_zones_container").innerHTML = html;
  document.getElementById("zones").value = string;
  document.getElementById("name_zones").value = "";
}

function deleteZone(delete_zone){
  zones = document.getElementById("zones").value.split(";");
  zones.pop();
  console.log(zones);
  var html = "";
  var string = "";
  zones.forEach(function(zone){
    if (zone != delete_zone){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
      string += zone + ';';
    }
  });
  document.getElementById("badge_zones_container").innerHTML = html;
  document.getElementById("zones").value = string;
}
