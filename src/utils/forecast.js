const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude +'&lon=' + longitude + '&units=metric&appid=8b17801b53a57d5f015ba3ee697f651d';
  request({url: url, json: true}, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    }
    else if (response.body.error || response.body.message) {
      callback("Unable to find weather conditions", undefined);
    }
    else {
      callback(undefined, {
        Temperature: response.body.main.temp + '°C',
        Relative_Humidity : response.body.main.humidity + '%'
      });
    }
  })
};

module.exports = forecast;
