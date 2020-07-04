task = {
  "title": "",
  "description": "",
  "triggers": {},
  "target": []
}
devices = {}
params = {}
active_parent_id = "0"
id = -1 // Task id
target_type = ""

/*  lOAD DATA FROM DATABASE  */

//Get the task data from the database
function laodTasksRequest(taskID){

  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    data = JSON.parse(http.responseText);

    devices = data.devices;
    params = data.status;
    id = taskID;
    if (taskID != -1){
      task = data.tasks[taskID];
      create_task = false;
      loadTask();
    }

    // Devices on selector
    var html = "<option>Select a device</option>";
    devices.forEach((device, i) => {
      html += '<option value="' + device.id +'">' + device.name.nicknames[0] +'</option>';
    });
    document.getElementById('device_target').innerHTML = html;

  });
  http.open("GET", "/api/global/get/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

// Render the data received
function loadTask(){

  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('triggersCard').innerHTML = operationRenderer(task.triggers.trigger, "trigger");
  document.getElementById('cards_targets_container').innerHTML = targetRenderer();

  loadApiTime();
}

/*  RENDER THE TRIGGERS, LOGIC AND TARGETS  */

// Decides what kind of render is needed
function operationRenderer(operation, id){
  if (operation.type == 'd2b' || operation.type == 'd2i' || operation.type == 'd2l' || operation.type == 'd2s')
    return d2Renderer(operation.operation, id);
  else if (operation.type == 'd2d')
    return d2dRenderer(operation.operation, id);
  else if (operation.type == 'time')
    return timeRenderer(operation.operation, id);
  else if (operation.type == 'or')
    return orRenderer(operation.operation, id);
  else if (operation.type == 'and')
    return andRenderer(operation.operation, id);
}

// Device to device render
function d2dRenderer(operation, id){
  op = operation.split(':')
  var html = '<div class="card" style="margin-top:10px;">\
                <div class="card-body">\
                  <b>' + getDeviceName(op[0]) + '</b>(' + getParamCoolName(op[1]) + ') ' + op[2] + ' ' +'<b>' + getDeviceName(op[3]) + '</b>(' + getParamCoolName(op[4]) + ')<a onclick="deleteTriggerById(\'' + id + '\')"><span class="badge badge-danger" style="float:right;">Delete</span></a><br>\
                </div>\
              </div>';
  return html
}

// Device to not device render
function d2Renderer(operation, id){
  op = operation.split(':')
  var html = '<div class="card" style="margin-top:10px;">\
                <div class="card-body">\
                  <b>' + getDeviceName(op[0]) + '</b>(' + getParamCoolName(op[1]) + ') ' + op[2] + ' ' + op[3] + '<a onclick="deleteTriggerById(\'' + id + '\')"><span class="badge badge-danger" style="float:right;">Delete</span></a><br>\
                </div>\
              </div>';
  return html
}

// Time render
function timeRenderer(operation, id){
  op = operation.split(':')
  var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var html = '<div class="card" style="margin-top:10px;">\
                <div class="card-body">\
                  ' + putZero(op[0]) + ':' + putZero(op[1]) + ' -  ' + week[op[2]] +'<a onclick="deleteTriggerById(\'' + id + '\')"><span class="badge badge-danger" style="float:right;">Delete</span></a>\
                </div>\
              </div>';
  return html
}

// Logic or render
function orRenderer(operation, id){
  var html = '<div class="card" style="background-color:rgba(5,5,5,0.05); margin-top:10px;">\
                <div class="card-body" id="">\
                  <h4>Or</h4>';
  for (var i = 0; i < operation.length; i++){
    html += operationRenderer(task.triggers[operation[i]], operation[i]);
  }
  html += '<br><button type="button" class="btn btn-primary" onclick="launchD2Assitant(\'' + id + '\')">+</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'and\',\'' + id + '\')">AND</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'or\',\'' + id + '\')">OR</button>\
            <a onclick="deleteTriggerById(\'' + id + '\')"><span class="badge badge-danger" style="float:right;">Delete</span></a>\
            </div></div>';
  return html;
}

// Logic and render
function andRenderer(operation, id){
  var html = '<div class="card" style="background-color:rgba(5,5,5,0.05); margin-top:10px;">\
                <div class="card-body" id="">\
                  <h4>And</h4>';
  for (var i = 0; i < operation.length; i++){
    html += operationRenderer(task.triggers[operation[i]], operation[i]);
  }
  html += '<br><button type="button" class="btn btn-primary" onclick="launchD2Assitant(\'' + id + '\')">+</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'and\',\'' + id + '\')">AND</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'or\',\'' + id + '\')">OR</button>\
            <a onclick="deleteTriggerById(\'' + id + '\')"><span class="badge badge-danger" style="float:right;">Delete</span></a>\
            </div></div>';
  return html;
}

// Render the targets
function targetRenderer(){
  var html = "";
  task.target.forEach((target, i) => {
    var device = target.device;
    var param = target.param;
    var value = target.value;
    if ( target.param == 'color'){
      value = value.spectrumRGB.toString(16)
    }
    html += '<div class="card" style="width:42%; margin-left:5%;margin-top:10px;">\
              <div class="card-body">\
                <b>'+ getDeviceName(device) + '</b>(' + param + ') = ' + value +'\
                <a onclick="deleteTargetById(\'' + device + param + value + '\')"><span class="badge badge-danger" style="float:right;">Delete</span></a>\
              </div>\
            </div>';
  });

  return html
}

// Get devie name
function getDeviceName(id){
  for (i = 0; i < devices.length; i++){
    device = devices[i];
    if (device.id == id){
      return device.name.nicknames[0]
    }
  }
  return id
}

/*  ADD NEW LOGIC  */

function add(type, parent){
  // If it is the first trigger its id is 'trigger' and the its parent is 'triggers'
  if (parent == "triggers"){
    var new_id = "trigger";
    task.triggers[new_id] = {
      "type": type,
      "parent": "triggers",
      "operation": []
    }
  } else {
    var new_id = Date.now();
    task.triggers[new_id] = {
      "type": type,
      "parent": parent,
      "operation": []
    };
    //Add the new operation into its parents operation list
    task.triggers[parent].operation.push(new_id);
  }

  loadTask()

}

/*  DELETE TRIGGER OR LOGIC  */

function deleteTriggerById(id){
  var parent = task.triggers[id].parent;

  if (parent == "triggers") {
    task.triggers = {};
    document.getElementById('triggersCard').innerHTML = '<br><button type="button" class="btn btn-primary" onclick="launchD2Assitant(\'triggers\')">+</button>\
              <button type="button" class="btn btn-primary" onclick="add(\'and\',\'triggers\')">AND</button>\
              <button type="button" class="btn btn-primary" onclick="add(\'or\',\'triggers\')">OR</button>';
  } else {
    var index = task.triggers[parent].operation.indexOf(id);
    task.triggers[parent].operation.splice(index,1);
    delete task.triggers[id];
    loadTask();
  }
}

/*  DELETE TARGET  */

function deleteTargetById(id){
  var new_targets = []
  task.target.forEach(target => {
    var target_id = target.device + target.param + target.value
    if ( target.param == 'color'){
      target_id = target.device + target.param +  target.value.spectrumRGB.toString(16)
    }
    if (id != target_id){
      new_targets.push(target)
    }
  });
  task.target = new_targets;
  loadTask();
}

/* ASSISTANT FOR ADDING NEW DEVICES AND TIME TRIGGERS  */

// Launch the assistant
function launchD2Assitant(id){
  document.getElementById('d2AssistantBody').innerHTML = '<button type="button" class="trigger_assistant_button" onclick="timeAssistant(\'' + id + '\')"><img src="/static/images/clock.png"/ title="Time trigger"></button>\
                                                          <button type="button" class="trigger_assistant_button" onclick="d2Assistant(\'' + id + '\')"><img src="/static/images/bulb.png"/ title="Device trigger"></button>';

  document.getElementById('d2AssistantFooter').innerHTML = '';
  $('#d2Assitant').modal('show')
}

// If the user select a time trigger
function timeAssistant(parent){
  active_parent_id = parent;

  // Hour
  html = ' <div class="form-group">\
              <label for="h">Hour</label>\
              <input type="number" class="form-control" id="h" max="23" min="0">\
            </div>';

  // Minute
  html += ' <div class="form-group">\
              <label for="m">Minute</label>\
              <input type="number" class="form-control" id="m" max="59" min="0">\
            </div>';

  // Week day
  html += ' <div class="form-group">\
              <label for="w">Week day</label>\
              <select class="form-control" id="w">\
                <option value="0">Sunday</option>\
                <option value="1">Monday</option>\
                <option value="2">Tuesday</option>\
                <option value="3">Wednesday</option>\
                <option value="4">Thursday</option>\
                <option value="5">Friday</option>\
                <option value="6">Saturday</option>\
              </select>\
            </div>';

  html += '<button type="button" class="btn btn-primary" style="float:right" onclick="createTimeTrigger()">Create</button>';


  document.getElementById('d2AssistantBody').innerHTML = html
}

// If the user select a device assistant
function d2Assistant(id){
  active_parent_id = id;

  // Device A
  html = ' <div class="form-group">\
              <label for="device_a">Device</label>\
              <select class="form-control" id="device_a" onChange="device_selected(\'a\')">\
                <option value="select">Select a device</option>';
  devices.forEach((device, i) => {
    html += '<option value="' + device.id +'">' + device.name.nicknames[0] +'</option>';
  });

  html += '   </select>\
            </div>';

  // Param A
  html += ' <div class="form-group">\
              <label for="param_a">Param</label>\
              <select class="form-control" id="param_a"  onChange="param_selected(\'a\')">';

  html += '   </select>\
            </div>';

  // Operator
  html += ' <div class="form-group">\
              <label for="operator">Operator</label>\
              <select class="form-control" id="operator">\
                <option>=</option>\
                <option><</option>\
                <option>></option>\
                <option><=</option>\
                <option>>=</option>\
              </select>\
            </div>';


  document.getElementById('d2AssistantBody').innerHTML = html
}

// If is a device to device trigger
function d2dAssistant(){
  // Device B
  html = ' <div class="form-group">\
              <label for="device_b">Device</label>\
              <select class="form-control" id="device_b" onChange="device_selected(\'b\')">\
                <option value="select">Select a device</option>';
  devices.forEach((device, i) => {
    html += '<option value="' + device.id +'">' + device.name.nicknames[0] +'</option>';
  });

  html += '   </select>\
            </div>';

  // Param B
  html += ' <div class="form-group">\
              <label for="param_b">Param</label>\
              <select class="form-control" id="param_b">';

  html += '   </select>\
            </div>';

  html += ' <br>\
            <button type="button" class="btn btn-primary" style="float:right" onclick="createTrigger(\'d2d\')">Create</button>';

  document.getElementById('d2AssistantFooter').innerHTML = html
}

// Create the trigger and save into the data var
function createTrigger(type){
  var selector = document.getElementById("device_a");
  device_a = selector.options[selector.selectedIndex].value;
  var selector = document.getElementById("param_a");
  param_a = selector.options[selector.selectedIndex].value;
  var selector = document.getElementById("operator");
  operator = selector.options[selector.selectedIndex].value;

  var operation = ""
  if (type == 'd2i'){
    value = document.getElementById('value').value;
    operation = device_a + ':' + param_a + ':' + operator + ':' + value;
  } else if (type == 'd2b' || type == 'd2l'){
    var selector = document.getElementById("value");
    value = selector.options[selector.selectedIndex].value;
    operation = device_a + ':' + param_a + ':' + operator + ':' + value;
  } else if (type == 'd2d'){
    var selector = document.getElementById("device_b");
    device_b = selector.options[selector.selectedIndex].value;
    var selector = document.getElementById("param_b");
    param_b = selector.options[selector.selectedIndex].value;
    operation = device_a + ':' + param_a + ':' + operator + ':' + device_b + ':' + param_b;
  }

  if(active_parent_id != "triggers"){
    var new_id = Date.now();
    task.triggers[new_id] = {
      "type": type,
      "parent": active_parent_id,
      "operation": operation
    }
    task.triggers[active_parent_id].operation.push(new_id.toString())
  } else {
    task['triggers']['trigger'] = {
      "type": type,
      "parent": "triggers",
      "operation": operation
    };
  }

  loadTask()
  $('#d2Assitant').modal('hide')
}

// Create a time trigger
function createTimeTrigger(type){
  var selector = document.getElementById("w");
  w = selector.options[selector.selectedIndex].value;
  h = document.getElementById('h').value;
  m = document.getElementById('m').value;

  operation = h.toString() + ':' + m.toString() + ':' + w.toString();

  if(active_parent_id != "triggers"){
    var new_id = Date.now();
    task.triggers[new_id] = {
      "type": 'time',
      "parent": active_parent_id,
      "operation": operation
    }
    task.triggers[active_parent_id].operation.push(new_id.toString())
  } else {
    task['triggers']['trigger'] = {
      "type": 'time',
      "parent": "triggers",
      "operation": operation
    };
  }

  loadTask()
  $('#d2Assitant').modal('hide')
}


/* EVENTS */

// On select a device, update dependencies
function device_selected(order) {
  //Params
  var selector = document.getElementById("device_"+order);
  var device = selector.options[selector.selectedIndex].value;

  html = '<option value="select">Select a param</option>';
  Object.keys(params[device]).forEach((param, i) => {
    html += '<option value="' + param +'">' + getParamCoolName(param) +'</option>';
  });

  document.getElementById("param_"+order).innerHTML = html;

}

// On select a param, update dependencies
function param_selected(order) {
  var selector = document.getElementById("param_"+order);
  var param = selector.options[selector.selectedIndex].value;

  //Values
  values = getValuesByParam(param);


  if (order == 'a' || order == 'b'){
    // is the param supported?
    if(values == param){
      document.getElementById('d2AssistantFooter').innerHTML = "This param is not supported. You must use the json editor for your task and do it manually."
    } else if (param == 'color') {
      document.getElementById('d2AssistantFooter').innerHTML = "This param is not supported."
    } else {

      if (values.type == 'd2i'){
        html = '<div class="form-group" style="width:100%;">\
                  <label for="value">A value</label>\
                  <input type="number" class="form-control" id="value">\
                </div>';
      } else if (values.type == 'd2b' || values.type == 'd2l'){
        html = ' <div class="form-group" style="width:100%;">\
                    <label for="value">Value</label>\
                    <select class="form-control" id="value">';
        values.select.forEach((value, i) => {
          html += '<option>' + value +'</option>';
        });

        html += '   </select>\
                  </div>';
      }

      html += 'or\
                <button type="button" class="btn btn-primary" onclick="d2dAssistant()">A device</button>\
                <br>\
                <button type="button" class="btn btn-primary" style="float:right" onclick="createTrigger(\'' + values.type + '\')">Create</button>';



      document.getElementById('d2AssistantFooter').innerHTML = html
    }
  } else if (order == 'target'){
    // is the param supported?
    if(values == param){
      document.getElementById('d2AssistantBody').innerHTML = "This param is not supported. You must use the json editor for your task and do it manually.";
      document.getElementById('d2AssistantFooter').innerHTML = "";
      $('#d2Assitant').modal('show')
    } else {

      target_type = values.type
      if (values.type == 'd2i'){
        html = '<div class="form-group" style="width:100%;">\
                  <label for="value">Target value</label>\
                  <input type="number" class="form-control" id="value_target">\
                </div>';
      } else if (values.type == 'd2b' || values.type == 'd2l'){
        html = ' <div class="form-group" style="width:100%;">\
                    <label for="value">Target value</label>\
                    <select class="form-control" id="value_target">';
        values.select.forEach((value, i) => {
          html += '<option>' + value +'</option>';
        });

        html += '   </select>\
                  </div>';
      } else if (values.type == 'd2c'){
        html = '<div class="form-group" style="width:100%;">\
                  <label for="value">Target value</label>\
                  #<input type="text" class="form-control" id="value_target" placeholder="ff0000">\
                </div>';
      }


      document.getElementById('add_targets_button').disabled = false;
      document.getElementById('value_target_container').innerHTML = html;
    }
  }

}

// Save the title
function updateTitle(){
  task.title = document.getElementById('title').value;
}

// Save the description
function updateDescription(){
  task.description = document.getElementById('description').value;
}

// Add a target to the list
add_targets_button.addEventListener('click', e => {

  device = document.getElementById('device_target').value;
  param = document.getElementById('param_target').value;
  values = getValuesByParam(param)

  if(values != param){
    var value = "";
    if (target_type == 'd2i'){
      value = parseInt(document.getElementById('value_target').value);
    } else if (target_type == 'd2b'){
      var selector = document.getElementById("value_target");
      if (selector.options[selector.selectedIndex].value == 'true')
        value = true;
      else
        value = false;
    } else if (target_type == 'd2l'){
      var selector = document.getElementById("value_target");
      var value = selector.options[selector.selectedIndex].value;
    } else if (target_type == 'd2c'){
      value = parseInt(document.getElementById('value_target').value,16);
      value = {"name":"task", "spectrumRGB":  value }
    }

    new_target = {
      "device": device,
      "param": param,
      "value": value
    }
    task['target'].push(new_target);
    loadTask();
  }
});

/*  GLOBAL OPERATION OVER THE DB  */

save.addEventListener('click', e => {

  //Save the data in the database
  outgoingData = {
    "id": id,
    "task": task
  }
  console.log(outgoingData)
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    response = JSON.parse(http.responseText);
    if (response.code == 200){
      $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>Success!</b> The task has been saved correctly.</div>');
    } else {
      $('#alertContainer').html('<div class="alert alert-danger fade show" role="alert" id="savedAlert"> <b>Fail!</b> Something goes wrong.</div>');
    }
    if (id == -1)
      window.location.href = "/tasks/"
    //Make alert show up
    $('#savedAlert').alert()
    setTimeout(function() {
       $("#savedAlert").remove();
     }, 5000);
  });
  segment = 'update'
  if (id == -1)
    segment = 'create'
  http.open("POST", "/api/tasks/" + segment + "/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(outgoingData));


});

deleteTask.addEventListener('click', e => {

  if (confirm("Do you want to delete the task?")){
    var html = "";

    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
      window.location.href = "/tasks/";
    });
    http.open("GET", "/api/tasks/delete/" + id + "/");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();

  } else {
    //Make alert show up
     $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>OK</b> The task hasn\'t been deleted. Be careful!</div>');
     $('#savedAlert').alert()
     setTimeout(function() {
        $("#savedAlert").remove();
      }, 5000);
  }


});


/*  ADITIONAL INFORMATION  */

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
