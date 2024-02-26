const userService = require('../service/user.service');
const userController = {}

userController.adminSignup = async (req, res) => {
    userService.adminSignup(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}

userController.verifyOTP = async (req) => {
    userService.verifyOTP(req, res).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}

userController.resendOtp = async (req, res) => {
    userService.resendOtp(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}

userController.adminLogin = async (req, res) => {
    userService.adminLogin(req).then((response) => {
        res.status(response.status).json(response);
    }).catch((error) => {
        res.status(500).json({ msg: "Internal Server Error...", data: error });
    });
}


module.exports = userController;