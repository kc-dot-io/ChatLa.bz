
/*
 * Sockets module
 */

var users = [];
var messages = [];

module.exports = function(io,socket) {

  socket.on('/chat/user/put', function(user){
      if(user && users.indexOf(user) == -1) users.push(user);
      if(user) io.sockets.emit('/chat/user/get', user);
      if(user) io.sockets.emit('/chat/msg/get', '<div><strong>'+user+'</strong> <i>has joined!</i></div>');
  });

  socket.on('/chat/msg/put', function(msg){
      if(msg && users.indexOf(msg) == -1) messages.push(msg);
      if(msg) io.sockets.emit('/chat/msg/get', '<div><strong>'+msg.user+'</strong>: '+msg.data.toString()+'</div>');
  });

};
