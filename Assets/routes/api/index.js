const express = require('express');
const userRoutes = require('./user');
const thoughtRoutes = require('./thoughts');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
