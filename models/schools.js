const mongoose = require("mongoose");
mongoose.promise = global.Promise;
var exports = module.exports = {};

const reviewSchema = new mongoose.Schema({
    userId:String,
    adminScore:Number,
    extracurricularScore:Number,
    teachersScore:Number,
    bullyingScore:Number,
    securityScore:Number,
    groupSizeScore:Number,
    score:Number,
    createdOn: {
        type: Date,
        default: Date.now
      },
    textComment:String
    })
    

const schoolSchema =  new mongoose.Schema({
    googleId:String,
    name:String,
    reviews: [reviewSchema],
    lastSearch: Date
}) 


exports.review = mongoose.model("Review", reviewSchema);

exports.school = mongoose.model("School", schoolSchema) 