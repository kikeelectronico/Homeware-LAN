var actual = 'v0.1';
document.getElementById('HomeWareStatus').innerHTML += '<p> <b>Current version:</b> ' + actual + ' </p>';


var latest = new XMLHttpRequest();
latest.addEventListener('load', showLatest);
latest.open('GET', 'https://api.github.com/repos/kikeelectronico/Homeware-LAN/releases/latest');
latest.send();

function showLatest(){
  var latestRelease = JSON.parse(this.responseText);
  if (actual != latestRelease.tag_name){
    document.getElementById('HomeWareStatus').innerHTML += '<p style="background-color:#81F79F; padding:20px;"> <b>New version available:</b> ' + latestRelease.tag_name + ' <br> <b>Description:</b> ' + latestRelease.body + ' <br> <b>Download</b> it from <a href="https://github.com/kikeelectronico/Homeware-LAN/releases/latest" target="blanck">here</a> </p> ';
  } else {
    document.getElementById('HomeWareStatus').innerHTML += 'Your system is up to date';
  }
}
