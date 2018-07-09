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
})
