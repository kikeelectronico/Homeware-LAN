task = {
  "title": "",
  "description": "",
  "trigger": "",
  "target": []
}
devices = {}
params = {}
active_trigger_id = 0
id = -1 // Task id
create_task = true;
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
      console.log(device)
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
  document.getElementById('triggersCard').innerHTML = operationRenderer(task.trigger);
  document.getElementById('cards_targets_container').innerHTML = targetRenderer();

  loadApiTime();
}

/*  RENDER THE TRIGGERS, LOGIC AND TARGETS  */

// Decides what kind of render is needed
function operationRenderer(operation){
  if (operation.type == 'd2b' || operation.type == 'd2i' || operation.type == 'd2l' || operation.type == 'd2s')
    return d2Renderer(operation.operation, operation.id);
  else if (operation.type == 'd2d')
    return d2dRenderer(operation.operation, operation.id);
  else if (operation.type == 'time')
    return timeRenderer(operation.operation, operation.id);
  else if (operation.type == 'or')
    return orRenderer(operation.operation, operation.id);
  else if (operation.type == 'and')
    return andRenderer(operation.operation, operation.id);
}

// Device to device render
function d2dRenderer(operation, id){
  op = operation.split(':')
  var html = '<div class="card" style="margin-top:10px;">\
                <div class="card-body">\
                  <b>' + getDeviceName(op[0]) + '</b>(' + getParamCoolName(op[1]) + ') ' + op[2] + ' ' +'<b>' + getDeviceName(op[3]) + '</b>(' + getParamCoolName(op[4]) + ')<br>\
                </div>\
              </div>';
  return html
}

// Device to not device render
function d2Renderer(operation, id){
  op = operation.split(':')
  var html = '<div class="card" style="margin-top:10px;">\
                <div class="card-body">\
                  <b>' + getDeviceName(op[0]) + '</b>(' + getParamCoolName(op[1]) + ') ' + op[2] + ' ' + op[3] + '<br>\
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
                  ' + putZero(op[0]) + ':' + putZero(op[1]) + ' -  ' + week[op[2]] +'\
                </div>\
              </div>';
  return html
}

// Logic or render
function orRenderer(operation, id){
  var html = '<div class="card" style="background-color:rgba(5,5,5,0.05)">\
                <div class="card-body" id="">\
                  <h4>Or</h4>';
  for (var i = 0; i < operation.length; i++){
    html += operationRenderer(operation[i]);
  }
  html += '<br><button type="button" class="btn btn-primary" onclick="launchD2Assitant(' + id + ')">+</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'and\',' + id + ')">AND</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'or\',' + id + ')">OR</button>\
            </div></div>';
  return html;
}

// Logic and render
function andRenderer(operation, id){
  var html = '<div class="card" style="background-color:rgba(5,5,5,0.05)">\
                <div class="card-body" id="">\
                  <h4>And</h4>';
  for (var i = 0; i < operation.length; i++){
    html += operationRenderer(operation[i]);
  }
  html += '<br><button type="button" class="btn btn-primary" onclick="launchD2Assitant(' + id + ')">+</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'and\',' + id + ')">AND</button>\
            <button type="button" class="btn btn-primary" onclick="add(\'or\',' + id + ')">OR</button>\
            </div></div>';
  return html;
}

