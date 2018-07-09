let path = require('path')
let http = require('http')
let express = require('express')
let socketIO = require('socket.io')

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
  socket.on('createMessage', (msg)=>{
    console.log("Created new message: ", msg);
    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    })
  })

  // socket.emit runs function for current user and not for rest users
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app!',
    createdAt: new Date().getTime()
  })

  // socket.broadcast.emit runs function for rest but not for current user
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined.',
    createdAt: new Date().getTime()
  })
})

server.listen(port, (err)=>{
  console.log(`Server listenning on port ${port}.`);
})
