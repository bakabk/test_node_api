var bodyParser = require('body-parser');
var express = require('express');

var app = express();

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
  res.send(artists)
});

app.get('/artists/:id', function(req, res){
  console.log(req.params)

  var artist = artists.find(function(artist){
    return artist.id === Number(req.params.id)
  })

  res.send(artist)
})

app.post('/artists', function(req, res){
  var artist = {
    id: Date.now(),
    name: req.body.name
  }
  artists.push(artist)

  res.send(artists)
})

app.put('/artists/:id', function(req, res){
  var artist = artists.find(function(artist){
    return artist.id === Number(req.params.id)
  })
  artist.name = req.body.name;
  res.sendStatus(200)
})

app.delete('/artists/:id', function(req, res){
  artists = artists.filter(function(artist){
    return artist.id !== Number(req.params.id)
  })
  res.sendStatus(200)
})

app.listen(3012, function(){
  console.log('API STARTED')
})
