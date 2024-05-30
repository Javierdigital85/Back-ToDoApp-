const Joi = require("joi");

let register = Joi.object({
  name: Joi.string().required(),
  profesion: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(10).required(),
  age: Joi.number().required(),
  country: Joi.string().required(),
  // celphone: Joi.number().required(),
});

module.exports = {
  register,
};
