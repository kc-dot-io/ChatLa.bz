module.exports = function() {
  return function(req,res,next) {

    res.locals.mobile = req.mobile;
    res.locals.tablet = req.tablet;

    res.locals.bodyClass = [];
    if(req.mobile) res.locals.bodyClass.push('mobile');
    if(req.tablet) req.locals.bodyClass.push('tablet');
    if(!req.mobile && !req.tablet) res.locals.bodyClass.push('desktop');

    next();
  };
};
