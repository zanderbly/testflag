const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const user = mongoose.model('user');
describe('users Controller', () => {
  it('POST to /api/users creates a new user', done => {
    user.count().then(count => {   
    request(app)
      .post('/api/users')
      .send({ email:'test@test.com'})
      .end(() => {
        user.count().then(newCount => {
          assert(count + 1 === newCount);    
        done();
        });
      });
    });
  });

  it('PUT to /api/users/id edits an existing user', done => {
    const user = new user({ email: 't@t.com', driving: false});

    user.save().then(() => {
      request(app)
        .put(`/api/users/${user._id}`)
        .send({ driving: true })
        .end(() => {
          user.findOne({ email: 't@t.com'})
            .then(user => {
              assert(user.driving === true);
              done();
            });
        });
    });
  });

  it('DELETE to /api/users/id can delete an existing user', done => {
    const user = new user({ email: 's@s.com'});

    user.save().then(() => {
      request(app)
      .delete(`/api/users/${user._id}`)
      .end(() => {
        user.findOne({ email: 's@s.com'})
          .then((user) => {
            assert(user === null);
            done();
        });
      });
    });
  });

  it('GET to /api/users finds users in a location', done => {
    const seattleuser = new user({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates:[-122.4759902, 47.6147628] }
    });
    const miamiuser = new user({
      email: 'miami@test.com',
      geometry:{ type: 'Point', coordinates: [-80.253, 25.791]}
    });

    Promise.all([ seattleuser.save(), miamiuser.save()])
    .then(() => {
      request(app)
        .get('/api/users?lng=-80.1=25.78')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].obj.email !== 'miami@test.com');
          //console.log(response);
          done();
        });
    });
  });
});