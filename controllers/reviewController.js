const mongoose = require("mongoose");
const review = mongoose.model("Review");

exports.readReviews = async (req, res, next) => {
    var review = await review.find({ userId: req.UserData.userId });
    res.json(review);
  };

  exports.createReviews=  (req, res, next) => {
    res.json({
      status: "comment saved"
    });
  };



exports.updateReview = async (req, res, next) => {
    var review = await schools.find({
      userId: req.UserData.userId,
      _id: req.params.id
    });
  
    if (!review) {
      throw "Note wasn't found for current user.";
    }
  
    await review.findByIdAndUpdate(req.params.id, req.body);
    res.json({
      status: "Note is update"
    });
  };


  
exports.deleteReview = async (req, res, next) => {
    var review = await Note.find({
      userId: req.UserData.userId,
      _id: req.params.id
    });
  
    if (!review) {
      throw "Note wasn't found for current user.";
    }
    
    await Note.findByIdAndRemove(req.params.id);
    res.json({
      status: "Note deleted"
    });
  };