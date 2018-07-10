var socket = io();

socket.on('connect', function() {
  console.log('Connected to server!');
});

socket.on('disconnect', function() {
  console.log('Disconnected to server!');
});

// custom function -- from server to client -- eg- recieving message
socket.on('newMessage', function(msg) {
  console.log("New message: ", msg);

  $('#chat-ul').append("<li>"+msg.from +": "+ msg.text+"</li>");
});

socket.on('newLocationMessage', function(pos) {
  console.log("newLocationMessage", pos);
  $('#chat-ul').append(`<li>${pos.from}: <a href="${pos.map}" target="_blank">Google location</li>`);
});

$(document).on("click", "#sub-btn", function(e) {
  var text = $('#form-text').val();

  socket.emit('createMessage', {
    from: "ChatUser",
    text
  }, function(res) {
    console.log("Response from server: ", res);
  });
});

$(document).on('click', '#geo-btn', function() {
  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    socket.emit('createLocationMesssage', {
      latitude,
      longitude
    }, function(res) {  // You must add this function if callback is specified in socket.on()
      console.log("Response from server: ", res);
    });

  }, function(e) {
    console.log("Unable to fetch location.");
  });

});
