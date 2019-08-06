const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const School = mongoose.model("School");

exports.getReviews = async (req, res, next) => {
  if (typeof req.query.schoolId === "undefined" || !req.query.schoolId) {
    throw "schoolId is required in the query string";
  }

  var reviews = await Review.find({ schoolId: req.query.schoolId });
  res.json(reviews);
};

exports.getReviewsBySchoolGoogleId = async (req, res, next) => {
  var reviews = await Review.find({ schoolGoogleId: req.params.id });
  res.json(reviews);
};

exports.getSingleReview = async (req, res, next) => {
  const singleReview = await Review.findById(req.params.id);
  return singleReview;
};

exports.createReviews = async (req, res, next) => {
  let reviewFromBody = Object.assign({}, req.body);

  const score =
    (reviewFromBody.adminScore +
      reviewFromBody.extracurricularScore +
      reviewFromBody.teachersScore +
      reviewFromBody.bullyingScore +
      reviewFromBody.securityScore +
      reviewFromBody.groupSizeScore) /
    6;

  reviewFromBody.score = score;
  reviewFromBody.userId = req.user._id;

  const newReview = new Review(reviewFromBody);
  await newReview.save();

  const schoolId = reviewFromBody.schoolId;
  var schoolReviews = await Review.find({ schoolId });

  const schoolScore =
    schoolReviews
      .map(e => e.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue) /
    schoolReviews.length;

  await School.findByIdAndUpdate(schoolId, {
    score: schoolScore
  });

  res.json({
    status: "Review saved"
  });
};

exports.updateReview = async (req, res, next) => {
  let reviewFromBody = Object.assign({}, req.body);

  const score =
    (reviewFromBody.adminScore +
      reviewFromBody.extracurricularScore +
      reviewFromBody.teachersScore +
      reviewFromBody.bullyingScore +
      reviewFromBody.securityScore +
      reviewFromBody.groupSizeScore) /
    6;

  reviewFromBody.score = score;
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw "review was not found.";
  }

  await Review.findByIdAndUpdate(req.params.id, reviewFromBody);

  const schoolId = review.schoolId;
  var schoolReviews = await Review.find({ schoolId });

  const schoolScore =
    schoolReviews
      .map(e => e.score)
      .reduce((accumulator, currentValue) => accumulator + currentValue) /
    schoolReviews.length;

  await School.findByIdAndUpdate(schoolId, {
    score: schoolScore
  });

  res.json({
    status: "Review updated"
  });
};

exports.deleteReview = async (req, res, next) => {
  await Review.findByIdAndRemove(req.params.id);
  res.json({
    status: "Review deleted"
  });
};
