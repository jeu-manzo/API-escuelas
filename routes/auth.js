const router =  require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {registerValidation, loginValidation} = require('../validation');


//Register User
router.post('/register', async (req, res) => {
  //validate before saving
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (error) return res.status(400).send({
    error: {
      message: error.details[0].message
    }
  });

  //check if user already is in db
  const emailExist = await User.findOne({email: req.body.email});
  if (emailExist) return res.status(400).send('Email already exists');

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
    name: req.body.name,
    status: req.body.status
  });
  try{
    const savedUser =  await user.save();
    res.send({ user: user._id });
  }catch(err){
    res.status(400).send(err);
  }
});

//Login User
router.post('/login', async (req,res) => {
  //validate before saving
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user already is in db
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email does not exist');

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Create and assign token
  const token = jwt.sign({_id: user._id}, config.SECRET_TOKEN);
  res.header('auth-token', token).send({ token });
})

module.exports = router;
