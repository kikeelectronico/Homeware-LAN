function requestSettings(){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    loadSettings(http.responseText);
  });
  http.open("GET", "/api/settings/get");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

function loadSettings(local_data){
  var token = JSON.parse(local_data);

  document.getElementById('clientId').value = token['google']['client_id'];
  document.getElementById('clientSecret').value = token['google']['client_secret'];
  document.getElementById('actionOnGoogleAuxiliarData').innerHTML = '<b>Authorization URL:</b> https://' + token['ddns']['hostname'] + '/auth/<br>';
  document.getElementById('actionOnGoogleAuxiliarData').innerHTML += '<b>Token URL:</b> https://' + token['ddns']['hostname'] + '/token/<br>';
  document.getElementById('actionOnGoogleAuxiliarData').innerHTML += '<b>Fulfillment URL:</b> https://' + token['ddns']['hostname'] + '/smarthome/<br>';

  document.getElementById('ddnsUsername').value = token['ddns']['username'];
  document.getElementById('ddnsPassword').value = token['ddns']['password'];
  document.getElementById('ddnsProvider').select = token['ddns']['provider'];
  document.getElementById('ddnsHostname').value = token['ddns']['hostname'];
  document.getElementById('ddnsEnabled').checked = token['ddns']['enabled'];
  document.getElementById('ddnsLastUpdate').innerHTML = '<b>Last update:</b> ' + token['ddns']['last'];
  document.getElementById('ddnsIP').innerHTML = '<b>IP:</b> ' + token['ddns']['ip'];

  document.getElementById('mqttUser').value = token['mqtt']['user'];
  document.getElementById('mqttPassword').value = token['mqtt']['password'];

  document.getElementById('apikey').value = token['apikey'];

  badgeClass = {
    'unknown': 'badge-secondary',
    'good': 'badge-success',
    'nochg': 'badge-warning',
    'nohost': 'badge-danger',
    'badauth': 'badge-danger',
    'badagent': 'badge-danger',
    '!donator': 'badge-danger',
    'abuse': 'badge-danger',
    '911': 'badge-danger'
  }
  document.getElementById('ddnsStatusBadge').innerHTML = token['ddns']['status'];
  document.getElementById('ddnsStatusBadge').className = 'badge ' + badgeClass[token['ddns']['code']]

}

function requestStatus(){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    loadStatus(http.responseText);
  });
  http.open("GET", "/api/system/status/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}

function loadStatus(status){
  var status = JSON.parse(status);

  classes = {
    'Running': 'badge badge-success',
    'Warning': 'badge badge-warning',
    'Stoped': 'badge badge-danger'
  }

  document.getElementById('apiEnable').checked = status['api']['enable'];
  document.getElementById('apiBadge').innerHTML = status['api']['status'];
  document.getElementById('apiBadge').className = classes[status['api']['status']];
  document.getElementById('mqttEnable').checked = status['mqtt']['enable'];
  document.getElementById('mqttBadge').innerHTML = status['mqtt']['status'];
  document.getElementById('mqttBadge').className = classes[status['mqtt']['status']];
  document.getElementById('tasksEnable').checked = status['tasks']['enable'];
  document.getElementById('tasksBadge').innerHTML = status['tasks']['status'];
  document.getElementById('tasksBadge').className = classes[status['tasks']['status']];
  document.getElementById('redisEnable').checked = status['redis']['enable'];
  document.getElementById('redisBadge').innerHTML = status['redis']['status'];
  document.getElementById('redisBadge').className = classes[status['redis']['status']];

  setTimeout(requestStatus, 5000);

}


saveGoogle.addEventListener('click', function() {
  save();
});

saveDDNS.addEventListener('click', function() {
  save();
});

saveMQTT.addEventListener('click', function() {
  save();
});

function save(){
  //Update the text message
  document.getElementById('textMessageAlertGoogle').innerHTML = '...';
  document.getElementById('textMessageAlertDDNS').innerHTML = '...';
  data['google'] = {};
  data['google']['client_id'] = document.getElementById('clientId').value;
  data['google']['client_secret'] = document.getElementById('clientSecret').value;
  data['ddns'] = {};
  data['ddns']['username'] = document.getElementById('ddnsUsername').value;
  data['ddns']['password'] = document.getElementById('ddnsPassword').value;
  data['ddns']['provider'] = document.getElementById('ddnsProvider').value;
  data['ddns']['hostname'] = document.getElementById('ddnsHostname').value;
  data['ddns']['enabled'] = document.getElementById('ddnsEnabled').checked;
  if(document.getElementById('ddnsEnabled').checked)
    document.getElementById('ddnsStatusBadge').innerHTML = 'Waiting to request'
  else
    document.getElementById('ddnsStatusBadge').innerHTML = 'Disabled'
  data['mqtt'] = {};
  data['mqtt']['user'] = document.getElementById('mqttUser').value;
  data['mqtt']['password'] = document.getElementById('mqttPassword').value;

  saveData('settings', data);
  //Update the text message
  updateMessageWithTime();
}

function saveData(segment, value){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    if (http.responseText != 'Bad token')
      console.log(http.responseText);
    else {
      document.getElementById('textMessageAlertGoogle').innerHTML = 'An error has happed.';
      document.getElementById('textMessageAlertDDNS').innerHTML = 'An error has happed.';
    }
  });
  http.open("POST", "/api/" + segment + "/update/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.setRequestHeader("Content-type", "application/json");
  http.send(JSON.stringify(value));
}

