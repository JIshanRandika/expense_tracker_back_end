const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/isAuthenticated");


//create controler instance
const NewsController = require("../controllers/newsController");


router.post('/', isAuthenticated, NewsController.createNews)
router.get('/', NewsController.getNews)
router.get('/:id', NewsController.getOneNews)
router.put('/:id', isAuthenticated, NewsController.upadateNews)
router.delete('/:id', isAuthenticated, NewsController.deleteNews)

module.exports = router;