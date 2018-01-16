var express = require('express');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;

var db = require('./db');

var app = express();
var url = 'mongodb://localhost:27017/';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res){
  res.send('Hellow API!')
});

var artists = [
  {
    id: 1,
    name: 'Metallica'
  },
  {
    id: 2,
    name: 'Iron Maden'
  },
  {
    id: 3,
    name: 'Deep Purple'
  }
];

app.get('/artists', function(req, res){
  db.get().collection('artists').find().toArray(function(err, docs){
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  })
});

//get GET artist
app.get('/artists/:id', function (req, res) {
  db.get().collection('artists').findOne({ _id: ObjectID(req.params.id) }, function (err, doc) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  })
})

//add POST artists
app.post('/artists', function (req, res) {
  var artist = {
    name: req.body.name
  };

  db.get().collection('artists').insert(artist, (err, result) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  })
})

app.put('/artists/:id', function (req, res) {
  db.get().collection('artists').update(
    { _id: ObjectID(req.params.id) },
    { name: req.body.name },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    })
})

app.delete('/artists/:id', function(req, res){
  db.get().collection('artists').deleteOne(
    { _id: ObjectID(req.params.id) },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    }
  )
})

db.connect(url, function (err, database) {
  if (err) {
    return console.log(err);
  }
  // db = database.db("mydb");
  app.listen(3012, function () {
    console.log('API app started');
    console.log('Mongo started');
  })
})
