const jwt = require('jsonwebtoken');
const User = require('../model/user.model');



const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Assuming the token is in the format "Bearer token"
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (user) {
                const admin = await User.findOne({ _id: user.id });
                if (admin) {
                    req.user = user
                    next();
                } else {
                    return res.status(403).json({ msg: "Admin doens't Exist, authorization denied." });
                }
            } else {
                return res.status(403).json({ msg: "Token is not valid!" });
            }
        });
    } else {
        return res.status(401).json({ msg: "No authentication token, authorization denied." });
    }
};

module.exports = verifyToken;