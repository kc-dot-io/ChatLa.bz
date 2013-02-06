
/*
 * Routes module
 */

module.exports = function(app) {

  // API Controllers Example
  // require('controller1')(app);
  // require('controller2')(app);
  //
  // Catch all
  app.get('*', function(req,res,next){
    res.send({ success: false, message: 'Unauthorized Access'});
  });

};
