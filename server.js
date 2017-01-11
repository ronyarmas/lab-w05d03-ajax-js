var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

// middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Static Routes
// GET '/' => '/public/index.html'
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// Data
var challenges = require('./lib/challenges');
// GET '/challenges' =>
// Dynamic Routes

var counter = 4;

app.get('/challenges', function(req, res) {
 if(req.query.next) {
  res.json(challenges.slice(counter, counter+2));
    counter+=2;
 } else {

  var fourChal = challenges.slice(0,4);
  console.log(fourChal);
  res.json(fourChal);
  }
})

// app.get('https://mighty-caverns-93139.herokuapp.com/help', function(req, res) {
//   // res.redirect('https://mighty-caverns-93139.herokuapp.com/help');
//   console.log(req.body)
// })



var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});

