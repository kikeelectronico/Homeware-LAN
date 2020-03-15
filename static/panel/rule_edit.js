data = {}

function laodDevicesRequest(ruleID){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    data = JSON.parse(http.responseText);
    loadRule(data, ruleID);
  });
  http.open("GET", "/api/global/get/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

function loadRule(data, ruleID) {

    if (ruleID != -1){
      var n = ruleID;
      var rule = data['rules'][ruleID];
      var triggerType = "device";
      //Get the vector index
      document.getElementById("n").value = ruleID;

      //Detect the kind of triger (simple or multiple)
      var ruleKeys = Object.keys(rule);
      var amountRules = 1;
      var verified = 0;
      var triggers = [];
      if (ruleKeys.includes("triggers")){
        amountRules = Object.keys(rule.triggers).length;
        triggers = rule.triggers;
        //Show containers
        $('#deviceTriggered').collapse('show');
        document.getElementById('triggerType').value = 'device';
      } else {
        triggers.push(rule.trigger);
      }

      //Read the status for the relations between id and params
      var generalStatus = data['status'];

      //Select the trigger's data
      var devices = {};
      //Get a relation between id and names
      Object(data['devices']).forEach(function(device){
        devices[device.id] = device.name.nicknames[0];
      });
      //Create the list of ids
      var generalStatus = data['status'];
      var selectHTML = '<option>Selecct the trigger...</option>';
      Object.keys(generalStatus).forEach(function(id){
        selectHTML += '<option value="' + id + '">' + devices[id] + '</option>';
      });

      //Create the triggers by device
      triggerId.innerHTML = selectHTML;
      var operator = ['','=','<','>','='];
      var triggerHTML = '';
      Object(triggers).forEach(function(trigger){
        //Device or Device to device triggered
        var value = trigger.value;
        if (String(value).includes('>')){
          var temp = value.split('>');
          value = '<b>' + devices[temp[0]] + '</b>(' + getParamCoolName(temp[1]) + ')';
        }
        if(trigger.id == 'time')
          triggerHTML += composeTimeTrigger(trigger.value);
        else
          triggerHTML += composeTrigger(devices[trigger.id], trigger.id, getParamCoolName(trigger.param), operator[trigger.operator], value)
      });
      badge_triggers_container.innerHTML = triggerHTML;
      document.getElementById("availableTriggers").value = JSON.stringify(triggers);

      //Create the targets
      targetId.innerHTML = selectHTML;
      var targetHTML = '';
      Object(rule.targets).forEach(function(target){
        targetHTML += composeTarget(devices[target.id], target.id, getParamCoolName(target.param), target.value)
      });
      badge_targets_container.innerHTML = targetHTML;
      document.getElementById("availableTargets").value = JSON.stringify(rule.targets);



    } else {  //New rule
        var devices = {};
        //Get a relation between id and names
        Object(data['devices']).forEach(function(device){
          devices[device.id] = device.name.nicknames[0];
        });
        //Create the list items
        var generalStatus = data['status'];
        var selectHTML = '<option>Selecct the trigger...</option>';
        Object.keys(generalStatus).forEach(function(id){
          selectHTML += '<option value="' + id + '">' + devices[id] + '</option>';
        });

        triggerId.innerHTML = selectHTML;
        targetId.innerHTML = selectHTML;
    }

}

triggerId.addEventListener('change', function(){
    var generalStatus = data['status']
    var selectHTML = '';
    Object.keys(generalStatus[document.getElementById("triggerId").value]).forEach(function(status){
      selectHTML += '<option value="' + status + '">' + getParamCoolName(status) + '</option>';
    });

    triggerParam.innerHTML = selectHTML;
});

targetId.addEventListener('change', function(){
    var generalStatus = data['status']
    var selectHTML = '';
    Object.keys(generalStatus[document.getElementById("targetId").value]).forEach(function(status){
      selectHTML += '<option value="' + status + '">' + getParamCoolName(status) + '</option>';
    });

    targetParam.innerHTML = selectHTML;

});

save.addEventListener('click', e => {
  var rule = {};
  //Analise the value
  var value = document.getElementById("triggerValue").value;
  var num = ["0","1","2","3","4","5","6","7","8","9"];
  if (value == "true"){
    value = true;
  } else if (value == "false") {
    value = false;
  } else if (num.indexOf(value[0]) >= 0) {
    value = parseInt(value);
  }
  //Compose JSON
  rule = {
    triggers: [],
    targets: []
  }
  //Get triggers JSON
  if (document.getElementById("availableTriggers").value != "-1"){
    rule.triggers = JSON.parse(document.getElementById("availableTriggers").value);
  }

  //Get targets JSON
  if (document.getElementById("availableTargets").value != "-1"){
    rule.targets = JSON.parse(document.getElementById("availableTargets").value);
  }

  console.log(rule);
  //Save the data in the database
  var n = document.getElementById("n").value;
  outgoingData = {
    "id": n,
    "rule": rule
  }
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    //Make alert show up
    $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>Success!</b> The rule has been saved correctly.</div>');
    $('#savedAlert').alert()
    setTimeout(function() {
       $("#savedAlert").remove();
     }, 5000);
  });
  segment = 'update'
  if (n == -1)
    segment = 'create'
  http.open("POST", "/api/rules/" + segment + "/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(outgoingData));


});

