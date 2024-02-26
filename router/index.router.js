const express = require('express');
const router = express.Router();
const userRoute = require('./auth.router')

router.use('/api/auth', userRoute)

module.exports = router;