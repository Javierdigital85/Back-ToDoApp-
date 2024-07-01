const Joi = require("joi");

let register = Joi.object({
  name: Joi.string().required(),
  profesion: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(12).required(),
  country: Joi.string().required(),
});

module.exports = {
  register,
};
