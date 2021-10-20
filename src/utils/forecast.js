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
      const {
        weather_descriptions,
        temperature,
        feelslike,
        humidity,
        uv_index,
      } = body.current;
      callback(
        undefined,
        `${weather_descriptions}: It is currently ${temperature}°C, which feels like ${feelslike}°. Humidity is at ${humidity}% with an UV index of ${uv_index}.`
      );
    }
  });
};

module.exports = forecast;
