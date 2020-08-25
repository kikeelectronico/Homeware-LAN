data = {}

function laodDevicesRequest(){
  var http = new XMLHttpRequest();
  http.addEventListener("load", function(){
    data = JSON.parse(http.responseText);
    loadCards();
  });
  http.open("GET", "/api/tasks/get/");
  http.setRequestHeader('authorization', 'baerer ' + getCookieValue('token'))
  http.send();
}


function loadCards() {
  html = ""
  data.forEach((task, i) => {
    console.log(task['title'])
    html += renderCard(task['title'],task['description'],i)
  });
  document.getElementById('tasksList').innerHTML = html;
}

function renderCard(title, description, id){
  html = '<div class="card task_card">\
            <div class="card-header">';
  html += title;
  html += '</div>\
            <div class="card-body">\
              <p class="card-text">';
  html += description;
  html +=   '</p>\
              <a href="/tasks/edit/' + id + '" class="btn btn-primary">Edit</a>\
            </div>\
          </div>'

  return html;
}
