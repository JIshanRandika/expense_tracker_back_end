const express = require("express");
const router = express.Router();

//create controler instance
const AuthController = require("../controllers/authController");


router.post('/register', AuthController.registration)
router.post('/login', AuthController.login)


module.exports = router;