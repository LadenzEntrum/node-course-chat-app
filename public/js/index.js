var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server from index.html');

  //handler für neue Email to send to server
  // socket.emit('createEmail',{
  //   to: 'tosomeone@example.com',
  //   text:'sometexttosend'
  // });


});

socket.on('disconnect',function ()  {
  console.log('Disconnected from Server fired by index.html');
});

//unten listener für new email
// socket.on('newEmail', function (email) {
//   console.log('New email',email);
// });

//unten listener für new message
socket.on('newMessage', function (message) {
  console.log('New message',message);
});
