const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const { catchErrors } = require("../handlers/errorHandler");
/* GET home page. */
router.get("/", catchErrors(newsController.getNews));

router.get("/:id", catchErrors(newsController.getSingleNews));

router.post("/", catchErrors(newsController.createNews));

module.exports = router;
