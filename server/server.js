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
})

server.listen(port, (err)=>{
  console.log(`Server listenning on port ${port}.`);
})
