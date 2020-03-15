////////////////////////////////////////
//Name Magic
////////////////////////////////////////

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

////////////////////////////////////////
//Traits Magic
////////////////////////////////////////

function updateTraits(deviceTrait){

  var tratis = deviceReference['devices'];

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


}

function updateThermostatModes(){

  deviceModes = device.attributes.availableThermostatModes;

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

function updateCookModes(){

  var modes = [
    'UNKNOWN_COOKING_MODE',
    'BAKE',
    'BEAT',
    'BLEND',
    'BOIL',
    'BREW',
    'BROIL',
    'CONVECTION_BAKE',
    'COOK',
    'DEFROST',
    'DEHYDRATE',
    'FERMENT',
    'FRY',
    'KNEAD',
    'MICROWAVE',
    'PRESSURE_COOK',
    'PUREE',
    'ROAST',
    'SAUTE',
    'SLOW_COOK',
    'SOUS_VIDE',
    'STEAM',
    'STEW',
    'WARM',
    'WHIP'
  ];


  var html = "";

      console.log(device.attributes.supportedCookingModes);
  Object(modes).forEach(function(mode){
        if(device.attributes.supportedCookingModes.indexOf(mode) >= 0){
          html += '<option selected>' + mode + '</option>';
        } else {
          html += '<option>' + mode + '</option>';
        }
  });
  document.getElementById("supportedCookingModes").innerHTML = html;

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
    name_values: {
      name_synonym: [

      ],
      lang: document.getElementById("languaje_toggle").value
    }
  }

  var synonyms = document.getElementById("synonyms_toggle").value.split(",");
  newToggle.name_values.name_synonym = synonyms;
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

function loadToggle(){
  //Get lasst JSON
  var availableToggles = [];
  if (document.getElementById("availableToggles").value != "-1"){
    availableToggles = JSON.parse(document.getElementById("availableToggles").value);

    //Create the new HTML card
    var html = "";
    availableToggles.forEach(function(toggle){
      console.log(toggle)
      html += composeToggle(toggle['name'], toggle['name_values']['lang'], toggle['name_values']['name_synonym']);
    });


    document.getElementById("badge_toggles_container").innerHTML += html;

    //Clear form
    document.getElementById("name_toggle").value = "";
    document.getElementById("synonyms_toggle").value = "";
  }


}

function deleteToggle(name){
  var availableToggles = JSON.parse(document.getElementById("availableToggles").value);
  var newToggles = []

  var html = "";
  Object(availableToggles).forEach(function(toggle){
    if (toggle.name != name){
      html += composeToggle(toggle.name, toggle.name_values.lang, toggle.name_values.name_synonym);
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

  var synonyms = document.getElementById("synonyms_fan_speed").value.split(",");
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

  var synonyms = document.getElementById("synonyms_arm_levels").value.split(",");
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
  zones = document.getElementById("availableZones").value.split(",");
  zones.pop();
  var new_zones = document.getElementById("name_availableZones").value.split(",");
  var html = "";
  var string = "";
  zones.forEach(function(zone){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
    string += zone + ',';
  });
  new_zones.forEach(function(zone){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
    string += zone + ',';
  });
  document.getElementById("badge_zones_container").innerHTML = html;
  document.getElementById("availableZones").value = string;
  document.getElementById("name_availableZones").value = "";
}

function deleteZone(delete_zone){
  zones = document.getElementById("availableZones").value.split(",");
  zones.pop();
  console.log(zones);
  var html = "";
  var string = "";
  zones.forEach(function(zone){
    if (zone != delete_zone){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteZone(\'' + zone + '\')">' + zone + '</button>';
      string += zone + ',';
    }
  });
  document.getElementById("badge_zones_container").innerHTML = html;
  document.getElementById("availableZones").value = string;
}

////////////////////////////////////////
//Fill Levels Magic
////////////////////////////////////////
function addFillLevels(){
  //Get lasst JSON
  var availableFillLevels = [];
  if (document.getElementById("availableFillLevels").value != "-1"){
    availableFillLevels = JSON.parse(document.getElementById("availableFillLevels").value);
  }
  //Create the new toggle JSON
  var newFillLevel = {
    level_name: document.getElementById("name_fill_levels").value,
    level_values: {
      level_synonym: [

      ],
      lang: document.getElementById("languaje_fill_levels").value
    },
    ordered: false
  }

  var synonyms = document.getElementById("synonyms_fill_levels").value.split(",");
  newFillLevel.level_values.level_synonym = synonyms;
  //Save the new JSON
  availableFillLevels.push(newFillLevel);
  document.getElementById("availableFillLevels").value = JSON.stringify(availableFillLevels);
  console.log(newFillLevel);
  //Create the new HTML card
  var html = "";
  html += composeFillLevels(document.getElementById("name_fill_levels").value, document.getElementById("languaje_fill_levels").value, synonyms);
  document.getElementById("badge_fill_levels_container").innerHTML += html;

  //Clear form
  document.getElementById("name_fill_levels").value = "";
  document.getElementById("synonyms_fill_levels").value = "";
}

function deleteFillLevels(name){
  var availableFillLevels = JSON.parse(document.getElementById("availableFillLevels").value);
  var newFillLevel = []

  console.log(availableFillLevels);

  var html = "";
  Object(availableFillLevels).forEach(function(fillLevel){
    if (fillLevel.level_name != name){
      html += composeFillLevels(fillLevel.level_name, fillLevel.level_values.lang, fillLevel.level_values.level_synonym);
      newFillLevel.push(fillLevel);
    }
  });

  document.getElementById("availableFillLevels").value = JSON.stringify(newFillLevel);
  document.getElementById("badge_fill_levels_container").innerHTML = html
}

function composeFillLevels(name, lang, synonyms){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + ' - ' + lang + '</h5>';
        synonyms.forEach(function(word){
          html += '<span class="badge badge-primary" style="margin: 5px;">' + word + '</span>';
        });
        html += '<br><br>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteFillLevels(\'' + name + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}

////////////////////////////////////////
//Cooking Modes Magic
////////////////////////////////////////
/*
function addCookingMode(){
  names = document.getElementById("supportedCookingModes").value.split(",");
  names.pop();
  var new_names = document.getElementById("name_supportedCookingModes").value.split(",");
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteCookingModes(\'' + name + '\')">' + name + '</button>';
    string += name + ',';
  });
  new_names.forEach(function(name){
    html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteCookingModes(\'' + name + '\')">' + name + '</button>';
    string += name + ',';
  });
  document.getElementById("badge_supportedCookingModes_container").innerHTML = html;
  document.getElementById("supportedCookingModes").value = string;
  document.getElementById("name_supportedCookingModes").value = "";
}

function deleteCookingModes(delete_name){
  names = document.getElementById("supportedCookingModes").value.split(",");
  names.pop();
  console.log(names);
  var html = "";
  var string = "";
  names.forEach(function(name){
    if (name != delete_name){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteCookingModes(\'' + name + '\')">' + name + '</button>';
      string += name + ',';
    }
  });
  document.getElementById("badge_supportedCookingModes_container").innerHTML = html;
  document.getElementById("supportedCookingModes").value = string;
}
*/
////////////////////////////////////////
//Food Presets Magic
////////////////////////////////////////
function addFoodPreset(){
  //Get lasst JSON
  var availableFoodPresets = [];
  if (document.getElementById("foodPresets").value != "-1"){
    availableFoodPresets = JSON.parse(document.getElementById("foodPresets").value);
  }
  //Create the new toggle JSON
  var newFoodPreset = {
    food_preset_name: document.getElementById("name_food_presets").value,
    supported_units: document.getElementById("units_food_presets").value,
    food_synonyms: {
      synonym: [

      ],
      lang: document.getElementById("languaje_food_presets").value
    }
  }

  var synonyms = document.getElementById("synonyms_food_presets").value.split(",");
  newFoodPreset.food_synonyms.synonym = synonyms;
  //Save the new JSON
  availableFoodPresets.push(newFoodPreset);
  document.getElementById("foodPresets").value = JSON.stringify(availableFoodPresets);
  console.log(newFoodPreset);
  //Create the new HTML card
  var html = "";
  html += composeFoodPreset(document.getElementById("name_food_presets").value, document.getElementById("languaje_food_presets").value, synonyms);
  document.getElementById("badge_food_presets_container").innerHTML += html;

  //Clear form
  document.getElementById("name_food_presets").value = "";
  document.getElementById("synonyms_food_presets").value = "";
}

function loadFoodPreset(){
  var availableFoodPreset = JSON.parse(document.getElementById("foodPresets").value);

  var html = "";
  Object(availableFoodPreset).forEach(function(foodPreset){
      html += composeFoodPreset(foodPreset.food_preset_name, foodPreset.food_synonyms.lang, foodPreset.food_synonyms.synonym);
  });

  document.getElementById("badge_food_presets_container").innerHTML = html
}

function deleteFoodPreset(name){
  var availableFoodPreset = JSON.parse(document.getElementById("foodPresets").value);
  var newFoodPreset = []

  console.log(availableFoodPreset);
  console.log(name);

  var html = "";
  Object(availableFoodPreset).forEach(function(foodPreset){
    if (foodPreset.food_preset_name != name){
      html += composeFoodPreset(foodPreset.food_preset_name, foodPreset.food_synonyms.lang, foodPreset.food_synonyms.synonym);
      newFoodPreset.push(foodPreset);
    }
  });

  document.getElementById("foodPresets").value = JSON.stringify(newFoodPreset);
  document.getElementById("badge_food_presets_container").innerHTML = html
}

function composeFoodPreset(name, lang, synonyms){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + ' - ' + lang + '</h5>';
        synonyms.forEach(function(word){
          html += '<span class="badge badge-primary" style="margin: 5px;">' + word + '</span>';
        });
        html += '<br><br>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteFoodPreset(\'' + name + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}
