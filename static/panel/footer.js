/*
firebase.database().ref('/events/unread/').on('child_added', function(childSnapshot, prevChildKey){
  var events = childSnapshot.val();

   var html = '<div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false" data-delay="5000" id="' + events.timestamp + '">';
        html += '<div class="toast-header">';
          html += '<img src="https://raw.githubusercontent.com/kikeelectronico/Homeware/master/images/HomeIcon.png" class="rounded mr-2" style="height:20px;">';
          html += '<strong class="mr-auto">' + events.title + '</strong>';
          //html += '<small>11 mins ago</small>';
          html += '<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">';
            html += '<span aria-hidden="true" onclick="closeToastEvent(\'' + events.timestamp + '\')">&times;</span>';
          html += '</button>';
        html += '</div>';
        html += '<div class="toast-body">';
          html += events.text;
        html += '</div>';
      html += '</div>';

  document.getElementById('toastBoardPosition').innerHTML += html;

  $('#' + events.timestamp).toast('show');
});

function closeToastEvent(timestamp){
  firebase.database().ref('/events/unread/').child(timestamp).once('value', function(eventsSnapshot){
    var events = eventsSnapshot.val();

    firebase.database().ref('/events/read/').push().set(events);
    firebase.database().ref('/events/unread/').child(timestamp).remove();
  });

  $('#' + timestamp).toast('hide')

}
*/
