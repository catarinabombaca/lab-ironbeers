const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:
app.get('/beers/beer-:id', (req, res) => {
  const { id } = req.params;
  punkAPI
    .getBeer(id)
    .then(beer => {
      console.log(beer);
      res.render('random-beer', { beer });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log(beer);
      res.render('random-beer', {beer});
    })
    .catch(error => console.log(error));
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beers) => {
      console.log(beers);
      res.render('beers', {beers});
  }).catch(error => console.log(error))
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(8000, () => console.log('🏃‍ on port 8000'));
