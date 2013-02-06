
/*
 * Clients module
 * - Only Available in Development Mode
 */


module.exports = function(app) {

  app.get('/v1/client/chat', function(req,res,next){
    res.render('clients/chat', { });
  });

};
