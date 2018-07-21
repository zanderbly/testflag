const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const fs = require('file-system');

//enter this line into the terminal to add teams.json data to mongoDB:
// root_dir$ mongoimport --db fyf_teams_db --type --json --file teams.json 

mongoose.Promise = global.Promise;

// var teamDB = 'mongodb://localhost/fyf_teams_db'

// before(done => {
//   mongoose.connect('teamDB');
//   mongoose.connection
//     .once('open', () => 
//     {console.log('connected to tDB'), done();})
//     .on('error', err => {
//       console.warn('Warning', error);
//     });
// });


const PointSchema = new Schema({
  type: { type: String, default: 'Point'},
  coordinates: {type: [Number], index: '2dshpere'}
});

const teamSchema = new Schema({
  name: {
    type: String
  },
  League: {
    type: String    
  },
  geometry: PointSchema
});

const Team = mongoose.model('team', teamSchema);

module.exports = Team;