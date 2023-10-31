const express = require("express");
const router = express.Router();


//create controler instance
const UserController = require("../controllers/userController");


router.post('/', UserController.createUser)
router.get('/', UserController.getUsers)
router.get('/:id', UserController.getOneUser)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router;