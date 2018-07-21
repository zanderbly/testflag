const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect('mongodb://localhost/FYF_test');
  mongoose.connection
    .once('open', () => 
    {console.log('connected to testDB'), done();})
    .on('error', err => {
      console.warn('Warning', error);
    });
});

beforeEach(done => {
  const { users } = mongoose.connection.collections;
  users.drop()
    //.then(() => users.ensureIndex({ 'geometry.coordinates': '2dsphere'}))
    .then(() => done())
    .catch(() => done());
});
