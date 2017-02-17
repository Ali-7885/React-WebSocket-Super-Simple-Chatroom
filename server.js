var path = require('path')
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var PORT = process.env.PORT || 3000

users=[]
connections=[]

server.listen(PORT)
console.log('Server is running.....')

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var webpack = require('webpack')
  var config = require('./webpack.config')
  var compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html')
})

// app.listen(PORT, function(error) {
//   if (error) {
//     console.error(error);
//   } else {
//     console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
//   }
// })

io.sockets.on('connection',function(socket){
  connections.push(socket)
  console.log('connection : %s sockets connected',connections.length)

  //Disconnected
  socket.on('disconnect',function(data){
    users.splice(users.indexOf(socket.username),1)
    updateUsernames()
    connections.splice(connections.indexOf(socket),1)
    console.log('Disconnected : %s sockets connected',connections.length)
  })

  socket.on('send-message',function(data){
    // console.log(data)
    io.sockets.emit('new-mesage',{user:socket.username,msg:data})
  })

  socket.on('new-user',function(data,callback){
    socket.username=data
    users.push(socket.username)
    updateUsernames();
    // console.log('new-user : '+data)
  })

  function updateUsernames(){
    io.sockets.emit('get-users',users)
  }
})
