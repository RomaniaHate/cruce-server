var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://root:toor@ds161175.mlab.com:61175/heroku_1tq03tlx';

app.get('/', function (req, res) {
  res.send('Hello World!');
});

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Connection established.', url);
    db.close();
  }
});

app.listen(port, function () {
  console.log('Example app listening on port '+ port);
});