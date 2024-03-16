const router = require('express').Router();
const c = require('../../controller/thoughtControllers');


router.route('/')
  .get(c.findThoughts)
  .post(c.createThought)

router.route('/:thoughtId')
  .get(c.findOneThought)
  .put(c.updateThought)
  .delete(c.deleteThought)

router.route('/:thoughtId/reactions')
  .post(c.addReaction)
  .delete(c.deleteReaction)

module.exports = router;