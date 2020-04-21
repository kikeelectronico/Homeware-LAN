
data = {}

function laodDevicesRequest(){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    data = JSON.parse(http.responseText);
    loadCards();
  });
  http.open("GET", "/api/global/get/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

function  loadCards(){
  devices = data['devices'];
  html = '';
  scenesHTML = '';
  Object(devices).forEach(function(device){
    var paragraph = "";
    var color = "ffff00";
    //Get color
    if (data['status'][device.id].color){
      var colorInt = data['status'][device.id].color.spectrumRGB;
      var colorHex = colorInt.toString(16);
      var rest = 6 - colorHex.length;
      color = "";
      for(var i = 0; i < rest; i++){
          color += "0";
      }
      color += colorHex;

    }
    //Get OnOff
    var opacity = "0.4";
    if (data['status'][device.id].on == true || data['status'][device.id].deactivate == false){
      opacity = "1";
    }
    //Online state
    var label = "Offline";
    var label_class = "badge-danger";
    if (data['status'][device.id].online == true){
      label = "Online";
      label_class = "badge-success";
    }
    //Scenes & devices
    if (device.traits[0] == 'action.devices.traits.Scene'){
      scenesHTML += '<div class="card cardDevice" style="margin-bottom: 15px; margin-right: 3%;">';
        scenesHTML += '<div class="colorRectangle" style="background-color:#' + color + '; opacity:' + opacity + '"></div>';
        scenesHTML += '<div class="card-body">';
          scenesHTML += '<div class="grid" style="margin-bottom:10px;">';
            scenesHTML += '<div class="row">';
              scenesHTML += '<div class="col"><h5 class="card-title">' + device.name.nicknames[0] + '</h5></div>';
              scenesHTML += '<div class="col" style="text-align:right;"><span class="badge ' + label_class + '" >' + label + '</span></div>';
            scenesHTML += '</div>';
            scenesHTML += '<div class="row">';
              scenesHTML += '<div class="col">' + paragraph + '</div>';
              scenesHTML += '<div class="col" style="vertical-align:top; text-align:right;"><a href="/devices/edit/' + device.id + '" class="btn btn-primary">Edit</a></div>';
            scenesHTML += '</div>';
          scenesHTML += '</div>';
        scenesHTML += '</div>';
      scenesHTML += '</div>';
    } else {

      paragraph += "<b>MQTT topic:</b> device/" + device.id + "<br>";
      //Get brightness
      if (data['status'][device.id].brightness){
        paragraph += "<b>Brightness:</b> " + data['status'][device.id].brightness + " %<br><br>";
      }
      //Get Modes
      if (data['status'][device.id].thermostatMode){
        paragraph += "<b>Mode:</b> " + data['status'][device.id].thermostatMode + "<br>";
        paragraph += "<b>Ambient:</b> " + data['status'][device.id].thermostatTemperatureAmbient + " ºC <br>";
        paragraph += "<b>Set point:</b> " + data['status'][device.id].thermostatTemperatureSetpoint + " ºC <br> <br>";
        switch (data['status'][device.id].thermostatMode) {
          case "cool":
            color = "69D4FF";
            opacity = "1";
            break;
          case "heat":
            color = "FF0000";
            opacity = "1";
            break;
          case "off":
            color = "AAAAAA";
            opacity = "1";
            break;

        }
      }
      //Get alerts
      var alert = '';


      html += '<div class="card cardDevice" style="margin-bottom: 15px; margin-right: 3%;">';
        html += '<div class="colorRectangle" style="background-color:#' + color + '; opacity:' + opacity + '"></div>';
        html += '<div class="card-body">';
          html += '<div class="grid" style="margin-bottom:10px;">';
            html += '<div class="row">';
              html += '<div class="col"><h5 class="card-title">' + device.name.nicknames[0] + '</h5></div>';
              html += '<div class="col" style="text-align:right;"><span class="badge ' + label_class + '" >' + label + '</span></div>';
            html += '</div>';
            html += '<div class="row">';
              html += '<div class="col">' + paragraph + '</div>';
              html += '<div class="col" style="vertical-align:top; text-align:right;"><a href="/devices/edit/' + device.id + '" class="btn btn-primary">Edit</a> <br><br> <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#modal" style="color:white;" onclick="updateModal(\'' + device.name.nicknames[0] + '\',\'' + device.id + '\')">Status</button>' + alert + '</div>';
            html += '</div>';
          html += '</div>';
        html += '</div>';
      html += '</div>';
    }
  });

  devicesList.innerHTML = html;
  scenesList.innerHTML = scenesHTML;


}

function authorize(id){
  var code = id + data.settings.strings.codeKey;
  var auth = {
    requestManualAuthorization: false,
    value: code
  }
  saveData("token>" + id + ">authorization_code", auth);
}

function saveData(param, value){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    if (http.responseText != 'Bad token')
      console.log(http.responseText);
    else {
      document.getElementById('textMessageAlert').innerHTML = 'An error has happed.';
    }
  });
  http.open("GET", "/api/write/" + param + "/" + JSON.stringify(value) + '/');
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'));
  http.send();
}

function updateModal(title, id){
  var status = data['status'][id]
  console.log(status)

  params = Object.keys(status)
  paragraph = ""
  for(i = 0; i < params.length; i++){
    paragraph += '<b>' + getParamCoolName(params[i]) + ':</b> ' + status[params[i]] + '<br>';
  }


  document.getElementById('statusModalTitle').innerHTML = title;
  document.getElementById('statusModalParagraph').innerHTML = paragraph;

}
