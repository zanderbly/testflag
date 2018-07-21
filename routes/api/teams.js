const teamController = require('../../controllers/team_controllers');
const router = require("express").Router();

// "/" defaults to /api/team
router.route("/")
    .get(teamController.findAll)
    .post(teamController.create);

router.route("/:league")
    .get(teamController.getTeamsByLeague);

module.exports = router;

