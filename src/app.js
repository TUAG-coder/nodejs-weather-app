const express = require('express'); // this will return a function which will be stored in "express"
const path = require('path');
const app = express();  // store our application in app
const hbs = require('hbs');   // to use hbs.registerPartials()
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//as I'm hosting my application on Heroku, heroku can configure the PORT on which our server shpuld listen to as my script will be running on their environment
const port = process.env.PORT || 3000;  


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')  // going to the directory where all the .html files are
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars and views location
// we setup handlebars coz we want to have dynamic web pages
app.set('view engine', 'hbs'); // telling express which template engine to use
app.set('views', viewsPath); // express looks only for "views" folder so we need to setup views directory manually

// setup static directory to serve
//app.use() is used a middleware function to our Express app
// express.static() is a built-in middleware to serve static files
app.use(express.static(publicDirectoryPath));

hbs.registerPartials(partialsPath);

// setting up routes
// with "render" we can render one of our views...since in this case we've configured express to use view engien hbs with render we can
// render one of our handlebar templates.

//app.get() responds only to GET HTTP requests
app.get('', (req, res) => {
  res.render('index', {   // 1st argument will contain the name of the view
    title: 'Weather',
    name: 'Tushar Agarwal'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message1: 'Need some help?',
    message2: 'Help page soon will be fully functioning',
    name: 'Tushar Agarwal'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Tushar Agarwal'
  })
})

app.get('/weather', (req, res) => {      // fetch() in fetch.js will trigger the "localhost:3000/weather?address=location" link 

  if (!req.query.address) {   // localhost:3000/weather?address=location
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



app.listen(port, () => {                        // for starting up the server
  console.log("Server is up on port " + port);
})