add_triggers_button.addEventListener('click', e => {
  //Get lasst JSON
  var availableTriggers = [];
  if (document.getElementById("availableTriggers").value != "-1"){
    availableTriggers = JSON.parse(document.getElementById("availableTriggers").value);
  }
  //Create the new toggle JSON
  var value = document.getElementById("triggerValue").value;
  var num = ["0","1","2","3","4","5","6","7","8","9"];
  if (value == "true"){
    value = true;
  } else if (value == "false") {
    value = false;
  } else if (num.indexOf(value[0]) >= 0) {
    value = parseInt(value);
  }
  var newTrigger = {
    id: document.getElementById("triggerId").value,
    param: document.getElementById("triggerParam").value,
    operator: document.getElementById("triggerOperator").value,
    value: value
  }

  availableTriggers.push(newTrigger);
  document.getElementById("availableTriggers").value = JSON.stringify(availableTriggers);
  console.log(availableTriggers);
  //Create the new HTML card
  var html = "";
  var devices = {};
  //Get a relation between id and names
  Object(data['devices']).forEach(function(device){
    devices[device.id] = device.name.nicknames[0];
  });
  var operator = ['','=','<','>','='];
  html += composeTrigger(devices[document.getElementById("triggerId").value], document.getElementById("triggerId").value, getParamCoolName(document.getElementById("triggerParam").value), operator[document.getElementById("triggerOperator").value], document.getElementById("triggerValue").value);
  document.getElementById("badge_triggers_container").innerHTML += html;
  //Clear form
  document.getElementById("triggerValue").value = "";
});

add_time_triggers_button.addEventListener('click', e => {
  //Get lasst JSON
  var availableTriggers = [];
  if (document.getElementById("availableTriggers").value != "-1"){
    availableTriggers = JSON.parse(document.getElementById("availableTriggers").value);
  }
  //Create the new JSON
  var time = document.getElementById("hour").value + ':' + document.getElementById("minute").value + ':';
  //Save week days
  var weekDays = document.getElementById("weekDays");
  for (var i = 0; i < 7; i++) {
      if(document.getElementById("weekDay" + i).checked == true){
        time += String(i);
      }
  }
  var newTrigger = {
    id: "time",
    operator: "4",
    param: "time",
    value: time
  }

  availableTriggers.push(newTrigger);
  document.getElementById("availableTriggers").value = JSON.stringify(availableTriggers);
  console.log(availableTriggers);
  //Create the new HTML card
  var html = "";

  var devices = {};
  //Get a relation between id and names
  Object(data['devices']).forEach(function(device){
    devices[device.id] = device.name.nicknames[0];
  });
  html += composeTimeTrigger(time);
  document.getElementById("badge_triggers_container").innerHTML += html;
  //Clear form
  document.getElementById("hour").value = 9
  document.getElementById("minute").value = 25;

});

