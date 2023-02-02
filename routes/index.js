const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const articlesRouter = require("./article.route");
const tagsRouter = require("./tag.route");

/* GET home page. */
router.use("/users", usersRouter);

router.use("/articles", articlesRouter);

router.use("/tags", tagsRouter);

module.exports = router;
