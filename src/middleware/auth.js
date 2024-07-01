const { validateToken } = require("../config/tokens");

const validateUser = (req, res, next) => {
  const token = req.cookies.token;
  //Verifica si existe el token
  if (!token) return res.sendStatus(401);
  //Valida el token y obtiene el usuario
  const { user } = validateToken(token);
  //Verifica si el usuario es valido
  if (!user) return res.sendStatus(401);
  //estable req.user con el usuario validado
  req.user = user;
  //llama al siguiente middleware
  next();
};

module.exports = { validateUser };
