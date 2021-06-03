const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoieW91c3NlZmdlbmR5IiwiYSI6ImNrcGJ3cWMyYzBtd3kydm80OHB0amY3b2MifQ.orSlIOE_elvruYz4YOCSSg&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Error: Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Error: Unable to find location. Try another search", undefined);
    } else {
      data = {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
