const router = require('express').Router();
const userRoutes = require('./user');
const thoughtRoutes = require('./thoughts');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
