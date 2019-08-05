const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandler");
const authController = require("../controllers/authController");
const reviewsSchool = require("../controllers/reviewController");

/* GET home page. */
router.get("/", authController.validateIdToken, catchErrors(reviewsSchool.readReviews));

router.get("/:id",authController.validateIdToken, catchErrors());

router.post("/",authController.validateIdToken, catchErrors(reviewsSchool.createReviews));

router.put("/:id",authController.validateIdToken, catchErrors(reviewsSchool.updateReview));

router.delete("/:id",authController.validateIdToken, catchErrors(reviewsSchool.delete));

module.exports = router;