add_targets_button.addEventListener('click', e => {
  //Get lasst JSON
  var availableTargets = [];
  if (document.getElementById("availableTargets").value != "-1"){
    availableTargets = JSON.parse(document.getElementById("availableTargets").value);
  }
  //Create the new toggle JSON
  var value = document.getElementById("targetValue").value;
  var num = ["0","1","2","3","4","5","6","7","8","9"];
  if (value == "true"){
    value = true;
  } else if (value == "false") {
    value = false;
  } else if (num.indexOf(value[0]) >= 0) {
    value = parseInt(value);
  }
  var newTarget = {
    id: document.getElementById("targetId").value,
    param: document.getElementById("targetParam").value,
    value: value
  }

  availableTargets.push(newTarget);
  document.getElementById("availableTargets").value = JSON.stringify(availableTargets);
  console.log(availableTargets);
  //Create the new HTML card
  var html = "";
  var devices = {};
  //Get a relation between id and names
  Object(data['devices']).forEach(function(device){
    devices[device.id] = device.name.nicknames[0];
  });
  html += composeTarget(devices[document.getElementById("targetId").value], document.getElementById("targetId").value, getParamCoolName(document.getElementById("targetParam").value), document.getElementById("targetValue").value);
  document.getElementById("badge_targets_container").innerHTML += html;
  //Clear form
  document.getElementById("targetValue").value = "";

});

deleteRule.addEventListener('click', e => {

  if (confirm("Do you want to delete the rule?")){
    var n = document.getElementById("n").value;
    var html = "";

    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
      window.location.href = "/rules/";
    });
    http.open("GET", "/api/rules/delete/" + n + "/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();

  } else {
    //Make alert show up
     $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>OK</b> The rule hasn\'t been deleted. Be careful!</div>');
     $('#savedAlert').alert()
     setTimeout(function() {
        $("#savedAlert").remove();
      }, 5000);
  }


});


window.onload = function() {
  loadApiTime();
  setInterval(loadApiTime, 30000);
};

function loadApiTime(){
    apiClockURL = '/clock';

    if(apiClockURL){
      var clock = new XMLHttpRequest();
      clock.addEventListener('load', showApiClock);
      clock.open('GET', apiClockURL);
      clock.send();
    } else {
      document.getElementById('apiClock').innerHTML = "See here your API's clock. Configure the URL from Settings."
    }


}

function showApiClock(){
  document.getElementById('apiClock').innerHTML =  "Homeware's API time " + this.responseText;
}

////////////////////////////////////////
//Triggers & targets Magic
////////////////////////////////////////

function deleteTrigger(id, param){
  var availableTriggers = JSON.parse(document.getElementById("availableTriggers").value);
  var newTriggers = []

  document.getElementById('trigger_' + id + '_' + param).remove();

  Object(availableTriggers).forEach(function(trigger){
    if (trigger.id != id && trigger.param != param){
      newTriggers.push(trigger);
    }
  });

  document.getElementById("availableTriggers").value = JSON.stringify(newTriggers);
}

function composeTrigger(name, id, param, operator, value){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;" id="trigger_' + id + '_' + param + '">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + '</h5>';
        html += '<p>' + param + ' ' + operator + ' ' + value + '</p>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteTrigger(\'' + id + '\',\'' + param + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}

function deleteTimeTrigger(time){
  var availableTriggers = JSON.parse(document.getElementById("availableTriggers").value);
  var newTriggers = []

  document.getElementById('trigger_' + time).remove();

  Object(availableTriggers).forEach(function(trigger){
    if (trigger.value != time){
      newTriggers.push(trigger);
    }
  });

  document.getElementById("availableTriggers").value = JSON.stringify(newTriggers);
}

function composeTimeTrigger(time){
  var timeSplited = time.split(':');
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;" id="trigger_' + time  + '">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + timeSplited[0] + ':' + timeSplited[1] + '</h5>';
        html += '<p>';
        var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for(var i = 0; i < 7; i++){
          if (timeSplited[2].includes(i))
            html += week[i] + ' ';
        }
        html += '</p>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteTimeTrigger(\'' + time + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}

function deleteTarget(id, param){
  var availableTargets = JSON.parse(document.getElementById("availableTargets").value);
  var newTargets = []

  document.getElementById('target_' + id + '_' + param).remove();

  Object(availableTargets).forEach(function(target){
    if (target.id != id && target.param != param){
      newTargets.push(target);
    }
  });

  document.getElementById("availableTargets").value = JSON.stringify(newTargets);
}

function composeTarget(name, id, param, value){
  var html = "";
  html += '<div class="col-sm-6" style="margin-top: 10px;" id="target_' + id + '_' + param + '">';
    html += '<div class="card">';
      html += '<div class="card-body">';
        html += '<h5 class="card-title">' + name + '</h5>';
        html += '<p>' + param + ' = ' + value + '</p>';
        html += '<button type="button" class="btn btn-danger" onclick="deleteTarget(\'' + id + '\',\'' + param + '\')">Delete</button>';
      html += '</div>';
    html += '</div>';
  html += '</div>';

  return html;
}
