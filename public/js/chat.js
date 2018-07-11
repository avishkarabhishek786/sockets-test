var socket = io();

function scrollToBottom() {
  var messages = $('#chat-ul');
  var newMessage = messages.children('li:last');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessagesHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessagesHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect', function() {
  console.log('Connected to server!');
});

socket.on('disconnect', function() {
  console.log('Disconnected to server!');
});

// custom function -- from server to client -- eg- recieving message
socket.on('newMessage', function(msg) {
  console.log("New message: ", msg);
  //$('#chat-ul').append("<li>"+msg.from +" "+ msg.createdAt+": "+ msg.text+"</li>");

  var temp = $('#msg__temp').html();
  var box = Mustache.render(temp, {
    name: msg.from,
    time: msg.createdAt,
    message: msg.text
  });
  $('#chat-ul').append(box);
  scrollToBottom();
});

socket.on('newLocationMessage', function(pos) {
  console.log("newLocationMessage", pos);
  //$('#chat-ul').append(`<li>${pos.from} ${pos.createdAt}: <a href="${pos.map}" target="_blank">Google location</li>`);
  var temp = $("#msg__location__temp").html();
  var box = Mustache.render(temp, {
    name: pos.from,
    time: pos.createdAt,
    location: pos.map
  });
  $("#chat-ul").append(box);
  scrollToBottom();
});

$(document).on("click", "#sub-btn", function(e) {
  var textbox = $('#form-text');
  var text = textbox.val();

  socket.emit('createMessage', {
    from: "ChatUser",
    text
  }, function(res) {
    console.log("Response from server: ", res);
    textbox.val('');
  });
});

$(document).on('click', '#geo-btn', function() {
  if (!navigator.geolocation){
    alert("Geolocation is not supported by your browser");
    return;
  }
  var btn = $(this);
  btn.attr('disabled', 'disabled').text('Sending...');
  navigator.geolocation.getCurrentPosition(function(position) {
    btn.removeAttr('disabled').text('Send location');
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
