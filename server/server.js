const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('new user connected');

  // socket.emit('newEmail',{
  //   from: 'fromsomeone@example.com',
  //   text: 'some text',
  //   createdAt: 123
  // });//handler für neue Email, call to listener in index.js


  socket.on('join', (params, callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    //socket.leave gruppe in socket

    //io.emit -> io.to('roomname').emit to every users
    //socket.broadcast.emit -> socket.broadcast.to('roomname').emit sends to all in socket but not me
    //socket.emit sends to one user
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

    callback();
  });


  socket.on('createMessage', (message,callback) => {
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });//listener für neue Message von client

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('TP', coords.latitude, coords.longitude));
  });

  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
    }
    console.log('existing user disconnect fired from server.js');
  });


});



server.listen(port, () => {
  console.log(`Server is up on port ${port} `);
});
