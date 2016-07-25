var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  console.log('about to redirect');
  if (!isLoggedIn(req)) {
    console.log('about to redirect; checkUser is', isLoggedIn(req));
    res.status(200).send('/login');
  } else {
    console.log('not going to redirect; checkUser is', isLoggedIn(req));
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
      // console.log('newUser from createSession is', newUser);
      console.log('inside util.createSession');
      req.session.user = newUser;
      console.log('req.sessionID from inside createSession is', req.sessionID);
      req.session.save(function(err) {
        if(err) {
          console.log('err from insie req.session.save is', err);
        }
      })
      // req.session.save();
      // console.log("# Session value set "+ req.session.user);
    });
};