// Render the targets
function targetRenderer(){
  var html = "";
  task.target.forEach((target, i) => {
    html += '<div class="card" style="margin-left:20px;margin-top:10px;">\
              <div class="card-body">\
                <b>'+ getDeviceName(target.device) + '</b>(' + target.param + ') = ' + target.value +'\
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

/*  ADD NEW TRIGGER OR LOGIC  */

function add(type, id){
  var new_operation = {
    "type": type,
    "id": Date.now(),
    "operation": []
  }

  if (!create_task){
    s_task = JSON.stringify(task);

    var query = '"id":' + id.toString();
    var query_position = s_task.indexOf(query) + query.length;
    var insert_position = s_task.indexOf('[', query_position) + 1;
    var insert_end_position = s_task.indexOf(']', query_position);

    separator = ''
    if (insert_position != insert_end_position)
      separator = ','

    new_task = s_task.slice(0, insert_position) + JSON.stringify(new_operation) + separator + s_task.slice(insert_position, s_task.length);
    task = JSON.parse(new_task);
  } else {
    task['trigger'] = new_operation;
    create_task = false;
  }

  loadTask(task)

}

/* ASSISTANT FOR ADDING NEW DEVICES AND TIME TRIGGERS  */

// Launch the assistant
function launchD2Assitant(id){
  document.getElementById('d2AssistantBody').innerHTML = '<button type="button" class="trigger_assistant_button" onclick="timeAssistant(' + id + ')"><img src="/static/images/clock.png"/ title="Time trigger"></button>\
                                                          <button type="button" class="trigger_assistant_button" onclick="d2Assistant(' + id + ')"><img src="/static/images/bulb.png"/ title="Device trigger"></button>';

  document.getElementById('d2AssistantFooter').innerHTML = '';
  $('#d2Assitant').modal('show')
}

// If the user select a time trigger
function timeAssistant(id){
  active_trigger_id = id;

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
  active_trigger_id = id;

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

// Create the trigger and seva into the data var
function createTrigger(type){
  var selector = document.getElementById("device_a");
  device_a = selector.options[selector.selectedIndex].value;
  var selector = document.getElementById("param_a");
  param_a = selector.options[selector.selectedIndex].value;
  var selector = document.getElementById("operator");
  operator = selector.options[selector.selectedIndex].value;

  operation = ""
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

  console.log(operation)

  var new_operation = {
    "type": type,
    "id": Date.now(),
    "operation": operation
  }

  if(!create_task){
    s_task = JSON.stringify(task);

    var query = '"id":' + active_trigger_id.toString();
    var query_position = s_task.indexOf(query) + query.length;
    var insert_position = s_task.indexOf('[', query_position) + 1;
    var insert_end_position = s_task.indexOf(']', query_position);

    separator = ''
    if (insert_position != insert_end_position)
      separator = ','

    new_task = s_task.slice(0, insert_position) + JSON.stringify(new_operation) + separator + s_task.slice(insert_position, s_task.length);
    task = JSON.parse(new_task);
  } else {
    task['trigger'] = new_operation;
    create_task = false;
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

  console.log(operation)

  var new_operation = {
    "type": 'time',
    "id": Date.now(),
    "operation": operation
  }

  if(!create_task){
    s_task = JSON.stringify(task);

    var query = '"id":' + active_trigger_id.toString();
    var query_position = s_task.indexOf(query) + query.length;
    var insert_position = s_task.indexOf('[', query_position) + 1;
    var insert_end_position = s_task.indexOf(']', query_position);

    separator = ''
    if (insert_position != insert_end_position)
      separator = ','

    new_task = s_task.slice(0, insert_position) + JSON.stringify(new_operation) + separator + s_task.slice(insert_position, s_task.length);
    task = JSON.parse(new_task);
  } else {
    task['trigger'] = new_operation;
    create_task = false;
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
  values = getValuesByParam(param)

  if (order == 'a' || order == 'b'){
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
  } else if (order == 'target'){
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
    }


    document.getElementById('add_targets_button').disabled = false;
    document.getElementById('value_target_container').innerHTML = html;
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

// Add a target
add_targets_button.addEventListener('click', e => {
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
  }
  device = document.getElementById('device_target').value;
  param = document.getElementById('param_target').value;

  new_target = {
    "device": device,
    "param": param,
    "value": value
  }
  task['target'].push(new_target);
  loadTask();
});

/*  GLOBAL OPERATION OVER THE DB  */

save.addEventListener('click', e => {

  //Save the data in the database
  outgoingData = {
    "id": id,
    "task": task
  }
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    response = JSON.parse(http.responseText);
    if (response.code == 200){
      $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>Success!</b> The task has been saved correctly.</div>');
    } else {
      $('#alertContainer').html('<div class="alert alert-danger fade show" role="alert" id="savedAlert"> <b>Fail!</b> Something goes wrong.</div>');
    }

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

deleteRule.addEventListener('click', e => {

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
