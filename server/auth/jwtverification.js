const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req, res, next) => {
    const body = req.body
    const token = body.token
    if (!token) {
        return res.status(403).json({
            success: false,
            msg: "A token is required for authentication"}
        );
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            success: false,
            msg: "Invalid Token"
        });
    }
    return next();
}

module.exports = verifyJWT