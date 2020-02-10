function addName(id){
  names = document.getElementById(id).value.split(",");
  names.pop();
  var new_names = document.getElementById("add_" + id).value.split(",");
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'' + id + '\',\'' + name + '\')">' + name + '</button>';
    string += name + ',';
  });
  new_names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'' + id + '\',\'' + name + '\')">' + name + '</button>';
    string += name + ',';
  });
  document.getElementById("badge_" + id + "_container").innerHTML = html;
  document.getElementById(id).value = string;
  document.getElementById("add_" + id).value = "";
}

function deleteName(id, delete_name){
  names = document.getElementById(id).value.split(",");
  names.pop();
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    if (name != delete_name){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'' + id + '\',\'' + name + '\')">' + name + '</button>';
      string += name + ',';
    }
  });
  document.getElementById("badge_" + id + "_container").innerHTML = html;
  document.getElementById(id).value = string;
  document.getElementById("add_" + id).value = "";
}
/*
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
}*/

function updateTraits(deviceTrait){
  console.log(deviceReference);
  var tratis = deviceReference['devices'];

  //Traits that needs configuration
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
//Ok
function addOpenDirection(){
  names = document.getElementById("openDirection").value.split(",");
  names.pop();
  var new_names = document.getElementById("name_openDirection").value.split(",");
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
    string += name + ',';
  });
  new_names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
    string += name + ',';
  });
  document.getElementById("badge_openDirection_container").innerHTML = html;
  document.getElementById("openDirection").value = string;
  document.getElementById("name_openDirection").value = "";
}
//Ok
function deleteOpenDirection(delete_name){
  names = document.getElementById("openDirection").value.split(",");
  names.pop();
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    if (name != delete_name){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteOpenDirection(\'' + name + '\')">' + name + '</button>';
      string += name + ',';
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
