const mongoose = require("mongoose");
const News = mongoose.model("News");
const School = mongoose.model("School");

exports.getNews = async (req, res, next) => {
  var news = await News.find();
  res.json(news);
};

exports.getSingleNews = async (req, res, next) => {
  var singleNew = await News.findById(req.params.id);

  

  res.json(singleNew);
};

exports.createNews = async (req, res, next) => {
  // req.body: { schoolId:id, schoolGoogleId:id, news: [] }
  const schoolsFromBody = req.body.schools.concat();
 
};