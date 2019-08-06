const express = require("express");
const router = express.Router();
const schoolsController = require("../controllers/schoolsController");
const { catchErrors } = require("../handlers/errorHandler");
/* GET home page. */
router.get("/", catchErrors(schoolsController.getSchools));

router.get("/:id", catchErrors(schoolsController.getSingleSchool));

router.post("/", catchErrors(schoolsController.createSchools));

module.exports = router;
