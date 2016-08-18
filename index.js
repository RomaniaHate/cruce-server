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

app.get('/', function (req, res) {
  res.send('Hello World!');
});

MongoClient.connect('mongodb://root:toor@ds161175.mlab.com:61175/heroku_1tq03tlx', function (err, database) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Connection established.');
    db = database;
    cards = db.collection("Cards");
    types = db.collection("Types");
  }
});

app.get('/api/cards', function (req, res) {
  res.contentType('application/json');
  cards.aggregate([
    {
      '$group': {
        '_id': '$_id',
        'card': {
          '$push': {
            'name': '$name',
            'value': '$value',
            'img': '$img',
            'type': '$tpye',
          }
        }
      }
    }
  ]).toArray(function (err, items) {
    console.log(items);
    res.send(JSON.stringify(items));
  });
});

app.post('/api/set-tromf', function(req, res) {
  var id;
  var x = 0;
  var type =  req.body.type;
  types.find({"type": type}).toArray(function (err, items) {
    var typeID = items[0]["_id"];
    types.update(
        {'_id': new ObjectId(typeID)},
        {$set: {'isTromf': 1}}
    );
  });
  cards.find({"type": type}).toArray(function (err, items) {
    while (x < items.length) {
      id = items[x]["_id"];
      x++;
      console.log(id);
      cards.update(
          {'_id': new ObjectId(id)},
          {$set: {'isTromf': 1}}
      );
    }
    res.send("ok");
  });
});

app.listen(port, function () {
  console.log('Example app listening on port '+ port);
});