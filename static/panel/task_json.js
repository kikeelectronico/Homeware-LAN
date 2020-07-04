data = {}
id = -1
var editor;

function laodTasksRequest(taskID){
  console.log(taskID)
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    console.log(JSON.parse(http.responseText))
    data = JSON.parse(http.responseText);
    id = taskID;
    loadTask(data, taskID);
  });
  http.open("GET", "/api/tasks/get/"+taskID);
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

function loadTask(data, TaskID){
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

save.addEventListener('click', e => {
  task = editor.get();
  console.log(task);

  //Save the data in the database
  outgoingData = {
    "id": id,
    "task": task
  }
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    //Make alert show up
    $('#alertContainer').html('<div class="alert alert-success fade show" role="alert" id="savedAlert"> <b>Success!</b> The task has been saved correctly.</div>');
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
      window.location.href = "/Tasks/";
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
