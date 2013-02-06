
var App = (function(){

  var Socket = function(opts) {
    this.io = io.connect(opts.host, {
      resource: opts.resource
    });
    return this;
  };

  Socket.prototype.on = function(route, cb) {
    this.io.on(route, cb);
  };

  Socket.prototype.emit = function(route, data) {
    this.io.emit(route, data);
  };

  var Chat = function(opts) {

    this.init();
    this.resize();
    this.auth();

    var self = this;
    $(window).on('beforeunload',function() {
      self.disconnect();
    });
    $(window).on('resize', this.resize);
  };

  Chat.prototype.init = function() {

    this.users = [];
    this.socket = new Socket({
      host: 'http://'+document.domain+':3000',
      resource: 'v1/socket.io'
    });

  };

  Chat.prototype.auth = function() {
    this.user = prompt("What is your name?");
  };

  Chat.prototype.run = function() {

    var self = this;

    if(!this.user) return;

    this.socket.on('disconnect', function() { });
    this.socket.emit('/chat/server/user/add', this.user);
    this.socket.on('/chat/client/user/add', function(data){
      self.users = data;
      $('#stats').html('').uiji('strong"Users: "');
      $('#stats').uiji('span"'+data.join(',')+'"');
    });
    this.socket.on('/chat/client/user/rm', function(data) {
      self.users = data;
      $('#stats').html('').uiji('strong"Users: "');
      $('#stats').uiji('span"'+data.join(',')+'"');
    });

    this.socket.on('/chat/client/msg/add', function(data){
      $('#msgs').append(data);
      $('#msgs').animate({ scrollTop: $('#msgs')[0].scrollHeight });
    });

    $('form').submit(function(e){
      e.preventDefault();
      self.socket.emit('/chat/msg/put', {
        user: self.user,
        data: $('#msg').val()
      });
      $('#msg').val('');
    });

  };

  Chat.prototype.disconnect = function() {
    this.socket.emit('/chat/server/user/rm', this.user);
  };

  Chat.prototype.resize = function() {
    $('#msgs').css('height', $(window).height()-30+'px')
    $('#msg').focus();
  };

  return Chat;

})();

$(document).ready(function() {
  new App().run();
});
