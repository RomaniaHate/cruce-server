var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
var port = process.env.PORT || 3000;
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var cards;
var types;
var db;
var requests = require('./config/requests.js');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api/cards', function(req, res) {
  requests.getCards(function(cards) {
    res.json(cards);
  });
});

app.post('/api/newgame', function(req, res) {
  var type =  req.body.type;
  requests.newGame(function(created) {
    if(created){
      return res.send(created);
    }
  });
});

app.listen(port, function () {

});