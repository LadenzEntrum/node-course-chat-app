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

//unten listener für new message
socket.on('newMessage', function (message) {
  console.log('New message',message);
  var li = jQuery('<li></li>');//create element as object
  li.text(`${message.from}: ${message.text}`);//manipulate object
  jQuery('#messages').append(li);//show object on page
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(){

  });
});
