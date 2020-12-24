const express = require('express'); // this will return a function which will be stored in "express"
const path = require('path');
const app = express();  // store our application in app
const hbs = require('hbs');   // to use hbs.registerPartials()
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')  // going to the directory where all the .html files are
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
app.set('view engine', 'hbs'); // telling express which tempplate engine to use
app.set('views', viewsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsPath);

// setting up routes

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Tushar Agarwal'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is some helpful text',
    name: 'Tushar Agarwal'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Tushar Agarwal'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      Error: 'Please provide address in the search box!'
    })
  }
  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        Error: error
      })
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }
      res.send({
        Location: data.location,
        forecastData
      });
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Tushar Agarwal',
    errorMessage: 'Help article not found.'
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Tushar Agarwal',
    errorMessage: 'Page not found.'
  })
})



app.listen(3000, () => {                        // for starting up the server
  console.log("Server is up on port 3000");
})
