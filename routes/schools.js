const express = require("express");
const router = express.Router();
const schoolsController = require("../controllers/schoolsController");
const { catchErrors } = require("../handlers/errorHandler");
const authController = require("../controllers/authController");

/* GET home page. */
router.get("/", authController.validateIdToken, catchErrors(schoolsController.getSchols));

router.get("/:id",authController.validateIdToken, catchErrors());

module.exports = router;