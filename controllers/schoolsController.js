const mongoose = require("mongoose");
const school = mongoose.model("School");

exports.getSchools = async (req, res, next) => {
    var schools = await schools.find({ userId: req.UserData.userId });
    res.json(school);
  };