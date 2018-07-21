const user = require('../models/user')

module.exports = {
  

  index(req, res, next) {
    const { lng, lat } = req.query;
    const point = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };
    user.aggregate([
      {
        $geoNear: {
          near: point,
          spherical: true,
          maxDistance: 200000,
          distanceField: 'dist.calculated'
        }
      }
    ])
    .then((users) => {
      res.send(users);
    })
    .catch(next);
  },

  create: function(req, res) {
   user.User
    .create(req.body)
    .then( userModel => res.json(userModel))
    .catch(err => res.status(422).json(err));
  },

  getUser: function(req, res) {
    user.findOne(req.query)
    .where({email: req.params.email})
    .then(userModel => res.json(userModel))
    .catch(err => res.status(422).json(err));
  },

  getAllUsers(req, res) {
    user.find(req.query)
      .then(userModel => {
        res.json(userModel);})
      .catch(err => console.log(err));
  },

  getUsersByTeam(req, res) {
    user.find(req.query)
    .where({teams : req.params.team})
    .then(userModel => {
      res.json(userModel)})
    .catch(err => res.status(422).json(err));
  },

  addTeamsToUser(req, res) {
     user.findOneAndUpdate({ email:  req.userEmail }, {  teams: decodeURI(req.teamPicked) })
    .then( user => res.status(202).send(user))
    .catch(err => res.status(422).json(err));
     },

  addUserTeam(req, res) {
    user.findOneAndUpdate({ email: req.params.userEmail}, req.body)
    .then(userModel => res.json(userModel))
    .catch(err => res.status(422).json(err));
  },

  edit(req,res,next) {
    const userId = req.params.id;
    const userProps = req.body;
    user.findByIdAndUpdate({ _id: userId }, userProps)
      .then(() => user.findById({ _id: userId }))
      .then(user => res.send(user))
      .catch(next);
  },

  delete(req, res, next) {
    const userId = req.params.id;
    
    user.findByIdAndRemove({ _id: userId })
    .then( user => res.status(204).send(user))
    .catch(next);
  }
};