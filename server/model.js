var Promise = require('bluebird').Promise;
var db = require('./db/dbHandler.js');
var query = Promise.promisify(db.query, {context: db});
// var insert = Promise.promisify(db.insert, {context: db});
var request = require("request");

db.connect(function(error) {
  if (error) {
    throw error;
  }
  console.log('connection made! (yayyyy)');
});

module.exports = {
  signup: {
    permitSignup: function(data) {
      return query('SELECT username FROM Users WHERE Users.username = ' + "'" + data.username + "'")
        .then(function(pass) {
          console.log('Model signup.permitSignup function returned', pass);
          if (pass.length === 0) {
            return true;
          }
          return false;
        })
    },

    post: function(data) {
      //check database for existing username
        //if username is available add to our database
        //if username is unavailable send status back to controller
      return query("INSERT INTO Users (username, password) VALUES ('" + 
                    data.username + "', '" + data.password + "')")
      //The below can be commented out or deleted when finished
      .then(query("SELECT * FROM Users WHERE Users.username = '" + data.username + "'")
      .then(function(result) {
        console.log('result from model signup.post is', result);
        return result;
      }))
    }
  },
  
  login: {
    permitLogin: function(data) {
      return query('SELECT * FROM Users WHERE Users.username = ' + "'" + data.username + "'")
        .then(function(user) {
          console.log('Model login.permitLogin function returned', data);
          if (user.length === 0) {
            return false;
          }
          return user;
        })
    }
  },
  
  itinerary: {
    get: function(data) {
     
    },
    post: function(data) {

    },
    put: function(data) {
 
    },
    delete: function(data) {
 
    }
  },

  list: {
    post: function(data) {
      console.log('we made it into model list.post; about to query db');
      var queryStr = "INSERT INTO Itineraries (name, activities) \
      VALUES ('" + data.name + "', '" + data.list + "')";

      return query(queryStr).then(function(res) {
        console.log('res from model list.post after query is', res);
      })
    }
  },

 /*******************************
  ** Yelp API V-3.0
  ** More information from:
  **https://github.com/Yelp/yelp-api-v3
  *********************************/


  api: {
    yelp: {
      //Variables 
      variables: {
        
        latitude: '37.786942',
        longitude: '-122.399643',
        client_id: 'VUXzKET78wCT7c3pNJUnBw',
        client_secret: 'vlb246EXCC22gOAqsMIhABe9xQ4EW0wjtce0QTdpRmWWTVpKKy5mjiKw9G1T5yCB',
        grant_type: 'client_credentials',
        token: 'hFQ6jjmOTu7GRsziD9SCEBjPZ9g5t_fmi3-c6sGd1WgJkE1HhUoKYZqLAcsbE8nNODp260qUIYmSRYoYvnPj0eKp8m0qstkWa_AFjLUru3VYtioz0T2nw_HUOFCNV3Yx'
      },

      /**
       * Provide autocomplete suggestions for businesses, search keywords and categories.
       * @param {string} keyword -ex: "pi"
       * @return {object} with possible searches "pizza" etc.
       */
      AutocompleteYelp: function (keyword, req, res) {
        var options = {
          method: 'GET',
          url: 'https://api.yelp.com/v3/autocomplete',
          qs: { text: keyword, latitude: this.variables.latitude, longitude: this.variables.longitude },
          headers:
          {
            'postman-token': 'd0a9f9b7-5001-76c0-c6db-afd3e8201d99',
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + this.variables.token
          }
        };

        //Sending information back to Client 
        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          //console.log("AutocompleteYelp sending back: ", body);
          res.send(body);
        });

      },
      /**
  * Return up to 3 review excerpts for a business.
  * @param {string} businessID ex: "tonys-pizza-napoletana-san-francisco"
  * @return {object} ex: 3 excerpts for a business
  */
      ReviewsYelp: function (businessID, req, res) {
        var options = {
          method: 'GET',
          url: 'https://api.yelp.com/v3/businesses/' + businessID + '/reviews',
          headers:
          {
            'postman-token': 'd0a9f9b7-5001-76c0-c6db-afd3e8201d99',
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + this.variables.token
          }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log("YelpAPI: Sending ReviewsYelp result. ")
          res.send(body);
        });
      },
      /**
   * Return rich business data, such as photos, Yelp rating, price levels and hours of operation.
   * @param {string} term ex: "pizza"
   * @return {object} business object
   */
      BusinessYelp: function (term, req, res) {

        var options = {
          method: 'GET',
          url: 'https://api.yelp.com/v3/businesses/search',
          qs: term,
          headers:
          {
            'postman-token': 'd0a9f9b7-5001-76c0-c6db-afd3e8201d99',
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + this.variables.token
          }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log("YelpAPI: Sending BusinessYelp result. ")
          res.send(body);
        });

      },

      /**
       * Search for businesses using a phone number.
       * @param {string} phone number ex: "+14157492060"
       * @return {object} business object
       */
      PhoneSearchYelp: function (phoneNumber, req, res) {
        var options = {
          method: 'GET',
          url: 'https://api.yelp.com/v3/businesses/search/phone',
          qs: { phone: phoneNumber },
          headers:
          {
            'postman-token': 'd0a9f9b7-5001-76c0-c6db-afd3e8201d99',
            'cache-control': 'no-cache',
            authorization: 'Bearer ' + this.variables.token
          }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log("YelpAPI: Sending PhoneSearchYelp result. ")
          res.send(body);
        });

      },

      /************************
      ** getAuth2Token-
      *************************/
      getAuth2Token: function (term, req, res) {
        var options = {
          method: 'POST',
          url: 'https://api.yelp.com/oauth2/token',
          headers:
          {
            'content-type': 'application/x-www-form-urlencoded',
            'postman-token': 'ad5f2b01-ece6-95da-0644-0b488007bf61',
            'cache-control': 'no-cache'
          },
          form:
          {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'client_credentials'
          }
        };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
          console.log("YelpAPI: Sending getAuth2Token ")
          res.send(body);
        });
      }
    }


  },
  map: function (data) {

  }
}
