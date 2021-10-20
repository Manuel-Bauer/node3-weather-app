const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibWFudWI4OSIsImEiOiJja3RoaTF0cm4wc2F0MnBtcnlmY2RsZHhsIn0.z4LS548WlPUhaB52VDFz9Q&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to location services`, undefined);
    }
    if (body.features.length === 0) {
      callback(`Unable to find location. Try another search`, undefined);
    } else {
      const [longitude, latitude] = body.features[0].center;
      const { place_name: location } = body.features[0];
      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};

module.exports = geocode;
