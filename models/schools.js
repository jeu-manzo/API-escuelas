const mongoose = require("mongoose");
mongoose.promise = global.Promise;

const schoolSchema =  new mongoose.Schema({
    googleId:String,
    name:String,
    reviews: [reviewSchema]
}) 

const reviewSchema = new mongoose.Schema({
userId:String,
adminScore:Number,
extracurricularScore:Number,
teachersScore:Number,
bullyingScore:Number,
securityScore:Number,
groupSizeScore:Number,
createdOn: {
    type: Date,
    default: Date.now
  },
textComment:String
})

module.exports = mongoose.model("School", schoolSchema) 