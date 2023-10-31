const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/isAuthenticated");


//create controler instance
const ExpensesController = require("../controllers/expensesController");


router.post('/', isAuthenticated, ExpensesController.createExpenses)
router.get('/', ExpensesController.getExpenses)

module.exports = router;
