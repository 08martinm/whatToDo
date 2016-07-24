var model = require('./model.js');
var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var util = require('./lib/utility.js');
var session = require('express-session');


module.exports = {
  // default: function(req, res) {
  //   var url = path.resolve(__dirname, '../Client', 'index.html');
  //   res.sendFile(url, null, function(err) {
  //     console.log('redirected');
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       res.status(200).end();
  //     }
  //   })
  // },

  signup: {
    get: function(req, res) {
      res.render('/Signup.jsx'); /* REDIRECT if static page; RENDER if new view */
    },
    post: function(req, res) {
      var parsed = JSON.parse(req.body.data);
      var username = parsed.username;
      var password = parsed.password;
      model.signup.permitSignup(parsed)
      .then(function(bool) {
        console.log('result from controller signup.post is', bool);
        if (!!bool) {
          bcrypt.hash(password, null, null, function(err, hash) {
            model.signup.post({username: username, password: hash})
            .then(function(user) {
              console.log('user in controller signup.post.bcrypt is', user);
              res.status(200).send('/home')
              util.createSession(req, res, user);
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
      res.redirect('./index.html'); /* REDIRECT if static page; RENDER if new view */
    },
    post: function(req, res) {
      console.log('req.body from controller login.post is', req.body);
      var parsed = JSON.parse(req.body.data);
      var username = parsed.username;
      var password = parsed.password;

      model.login.permitLogin(parsed)
      .then(function(user) {
        console.log('result from controller login.post (user) is', user);
        console.log('password is', password);
        console.log('\ndatabase pw is', user[0]['password']);
        if (user.length === 0) {
          res.status(500).send('Something broke! Please try again.');
        } else {
          bcrypt.compare(password, user[0]['password'], function(err, match) {
            console.log('match is', match);
            if (match) {
              util.createSession(req, res, user);
              console.log('should render main page');
              res.status(200).send('/home');
            } else {
              console.log('password does not match');
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