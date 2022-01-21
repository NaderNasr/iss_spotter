const {
  nextISSTimesForMyLocation
} = require('./iss_promised');

const passes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    passes(passTimes);
  })
  .catch((err) => {
    console.log(`Something went wrong: ${err.message}`);
  });
