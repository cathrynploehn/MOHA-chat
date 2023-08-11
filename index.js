var express = require('express');
var app = express();

var http = require('http');
var fs = require('fs');

var serverSsl = http.createServer(app);
var io = require('socket.io')(serverSsl);

var chat = [
  // {username: "user", message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
];

app.get('/', function(req, res){
  res.sendFile( __dirname + '/audience.html');
});

app.get('/chatDisplay', function(req, res){
  res.sendFile( __dirname + '/chat.html');
});

app.use(express.static(__dirname))

io.on('connection', function(socket){
  socket.emit('init', {chat: chat});

  socket.on('chatSent', function(data){
    chat.push(data);
    io.emit('chatReceived', data);
  });

});	

serverSsl.listen(80, function(){
  console.log('listening on *:80');
  console.log('open http://localhost:80');
});