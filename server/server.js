var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./router.js');
var session = require('express-session');

var app = express();
var port = 3000;

app.use(session({
  secret: 'foo',
  resave: true,
  domain: 'http://127.0.0.1:3000',
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 30,
    httpOnly: false,
    secure: true
  }
}))

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/', router);

//Start Enable CORS: 
//http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
//End Enable CORS
// below may change to compiled folder for react
app.use(express.static(__dirname + '/../Client')); 

app.listen(port, function() {
  console.log('Server listening on port', port);
});