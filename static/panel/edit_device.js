device = {}
deviceReference = {}
data = {}
var editor;

function loadEditor(){
  const container = document.getElementById('jsoneditor')

  const options = {
    mode: 'tree',
    modes: ['code', 'tree', 'preview'], // allowed modes
    onError: function (err) {
      alert(err.toString())
    },
    onModeChange: function (newMode, oldMode) {
      console.log('Mode switched from', oldMode, 'to', newMode)
    }
  }

  editor = new JSONEditor(container, options, data)
}

function loadDevices(localDevice, deviceID) {
  var ajaxDeviceReference = new XMLHttpRequest();
  ajaxDeviceReference.addEventListener("load", loadDeviceReference);
  ajaxDeviceReference.open("GET", "/static/deviceReference.json");
  ajaxDeviceReference.send();

  device = localDevice;
  console.log(device);

}

function loadDeviceReference(){
  deviceReference = JSON.parse(this.responseText);

  var ajaxStep = new XMLHttpRequest();
  ajaxStep.addEventListener("load", loadRender);
  ajaxStep.open("GET", "/static/panel/assistant_device/4.html");
  ajaxStep.send();


  //loadDeviceData();
}

function loadRender(){
  document.getElementById('attributes').innerHTML = this.responseText;
  loadDeviceData();
}

function loadDeviceData(){
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
    if(name != ''){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'default_names\',\'' + name + '\')">' + name + '</button>';
      string += name + ',';
    }

  });
  document.getElementById("badge_default_names_container").innerHTML = html;
  document.getElementById("default_names").value = string;

  //Show nick names
  var html = "";
  var string = "";
  Object(device.name.nicknames).forEach(function(name){
    if(name != ''){
      html += '<button type="button" class="btn btn-primary" style="margin: 5px;" title="Click to delete" onclick="deleteName(\'nick_names\',\'' + name + '\')">' + name + '</button>';
      string += name + ',';
    }
  });
  document.getElementById("badge_nick_names_container").innerHTML = html;
  document.getElementById("nick_names").value = string;

  //Show attributes
  if(typeof device.attributes !== 'undefined'){
    //Go over all the attributes of the device
    device.traits.forEach(function(trait){
      attributes = deviceReference['traits'][trait]['attributes'];
      //Go over all the attributes that can have the device
      Object.keys(attributes).forEach(function(attributeKey){
        if (attributes[attributeKey]['type'] == "bool")
          document.getElementById("customSwitch_" + attributeKey).checked = device.attributes[attributeKey];
        else if (attributes[attributeKey]['type'] == "string" || attributes[attributeKey]['type'] == "int" )
          document.getElementById(attributeKey).value = device.attributes[attributeKey];
        else if (attributes[attributeKey]['type'] == "jsoneditor"){
          data = device.attributes[attributeKey];
          loadEditor();
        }
        else if (attributes[attributeKey]['type'] == "array"){
          var list = device.attributes[attributeKey];
          var str = "";
          list.forEach(function(element){
            str += element + ',';
          })

          document.getElementById('name_' + attributeKey).value = str.substring(0, str.length - 1);
        }
        else if (attributes[attributeKey]['type'] == "object" ){
          var content = attributes[attributeKey]['content'];
          Object.keys(content).forEach(function(subAttributeKey){
            if (content[subAttributeKey]['type'] == "bool")
              document.getElementById("customSwitch_" + subAttributeKey).checked = device.attributes[attributeKey][subAttributeKey];
            else if (content[subAttributeKey]['type'] == "string" || content[subAttributeKey]['type'] == "int" )
              document.getElementById(subAttributeKey).value = device.attributes[attributeKey][subAttributeKey];
          });
        }
        else if (attributes[attributeKey]['type'] == "strigifyedObject" ){
          document.getElementById(attributeKey).value = JSON.stringify(device.attributes[attributeKey]);
        }
      });
    });
  }



  if (document.getElementById('availableToggles').value != -1){
    loadToggle();
  }
  if (document.getElementById('foodPresets').value != -1){
    loadFoodPreset();
    addCookingMode();
  }
  if (document.getElementById('availableZones').value != -1){
    addZones();
  }
}

save.addEventListener('click', e => {
  //Compose JSON
  device['name']['name'] = document.getElementById("name").value;
  device['name']['defaultNames'] = names = document.getElementById('default_names').value.split(",");
  device['name']['nicknames'] = names = document.getElementById('nick_names').value.split(",");

  //Go over all the attributes of the device
  device.traits.forEach(function(trait){
    attributes = deviceReference['traits'][trait]['attributes'];
    //Go over all the attributes that can have the device
    Object.keys(attributes).forEach(function(attributeKey){
      if (attributes[attributeKey]['type'] == "bool")
        device.attributes[attributeKey] = document.getElementById("customSwitch_" + attributeKey).checked;
      else if (attributes[attributeKey]['type'] == "string" || attributes[attributeKey]['type'] == "int" )
        device.attributes[attributeKey] = document.getElementById(attributeKey).value;
      else if (attributes[attributeKey]['type'] == "jsoneditor")
        device.attributes[attributeKey] = editor.get();
      else if (attributes[attributeKey]['type'] == "array"){
        var csv = document.getElementById(attributeKey).value.split(',')
        var tmp = []
        csv.forEach(function(element){
          tmp.push(element);
        })
        tmp.pop();
        device.attributes[attributeKey] = tmp;
      }
      else if (attributes[attributeKey]['type'] == "object" ){
        var content = attributes[attributeKey]['content'];
        Object.keys(content).forEach(function(subAttributeKey){
          if (content[subAttributeKey]['type'] == "bool")
            device.attributes[attributeKey][subAttributeKey] = document.getElementById("customSwitch_" + subAttributeKey).checked;
          else if (content[subAttributeKey]['type'] == "string" || content[subAttributeKey]['type'] == "int" )
            device.attributes[attributeKey][subAttributeKey] = document.getElementById(subAttributeKey).value;
        });
      } else if (attributes[attributeKey]['type'] == "strigifyedObject" ){
        console.log('in')
        device.attributes[attributeKey] = JSON.parse(document.getElementById(attributeKey).value);
      }
    });
  });

  console.log(device);

  //Create or update the device

  data = {
    devices: device,
  }

  //Send the data to the API
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    console.log(http.responseText);
  });
  http.open("GET", "/front/device/update/" + JSON.stringify(data));
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
