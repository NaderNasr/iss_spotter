const {
  fetchISSFlyOverTimes
} = require('./iss');

const coords = {
  lat:'43.6426',
  long:'-79.4002'
};
fetchISSFlyOverTimes(coords, (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});