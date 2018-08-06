const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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

  socket.emit('newMessage',{
    from: 'fromsomeone@example.com',
    text: 'some text',
    createdAt: 123
  });//handler für neue Message, call to listener in index.js


  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail',newEmail);
  // });//listener für neue Email von client

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage',newMessage);
  });//listener für neue Message von client

  socket.on('disconnect',(socket) => {
    console.log('existing user disconnect fired from server.js');
  })

});



server.listen(port, () => {
  console.log(`Server is up on port ${port} `);
});