
/*
 * Sockets module
 */

module.exports = function(io,socket) {

  require('./chat')(io,socket);

};
