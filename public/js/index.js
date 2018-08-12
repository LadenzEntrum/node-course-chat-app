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

socket.on('newLocationMessage', function (message) {
  //variablen verhindern js injection
  var li = jQuery('<li></li>');//create element as object
  var a = jQuery('<a target="_blank">My current location</a>');//target _blank öffnet neuen tab

  li.text(`${message.from}: `);//manipulate object
  a.attr('href',message.url);//zwei argumente sind attribut und wert, ein attribut ist z.b. der tab mit target
  li.append(a);
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

var locationButton = jQuery('#send-location');//reference by id mit #
//event listener for click
locationButton.on('click',function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function (position) { //browser build in anfrage nach ort
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});
