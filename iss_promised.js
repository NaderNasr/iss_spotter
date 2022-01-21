const reqPromise = require('request-promise-native');

const fetchMyIP = () => {
  return reqPromise(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  const url = `https://freegeoip.app/json/${ip}`;
  return reqPromise(url);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return reqPromise(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = {
  nextISSTimesForMyLocation
};
