const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('new user connected');

  // socket.emit('newEmail',{
  //   from: 'fromsomeone@example.com',
  //   text: 'some text',
  //   createdAt: 123
  // });//handler für neue Email, call to listener in index.js

  socket.emit('newMessage', generateMessage('admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('admin','New user joined'));


  socket.on('createMessage', (message,callback) => {
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('This is from the server');
  });//listener für neue Message von client

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('TP', coords.latitude, coords.longitude));
  });

  socket.on('disconnect',(socket) => {
    console.log('existing user disconnect fired from server.js');
  });


});



server.listen(port, () => {
  console.log(`Server is up on port ${port} `);
});
