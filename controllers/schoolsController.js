const mongoose = require("mongoose");
const reviewController = require("./reviewController");
const School = mongoose.model("School");
const Review = mongoose.model("Review");

exports.getSchools = async (req, res, next) => {
  var schools = await School.find();
  res.json(schools);
};

exports.getSingleSchool = async (req, res, next) => {
  var singleSchool = await School.findById(req.params.id);

  var reviews = await Review.find({ schoolId: singleSchool.schoolId });
  singleSchool.reviews = reviews;

  res.json(singleSchool);
};

exports.getSchoolsByGoogleIds = async (req, res, next) => {
  // ?googleId=id1,id2,id3
  if (
    typeof req.query.googleIdList === "undefined" ||
    !req.query.googleIdList
  ) {
    throw "googleIdList is required as a query string parameter";
  }

  const idList = req.query.googleIdList.split(",");

  var schools = await School.find({
    googleId: {
      $in: idList
    }
  });

  res.json(schools);
};

exports.createSchools = async (req, res, next) => {
  // req.body: { schools: [] }
  let schoolsFromBody = req.body.schools.concat();
  const googleIds = schoolsFromBody.map(e => e.googleId);
  var schools = await School.find({
    googleId: {
      $in: googleIds
    }
  });

  const savedGoogleIds = schools.map(e => e.googleId);

  schoolsFromBody = schoolsFromBody.filter(e => savedGoogleIds.indexOf(e.googleId) === -1);

  if(schoolsFromBody.length === 0) {
    res.send("All schools were already in the database, no schools saved");
    return;
  }

  await School.create(schoolsFromBody);
  res.send("Schools saved successfully");
};
