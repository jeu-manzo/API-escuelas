const express = require("express");
const router = express.Router();
const { catchErrors } = require("../handlers/errorHandler");
const verifyToken = require("./verifyToken");
const reviewsController = require("../controllers/reviewController");

/* GET home page. */
// query string ?schoolId={schoolId}
router.get("/", catchErrors(reviewsController.getReviews));

// get by googleId
router.get(
  "/schoolGoogleId/:id",
  catchErrors(reviewsController.getReviewsBySchoolGoogleId)
);

router.get("/:id", catchErrors(reviewsController.getSingleReview));

router.post(
  "/",
  verifyToken,
  catchErrors(reviewsController.createReviews)
);

router.put(
  "/:id",
  verifyToken,
  catchErrors(reviewsController.updateReview)
);

router.delete(
  "/:id",
  verifyToken,
  catchErrors(reviewsController.deleteReview)
);

module.exports = router;
