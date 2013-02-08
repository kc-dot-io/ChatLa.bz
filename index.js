
/**
 * Bidwars.net
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , mobile = require('mobile')
  , locals = require('locals');

var app = express();

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('debug', process.env.NODE_ENV=='development');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());

  // Compile in Development
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true)
      .use(nib());
  }

  app.use(stylus.middleware({
      src: __dirname+'/public'
    , dest: __dirname+'/public'
    , compile: compile
    , compress: true
  }));

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(mobile());
  app.use(locals());
  require('./routes/clients')(app);
  require('./routes')(app)
  app.use(app.router);
});

var ioSocket = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(ioSocket, { log: app.get('debug') });
io.set('resource','/v1/socket.io');
io.sockets.on('connection', function (socket) {
  require('./routes/sockets')(io,socket);
});
