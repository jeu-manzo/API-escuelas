//Validation
const Joi = require('@hapi/joi');


//Register Validation
const registerValidation = data => {
  const schema = {
    email: Joi.string()
          .required()
          .email(),
    password: Joi.string()
          .min(6)
          .required(),
    name: Joi.string()
          .min(6)
          .required(),
    status: Joi.string()
          .required()
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    email: Joi.string()
          .required()
          .email(),
    password: Joi.string()
          .min(6)
          .required()
  };
  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
