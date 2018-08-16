var socket = io();

function scrollToBottom() {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeigth = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeigth >= scrollHeight)
    messages.scrollTop(scrollHeight);
};


socket.on('connect', function ()  {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('no error');
    }
  });
});

socket.on('disconnect',function ()  {
  console.log('Disconnected from Server fired by index.html');
});

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
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
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  //variablen verhindern js injection
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();//#select by id .html to get inner html back
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);//show object on page
  scrollToBottom();
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
