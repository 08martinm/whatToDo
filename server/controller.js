var model = require('./model.js');
var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var util = require('./lib/utility.js');


module.exports = {
  loggedIn: function(req, res) {
    if (req.session && req.session.user) {
      res.status(200).send('true');
    } else {
      res.status(200).send('false');
    }
  },

  signup: {
    get: function(req, res) {
      res.render('/Signup.jsx');
    },
    post: function(req, res) {
      var parsed = JSON.parse(req.body.data);
      var username = parsed.username;
      var password = parsed.password;

      model.signup.permitSignup(parsed)
      .then(function(bool) {
        if (!!bool) {
          bcrypt.hash(password, null, null, function(err, hash) {
            model.signup.post({username: username, password: hash})
            .then(function(user) {
              util.createSession(req, res, user);
              setTimeout(function() {
                res.status(200).send('/home')
              }, 500);
            })
          })
        } else {
          res.status(500).send('Username taken! Please try again.');
        }
      })
    }
  },
  
  login: {
    get: function(req, res) {
      // res.redirect('./index.html');  REDIRECT if static page; RENDER if new view 
    },
    post: function(req, res) {
      var parsed = JSON.parse(req.body.data);
      var username = parsed.username;
      var password = parsed.password;


      model.login.permitLogin(parsed)
      .then(function(user) {
        if (user.length === 0) {
          res.status(500).send('Something broke! Please try again.');
        } else {
          bcrypt.compare(password, user[0]['password'], function(err, match) {
            if (match) {
              util.createSession(req, res, user);
              setTimeout(function() {
                res.status(200).send(req.sessionID)
              }, 1000);
            } else {
              res.status(500).send('Password does not match');
            }
          })
        }
      })
    }
  },
  
  itinerary: {
    get: function(req, res) {
      model.itinerary.get();      
    },
    post: function(req, res) {
      model.itinerary.post();
    },
    put: function(req, res) {
      model.itinerary.put();   
    },
    delete: function(req, res) {
      model.itinerary.delete();
    }
  },

  list: {
    post: function(req, res) {
      var parsed = JSON.parse(req.body.data);
      model.list.post(parsed)
      .then(function() {
        model.list.get();
        res.status(200);
      })
    }
  },

  api: {
    AutocompleteYelp: function (req, res) {
      console.log("Trying to work on a  AutocompleteYelp call.");
      var query = req.query.search; //Parses the url yelp?search=deli
      model.api.yelp.AutocompleteYelp(query, req, res);
    },
    ReviewsYelp: function (req, res) {
      console.log("Trying to work on a  AutocompleteYelp call.");
      var query = req.query.search; //Parses the url ReviewsYelp?search=deli
      model.api.yelp.ReviewsYelp(query, req, res);
    },
    BusinessYelp: function (req, res) {
      console.log("Trying to work on a  BusinessYelp call.");
      
      var query = req.query; //Parses the url BusinessYelp?search=?13028373
      model.api.yelp.BusinessYelp(query, req, res);
    },
    PhoneSearchYelp: function (req, res) {
      console.log("Trying to work on a  PhoneSearchYelp call.");
      var query = req.query.search; //Parses the url PhoneSearchYelp?search=?13028373
      model.api.yelp.PhoneSearchYelp(query, req, res);
    },
    getAuth2Token: function (req, res) {
      console.log("Trying to work on a  PhoneSearchYelp call.");
      var query = req.query.search; //Parses the url getAuth2Token?search=?13028373
      model.api.yelp.getAuth2Token(query, req, res);
    },
    map: function (req, res) {
      model.api.map();
    }
  }
}