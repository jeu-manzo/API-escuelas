const mongoose = require("mongoose");
mongoose.promise = global.Promise;
var exports = module.exports = {};

const reviewSchema = new mongoose.Schema({
    schoolId:String, // school's _id
    schoolGoogleId:String,
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
    
const newsSchema = new mongoose.Schema({
    schoolId:String, // school's _id
    schoolGoogleId:String,
    title:String,
    link: String,
    text:String,
    img:String 
})
    

const schoolSchema =  new mongoose.Schema({
    googleId:String,
    name:String,
    score:Number,
    lastSearch: Date,
}) 


exports.news = mongoose.model("News", newsSchema);

exports.review = mongoose.model("Review", reviewSchema);

exports.school = mongoose.model("School", schoolSchema) 