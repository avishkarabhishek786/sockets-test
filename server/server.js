let express = require('express')
let path = require('path')

let app = express()

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
app.use(express.static(publicPath))

app.listen(3000, (err)=>{
  console.log(`Server listenning on port ${port}.`);
})
