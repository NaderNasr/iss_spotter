const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org?format=json';
  request(url, (err, res, body) => {
    
    if (err) {
      callback(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // return IP through callback
    const data = JSON.parse(body);
    const ip = data.ip;
    callback(null, ip);
    
    

  });
};

module.exports = { fetchMyIP };