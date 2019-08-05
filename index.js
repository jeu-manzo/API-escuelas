const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
//Import Routes
const authRoute = require('./routes/auth');
const reviewsAuth = require('./routes/reviews');

//Connect to DB
mongoose.connect(config.db, { useNewUrlParser: true }, () => console.log('Conected to DB'));

//Middleware
app.use(express.json());
//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/reviews', reviewsAuth);

app.listen(config.port, () => console.log("Server running..."))
