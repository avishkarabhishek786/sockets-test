let path = require('path')
let http = require('http')
let express = require('express')
let socketIO = require('socket.io')
let {messageObject, messageLocationObject} = require('./utils/messageObject.js')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

let app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(publicPath))

io.on('connection', (socket)=>{
  console.log("Connected to client!");

  socket.on('disconnect', () => {
    console.log('Disconnected to client!');
  });

  //custom function -- from client to server -- eg- sending message
  socket.on('createMessage', (msg, callback)=>{
    console.log("Created new message: ", msg);
    io.emit('newMessage', messageObject(msg.from, msg.text)) // msg.from and text are defined during fn call i.e socket.emit()
    callback('Your message was sent successfully!')
  })

  // socket.emit runs function for current user and not for rest users
  socket.emit('newMessage', messageObject('Admin', 'Welcome to the chat app!'))

  // socket.broadcast.emit runs function for rest but not for current user
  socket.broadcast.emit('newMessage', messageObject('Admin', 'New user joined.'))

  // geo location
  socket.on('createLocationMesssage', (coords, callback)=> {
    io.emit('newLocationMessage', messageLocationObject('Admin', coords.latitude, coords.longitude))
    callback("Location cordinates delivered.") // You must pass a function as second arg in socket.emit() if callback is used here
  });
})

server.listen(port, (err)=>{
  console.log(`Server listenning on port ${port}.`);
})
