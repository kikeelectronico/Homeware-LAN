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
  document.getElementById('HomeWareStatus').innerHTML += '<p> <b>Current version:</b> ' + actual + ' </p>';

  var latest = new XMLHttpRequest();
  latest.addEventListener('load', showLatest);
  latest.open('GET', 'https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest');
  latest.send();
}

function showLatest(){
  var latestRelease = JSON.parse(this.responseText);
  if (actual != latestRelease.tag_name){
    document.getElementById('HomeWareStatus').innerHTML += '<p style="background-color:#81F79F; padding:20px;"> <b>New version available:</b> ' + latestRelease.tag_name + ' </p> ';
  } else {
    document.getElementById('HomeWareStatus').innerHTML += 'Your system is up to date';
  }
}
