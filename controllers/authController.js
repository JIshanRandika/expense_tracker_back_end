const User = require("../models/userModel");
const createError = require('http-errors');
const { userSchema } = require("../helpers/schemaValidations");
const jwtHelper = require("../helpers/jwtTokenHelper");
const bcrypt = require("bcrypt");

const registration = async (req, res, next) => {
    try {

        const validated_vals = await userSchema.validateAsync(req.body);
        const user = new User(validated_vals);
        const result = await user.save();
        const accesstoken = await jwtHelper.generateAccessToken(result);
        const refreshtoken = await jwtHelper.generateRefreshToken(result);
        res.status(200).json({ success: true, tokens: { accesstoken: accesstoken.token, refreshtoken: refreshtoken.token }, data: result });

    } catch (error) {

        //check wether is error is unprocessable error
        if (error.isJoi === true) error.status = 422;
        next(error)

    }

}

const login = async (req, res, next) => {

    try {

        const userexists = await User.findOne({ email: req.body.email })
        if (!userexists) throw createError.BadRequest("Check Your Email!");
        const checkpass = await bcrypt.compare(req.body.password, userexists.password);
        if (!checkpass) throw createError.BadRequest("Check Your Password!");

        const accesstoken = await jwtHelper.generateAccessToken(userexists);
        const refreshtoken = await jwtHelper.generateRefreshToken(userexists);
        res.status(200).json({ success: true, tokens: { accesstoken: accesstoken.token, refreshtoken: refreshtoken.token }, data: userexists });

    } catch (error) {
        next(error)
    }
}


module.exports = {
    registration,
    login

}