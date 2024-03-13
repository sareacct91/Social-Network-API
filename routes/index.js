const router = require('express').Router();
const apiRoutes = require('./api');
const seed = require('../utils/seed/seed');

router.use('/api', apiRoutes);
router.patch('/seed', seed)

module.exports = router;