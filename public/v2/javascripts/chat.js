$(document).ready(function(){

  var users = [];

  var user = prompt("What is your name?");
  if(!user) return;
  if(users.indexOf(user) > -1) return prompt("Sorry that name is taken, try another");


  var socket = io.connect('http://'+document.domain+':3000', { resource: 'v2/socket.io' });

  socket.on('/chat/msg/get', function(data){
    $('#msgs').append(data);
    $('#msgs').animate({ scrollTop: $('#msgs')[0].scrollHeight });
  });

  $('form').submit(function(e){
    e.preventDefault();
    socket.emit('/chat/msg/put', { user: user, data: $('#msg').val() });
    $('#msg').val('');
  });

  socket.emit('/chat/user/put', user);
  socket.on('/chat/user/get', function(data){
    users.push(data);
  })

  $('#msgs').css('height', $(window).height()-30+'px')
  $('#msg').focus();
});
