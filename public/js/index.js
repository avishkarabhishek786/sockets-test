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
})

$(document).on("click", "#sub-btn", function(e) {
  var text = $('#form-text').val();

  socket.emit('createMessage', {
    from: "ChatUser",
    text
  }, function(res) {
    console.log("Response from server: ", res);
  });
});
