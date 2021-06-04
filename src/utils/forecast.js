const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dd2045b32e9616ce5aa029b750174095&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&units=m`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // for low level errors (when error exists and response does not)
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      // other errors
      callback("Unable to find location", undefined);
    } else {
      const data = body.current;
      callback(undefined, {
        description: `It is currently ${data.weather_descriptions[0].toLowerCase()} with ${
          data.temperature
        } degrees outside. It feels like ${data.feelslike} degrees out`,
        image: data.weather_icons,
      });
    }
  });
};

module.exports = forecast;
