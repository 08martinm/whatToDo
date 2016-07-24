var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = require('./router.js');
var session = require('express-session');
// var partials = require('express-partials');


var app = express();
var port = 3000;

// app.set('views', __dirname + '/../Client');
// app.set('view engine', 'jsx');
// var options = {presets: ['react', 'es2016']}
// app.engine('jsx', require('express-react-views').createEngine(options));
// app.use(partials());
app.use(session({
  secret: 'ldsfkjfqwrpweoiuv45wlkjsf48zjvfasdlk',
  resave: false,
  saveUninitialized: true
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