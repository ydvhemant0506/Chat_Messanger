var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs'); // required for file serving
var port = process.env.PORT || 4000;

app.use(express.static(__dirname));

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
  socket.username = "Anonymouse";
  // console.log(socket.username + ' connected on socket ', socket);
  socket.on('change_username', (data) => {
    if (data.username == '') socket.username = 'Anonymouse';
    else socket.username = data.username;

    users[socket.id] = data.username;

    socket.broadcast.emit('chat message', '<span class="username">A new User ' + socket.username + ' Joined The Chatroom </span>');
    // console.log("username = " + data.username);
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', '<span class="username">' + socket.username + ': </span>' + msg);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', { username: socket.username });
  })

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  })

  socket.on('disconnect', (msg) => {
    socket.broadcast.emit('left', users[socket.id])
    delete users[socket.id];
  });


  //serving images

  socket.on('base64 file', function (msg) {
    console.log('received base64 file from' + socket.username);
    io.sockets.emit('base64 file',  //include sender

      {
        username: socket.username=='' ? 'Anonymouse' : socket.username,
        file: msg.file,
        fileName: msg.fileName
      }

    );
  });

});

