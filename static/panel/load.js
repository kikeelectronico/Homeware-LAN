window.addEventListener('load', function(event){
  //Verify user token
  token = getCookieValue('token');
  user = getCookieValue('user');
  value = user + ':' + token;

  if(token != '' && user != ''){
    var http = new XMLHttpRequest();
    http.addEventListener("load", function(){
      if (JSON.parse(http.responseText)['status'] == 'in' )
        load();
      else{
        window.location = '/login/';
      }
    });
    http.open("GET", "/front/login/token/");
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

function load(){

  var ajaxHead = new XMLHttpRequest();
  ajaxHead.addEventListener("load", loadHead);
  ajaxHead.open("GET", "/static/panel/head.html");
  ajaxHead.send();
}

function loadNavbar(){
  document.getElementById('navbarBlock').innerHTML += this.responseText;
  document.getElementsByTagName("body")[0].style = 'visibility: visible';
}

function loadHead(){
  document.head.innerHTML += this.responseText;
  if(isMobileDevice()){
    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="/static/panel/mobileMain.css">';
  } else {
    document.head.innerHTML +='<link rel="stylesheet" type="text/css" href="/static/panel/desktopMain.css">';
  }

  var ajaxNavbar = new XMLHttpRequest();
  ajaxNavbar.addEventListener("load", loadNavbar);
  ajaxNavbar.open("GET", "/static/panel/navbar.html");
  ajaxNavbar.send();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// logout.addEventListener('click', e =>{
//   fdocument.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   window.location = '/';
//   console.log('Log out');
// });
