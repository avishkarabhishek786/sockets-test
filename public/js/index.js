var socket = io();

socket.on('connect', function() {
  console.log('Connected to server!');

  // Fire createEmail function from server.js
  socket.emit('createEmail', {
    to: 'sample@sample.com',
    msg: 'lorem ipsum..'
  });

  socket.emit('createMessage', {
    from: 'John Doe',
    text: 'Hllo Jeni'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected to server!');
});

// custom function -- from server to client -- eg- recieving email
socket.on('newEmail', function(em) {
  console.log("newEmail: ", em);
});

socket.on('newMessage', function(msg) {
  console.log("New message: ", msg);
})
