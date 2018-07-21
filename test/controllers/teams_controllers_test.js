const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

const team = mongoose.model('team');
describe('teams Controller', () => {
  it('POST to /api/teams creates a new team', done => {
    team.count().then(count => {   
    request(app)
      .post('/api/teams')
      .send({ name: 'Tempe Tests'})
      .end(() => {
        team.count().then(newCount => {
          assert(count + 1 === newCount);    
        done();
        });
      });
    });
  });

  it('PUT to /api/teams/id edits an existing team', done => {
    const team = new team({ name: 'Tempe Tests'});

    team.save().then(() => {
      request(app)
        .put(`/api/teams/${team._id}`)
        .send({ team: 'Mesa Moles'  })
        .end(() => {
          team.findOne({ id: '_id'})
            .then(team => {
              assert(team.name === 'Mesa Moles');
              done();
            });
        });
    });
  });

  it('DELETE to /api/teams/id can delete an existing team', done => {
    const team = new team({ name: 'Tempe Tests'});

    team.save().then(() => {
      request(app)
      .delete(`/api/teams/${team._id}`)
      .end(() => {
        team.findOne({ names: 'Tempe Tests'})
          .then((team) => {
            assert(team === null);
            done();
        });
      });
    });
  });

  it('GET to /api/teams finds teams in a location', done => {
    const seattleteam = new team({
      name: 'sonics',
      geometry: { type: 'Point', coordinates:[-122.4759902, 47.6147628] }
    });
    const miamiteam = new team({
      name: 'fish',
      geometry:{ type: 'Point', coordinates: [-80.253, 25.791]}
    });

    Promise.all([ seattleteam.save(), miamiteam.save()])
    .then(() => {
      request(app)
        .get('/api/teams?lng=-80.1=25.78')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].obj.name !== 'sonics');
          //console.log(response);
          done();
        });
    });
  });
});