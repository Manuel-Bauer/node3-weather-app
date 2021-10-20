const request = require("request");

const forecast = (longitude, latitude, callback) => {
  url = `http://api.weatherstack.com/current?access_key=01cfb61c63b5db277432950d3dcd821e&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Weather service unavailable. Try again soon.`, undefined);
    }
    if (body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        `${weather_descriptions}: It is currently ${temperature}, which feels like ${feelslike}`
      );
    }
  });
};

module.exports = forecast;
