const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const cors = require("cors");
const BodyParser = require("body-parser");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//Connect to DB
mongoose
  .connect(process.env.DB_CONN, { useNewUrlParser: true })
  .then(bd => console.log("DB is connected"))
  .catch(err => console.log(err));
    // import models
require("./models/schools");
//Import Routes
const authRoute = require('./routes/auth');
const reviewsAuth = require('./routes/reviews');
const reviewSchools = require("./routes/reviewSchoolsRouter");
const schools = require("./routes/schoolsRouter");

//Middleware
app.use(express.json());
//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/reviews', reviewsAuth);
app.use('/api/reviewsSchools',reviewSchools);
app.use('/api/schools', schools);

app.listen(config.port, () => console.log("Server running..."))
