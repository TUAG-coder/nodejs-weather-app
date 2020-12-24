const request = require('request');

const geocode = ((address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidC11LXMtaC1hLXIiLCJhIjoiY2tpbWN0cmoyMGRvczJ2cXMwemx5MGRqbSJ9.C0IQPR72JBXKNqZGg16KiQ&limit=1';
  request({url: url, json: true}, (error, response) => {
    if (error) {                         // if network is not available
      callback("Unable to connect to the geocoding service", undefined);
    }
    else if (response.body.message) {        // eg: if wrong link is given
      callback("Can't fetch the location, try another search.", undefined);
    }
    else if (!response.body.query[0]) {          // if we gave localhost:3000/weather/address=!
      callback("Unable to find location. Try another search.", undefined);
    }
    else {
      callback(undefined, {                              // if we gave localhost:3000/weather/address=Lucknow
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  })
});

module.exports = geocode;
