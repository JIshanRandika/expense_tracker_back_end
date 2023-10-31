const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {

    const accessToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });

    return { token: accessToken };

}

const generateRefreshToken = (user) => {

    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });

    return { token: refreshToken };

}

const verifyToken = (token) => {


}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}
