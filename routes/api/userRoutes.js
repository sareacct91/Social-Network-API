const router = require('express').Router();
const c = require('../../controller/userControllers');

router.route('/')
  .get(c.findUsers)
  .post(c.createUser)

router.route('/:userId')
  .get(c.findOneUser)
  .put(c.updateUser)
  .delete(c.deleteUser)

module.exports = router;