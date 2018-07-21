const userController = require('../../controllers/user_controllers');
const router = require("express").Router();

//Defaults to /api/user
router.route("/")
    .get(userController.getAllUsers)
    .post(userController.create);

router.route("/:team")
    .get(userController.getUsersByTeam);

router.route("/:email")
  .put(userController.addTeamsToUser);

router.route("/:email")
    .get(userController.getUser);

router.route("/:id")
      .put(userController.addUserTeam);



module.exports = router;