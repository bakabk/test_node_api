var express = require('express');
var bodyParser = require('body-parser');
var artistsController = require('./controllers/artists')

var db = require('./db');

var app = express();
var url = 'mongodb://localhost:27017/';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//test GET api
app.get('/', function(req, res){
  res.send('Hellow API!')
});

//getAll GET artist
app.get('/artists', artistsController.all);

//find GET artist
app.get('/artists/:id', artistsController.findById)

//add POST artists
app.post('/artists', artistsController.create)

//updatre PUT artist
app.put('/artists/:id', artistsController.update)

//delete DELETE artis
app.delete('/artists/:id', artistsController.delete)

db.connect(url, function (err, database) {
  if (err) {
    return console.log(err);
  }

  app.listen(3012, function () {
    console.log('API app started!');
    console.log('Mongo started!');
    console.log('NEW ENV', process.env.PRIVAT_KEY);
  })
})
