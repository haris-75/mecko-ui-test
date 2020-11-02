
const jwt = require('jsonwebtoken');
const AppConfig = require("../config/app");

module.exports = (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, AppConfig.JWT_SECRET);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            error
        });
    }
};