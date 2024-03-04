const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/signup', userController.adminSignup);
router.post('/verifyotp', userController.verifyOTP);
router.post('/resentotp', userController.resendOtp);
router.post('/signin', userController.adminLogin);

module.exports = router;
