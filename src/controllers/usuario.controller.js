const { generateToken } = require("../config/tokens");
const { User } = require("../database/models");
const errors = require("../const/errors");

//CONTROLADOR DE USUARIOS
module.exports = {
  register: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userDB = await User.findOne({ where: { email: email } });
      if (userDB) {
        res.status(400);
        return res.send(errors.usuarioRegistrado);
      }
      const user = await User.create(req.body);
      res.status(201);
      return res.send(user);
    } catch (error) {
      return res.send(errors.creacionUsuario);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email: email },
      });
      // if (!user) return res.sendStatus(401);
      if (!user) {
        return res
          .status(errors.usuarioInexistente.code)
          .send(errors.usuarioInexistente.message);
      }
      const isValid = await user.validatePassword(password);

      if (!isValid) {
        return res
          .status(errors.faltanCampos.code)
          .send(errors.faltanCampos.message);
      }
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      res.send(payload);
    } catch (error) {
      res.sendStatus(500);
    }
  },

  logout: async (req, res) => {
    res.clearCookie("token");
    res.sendStatus(204);
  },

  me: async (req, res) => {
    res.send(req.user);
  },

  listarInfo: async (req, res, next) => {
    const userId = Number(req.params.userId);
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return next(errors.usuarioInexistente.code);
      }
      return res.status(200).send(user);
    } catch (error) {
      return next(error);
    }
  },

  todos: async (req, res, next) => {
    try {
      const user = await User.findAll();
      if (user.length === 0) {
        return next(errors.usuarioInexistente.code);
      }
      res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error retrieving users");
    }
  },

  eliminar: async (req, res, next) => {
    const userId = req.params.userId;
    try {
      await User.destroy({ where: { id: userId } });
      if (!userId) {
        return next(errors.usuarioInexistente.code);
      }
      res.send(202);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
