const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
    try {

        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) throw createError.Unauthorized("Token Required!");

        token = bearerHeader.split(" ")[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const verifyEmail = await User.findOne({ email: decoded.email });
        if (!verifyEmail) throw createError.Unauthorized("Unauthorized!");
        next();

    } catch (error) {

        return res.status(401).json({ success: false, msg: error.message });

    }
}
module.exports = { isAuthenticated }