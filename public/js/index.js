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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);



  // console.log('New message',message);
  // var li = jQuery('<li></li>');//create element as object
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);//manipulate object
  // jQuery('#messages').append(li);//show object on page
});

socket.on('newLocationMessage', function (message) {
  //variablen verhindern js injection
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);//show object on page
});


jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');//reference by id mit #
//event listener for click
locationButton.on('click',function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationButton.attr('disabled','disabled').text('Sending loc..');

  navigator.geolocation.getCurrentPosition(function (position) { //browser build in anfrage nach ort
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
