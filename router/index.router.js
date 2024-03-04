const express = require('express');
const router = express.Router();
const userRoute = require('./auth.router')
const companyRoute = require('./company.router')

router.use('/api/auth', userRoute)
router.use('/api/company',)

module.exports = router;