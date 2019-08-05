const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const cors = require("cors");
const BodyParser = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//Import Routes
const authRoute = require('./routes/auth');
const reviewsAuth = require('./routes/reviews');
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//Connect to DB
mongoose
  .connect(process.env.DB_CONN, { useNewUrlParser: true })
  .then(bd => console.log("DB is connected"))
  .catch(err => console.log(err));
    // import models
require("./models/School");

//Middleware
app.use(express.json());
//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/reviews', reviewsAuth);

app.listen(config.port, () => console.log("Server running..."))
