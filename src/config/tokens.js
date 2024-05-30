const jwt = require("jsonwebtoken");
const globalConstants = require("../const/globalConstants");

//genera el token
const generateToken = (payload) => {
  const token = jwt.sign({ user: payload }, globalConstants.SECRET, {
    expiresIn: "2d",
  });
  return token;
};
//el método verify comprueba que el token no haya sido alterado
const validateToken = (token) => {
  return jwt.verify(token, globalConstants.SECRET);
};

module.exports = { generateToken, validateToken };
