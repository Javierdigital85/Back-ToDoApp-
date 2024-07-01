const { validateToken } = require("../config/tokens");

const validateGoogleUser = async (req, res) => {
  const googleToken = req.cookies.googleToken;
  if (!googleToken) return res.sendStatus(401);

  try {
    const userData = await validateToken(googleToken);
    req.user = userData;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = validateGoogleUser;