function updateModal(settings){
  var title = 'Fail';
  var paragrahp = 'Something goes wrong';

  if (settings == 'clientSecret'){
    title = 'Client Secret';
    paragraph = 'It is used to authenticate with Google. If you change it here, you must change it on the Actions Console > Develop > Account Linking.';
  } else if (settings == 'clientId'){
    title = 'Client ID';
    paragraph = 'It is used to authenticate with Google. If you change it here, you must change it on the Actions Console > Develop > Account Linking';
  } else if (settings == 'apiClockURL'){
    title = 'The clock\'s URL from your Homeware API';
    paragraph = 'It is an static URL, you can not change it.';
  } else if (settings == 'ddns'){
    title = 'Dinamic Domain Name Server';
    paragraph = 'Set up the access data to the DDNS provider account. Open an issue on Github if you want a DDNS provider that is not listed.';
  }


  document.getElementById('learMoreModalTitle').innerHTML = title;
  document.getElementById('learMoreModalParagraph').innerHTML = paragraph;

}

//Print message after save
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function updateMessageWithTime(){
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  var s = addZero(d.getSeconds());
  document.getElementById('textMessageAlertGoogle').innerHTML = 'Saved at ' + h + ":" + m + ":" + s;
  document.getElementById('textMessageAlertDDNS').innerHTML = 'Saved at ' + h + ":" + m + ":" + s;
}


//Load the events
showEventsLog.addEventListener('click', function(){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    events = JSON.parse(http.responseText);
    //Compose the HTML
    var html = '';
    for(i = events.length-1; i > events.length-11; i--){
      var uniqueEvent = events[i];
      date = new Date(uniqueEvent.timestamp);
      html += '<div class="card"> <div class="card-body">';
      html += '<b>' + uniqueEvent.severity + '</b> <br> ' + uniqueEvent.message + ' <br> <b>Timestamp</b>: ';
      html += uniqueEvent.time;
      html += '</div> </div>';
    }

    document.getElementById('eventsLogBox').innerHTML = html;

  });
  http.open("GET", "/api/log/get");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
})

function buckup(){
  window.location = "/files/buckup/homeware/" + getCookieValue('token')
}

function generateAPIKey(){
  if(confirm('The current API Key will be override.')){
    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
      apikey = JSON.parse(http.responseText);
      console.log(apikey)
      document.getElementById('apikey').value = apikey['apikey'];
    });
    http.open("GET", "/api/settings/apikey");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();

  }
}


// Version upgrade
var actual = 'unknown';

function requestActual(){
  var actual = new XMLHttpRequest();
  actual.addEventListener('load', requestLatest);
  actual.open('GET', '/api/global/version/');
  actual.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  actual.send();
}

function requestLatest(){
  actual = JSON.parse(this.responseText)['version'];
  document.getElementById('HomewareCurrentStatus').innerHTML += '<p><b>Current version:</b> ' + actual + '</p>';
  document.getElementById('HomewareNewStatus').innerHTML += 'Conecting...';

  var latest = new XMLHttpRequest();
  latest.addEventListener('load', showLatest);
  latest.open('GET', 'https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest');
  latest.send();
}

function showLatest(){
  var latestRelease = JSON.parse(this.responseText);
  if (actual != latestRelease.tag_name){
    document.getElementById('HomewareNewStatus').innerHTML = '<p style="border: 3px solid #81F79F; padding:20px;"> <button type="button" class="btn btn-primary" onclick="downloadAndUpgrade()">Upgrade</button> <br><br> <b>New version available:</b> ' + latestRelease.tag_name + ' <br> <b>Description:</b><br><br> ' + latestRelease.body.replace(/\n/g, "<br />"); + ' <br>  </p>  ';
  } else {
    document.getElementById('HomewareNewStatus').innerHTML = 'Your system is up to date';
  }
}

var upgradeStep = 0;

function resetStep(){
  upgradeStep = 0;
  $('#modalUpgrade').modal('hide')
}

function downloadAndUpgrade(){

  if (upgradeStep == 0){
    document.getElementById('upgradeModalTitle').innerHTML = "Upgrade";
    document.getElementById('upgradeModalParagraph').innerHTML = "Are you sure that you want to upgrade your Homeware-LAN installation?";
    $('#modalUpgrade').modal('show')
    upgradeStep = 1;
  } else if (upgradeStep == 1){
    buckup();
    document.getElementById('upgradeModalTitle').innerHTML = "Backup";
    document.getElementById('upgradeModalParagraph').innerHTML = "A security file should be downloaded. Do you have it?";
    upgradeStep = 2;
  } else if (upgradeStep == 2){
    document.getElementById('upgradeModalTitle').innerHTML = "Wait";
    document.getElementById('upgradeModalParagraphContainer').innerHTML = "The system will be down some time. The page will be reloaded automatically into home page when the system will be ready.<div class=\"d-flex justify-content-center\">\
                                                                            <div class=\"spinner-border\" role=\"status\">\
                                                                              <span class=\"sr-only\">Loading...</span>\
                                                                            </div>\
                                                                          </div>";
    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
      code = JSON.parse(http.responseText)['code']
      if(code == '202'){
        setTimeout(reloadIfApiIsAlive(),2000)
      } else {
        alert('Something goes wrong.')
      }
    });
    http.open("GET", "/api/system/upgrade");
    http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
    http.send();
  }

}

function reloadIfApiIsAlive(){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    if( http.responseText == 'Load'){
      window.location.href = '/'
    } else {
      console.log('Waiting')
      setTimeout(reloadIfApiIsAlive(),5000)
    }
  });
  http.open("GET", "/test/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}
