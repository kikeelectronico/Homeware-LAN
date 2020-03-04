data = {}
var editor;

function laodDevicesRequest(ruleID){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    console.log(JSON.parse(http.responseText))
    data = JSON.parse(http.responseText)[ruleID];
    loadRule(data, ruleID);
  });
  http.open("GET", "/api/rules/get");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

function loadRule(data, ruleID){
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
  rule = editor.get();
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
