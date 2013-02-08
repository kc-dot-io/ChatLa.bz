
/*
 * Sockets module
 */

var users = [];
var messages = [];

module.exports = function(io,socket) {

  socket.on('/chat/server/user/add', function(user){
    if(users.indexOf(user) == -1) users.push(user);
    io.sockets.emit('/chat/client/msg/add', '<div><strong>'+user+'</strong> <i>has joined!</i></div>');
    io.sockets.emit('/chat/client/user/add', users);
  });

  socket.on('/chat/server/user/rm', function(user) {
    users.forEach(function(u,i) { if(u == user) users.splice(i,i); });
    io.sockets.emit('/chat/client/user/rm', users);
    io.sockets.emit('/chat/client/msg/add', '<div><strong>'+user+'</strong> <i> has left!</i></div>');
  });

  socket.on('/chat/server/msg/add', function(data){
    if(data.msg && users.indexOf(data.user)) messages.push(data.msg);
    if(data.msg) io.sockets.emit('/chat/client/msg/add', '<div><strong>'+data.user+'</strong>: '+data.msg.toString()+'</div>');
  });

};
