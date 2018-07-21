const teams = require('../models/team')


module.exports = {

  findAll(req, res) {
    teams.find(req.query)
      .then(teamModel => res.json(teamModel))
      .catch(err => res.status(422).json(err));
  },

  getTeamsByLeague(req, res) {
    teams.find()
      .where({ league: req.params.league })
      .then(teamModel => {
        res.json(teamModel)
      })
      .catch(err => res.status(422).json(err));
  },

  create(req, res, next) {
    const teamProps = req.body;

    teams.create(teamProps)
      .then(team => res.send(team))
      .catch(next);

  },

  edit(req, res, next) {
    const teamId = req.params.id;
    const teamProps = req.body;

    teams.findByIdAndUpdate({ _id: teamId }, teamProps)
      .then(() => teams.findById({ _id: teamId }))
      .then(team => res.send(team))
      .catch(next);
  },

  delete(req, res, next) {
    const teamId = req.params.id;

    teams.findByIdAndRemove({ _id: teamId })
      .then(team => res.status(204).send(team))
      .catch(next);
  }
};