const express = require("express");
const router = express.Router();
const productController = require("../controllers/article.controllers");
const auth = require('../middlewares/auth');




router.get("/", productController.list);

router.get("/search", productController.getArticle);

router.get("/:id", productController.show);

router.post("/", productController.create);

router.put("/:id", productController.update);

router.delete("/:id", productController.delete);

module.exports = router;
