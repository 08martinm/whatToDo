var isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  console.log('about to redirect');
  if (!isLoggedIn(req)) {
    res.status(200).send('/login');
  } else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    req.session.save(function(err) {
      if(err) {
        console.log('err from insie req.session.save is', err);
      }
    })
  });
};