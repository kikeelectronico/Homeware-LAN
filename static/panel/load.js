window.addEventListener('load', function(event){
  //Verify user token
  token = getCookieValue('token');
  user = getCookieValue('user');
  value = user + ':' + token;

  if(token != '' && user != ''){
    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
      if (JSON.parse(http.responseText)['status'] == 'in' )
        if(isMobileDevice()){
          document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="/static/mobileMain.css">';
        } else {
          document.head.innerHTML +='<link rel="stylesheet" type="text/css" href="/static/desktopMain.css">';
        }
      else{
        window.location = '/login/';
      }
    });
    http.open("GET", "/api/user/validateToken/");
    http.setRequestHeader('user', user)
    http.setRequestHeader('token', token)
    http.send();
  } else {
    window.location = '/login/';
  }

});

function getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function logout(){
  document.cookie = 'user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.href = '/';
}
