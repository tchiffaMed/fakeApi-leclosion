const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tags.controllers.js");



router.get("/", tagController.list);

router.post("/", tagController.create);

router.put("/:id", tagController.update);

router.delete("/:id", tagController.delete);

module.exports = router;
