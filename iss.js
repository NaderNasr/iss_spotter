const request = require("request");

const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';
  request(url, (err, res, body) => {

    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching geo location from IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  let lat = coords.lat;
  let long = coords.long;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`;
  request(url, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} invalid geo location parameters Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ISS = JSON.parse(body).response;
    callback(null, ISS);

  });
};

module.exports = { fetchISSFlyOverTimes};
