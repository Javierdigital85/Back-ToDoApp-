const { generateToken } = require("../config/tokens");
const { User } = require("../models");
const errors = require("../const/errors");

//CONTROLADOR DE USUARIOS
module.exports = {
  register: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (error) {
      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) return res.sendStatus(401);
      const isValid = await user.validatePassword(password);

      if (!isValid) {
        return res.sendStatus(401);
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
    const userId = req.params.userId;
    try {
      const user = await User.findByPk(userId);
      if (!user) return next(errors.usuarioInexistente);
      res.send(user);
    } catch (error) {
      return next(error);
    }
  },

  todos: async (req, res) => {
    try {
      const user = await User.findAll();
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  },

  eliminar: async (req, res) => {
    const userId = req.params.userId;
    try {
      await User.destroy({ where: { id: userId } });
      res.send(202);
    } catch (error) {
      res.sendStatus(500);
    }
  },

  // obtenerEmpleados: async (req, res) => {
  //   try {
  //     const employee = await User.getEmployees();
  //     res.send(employee);
  //   } catch (error) {
  //     res.status(500).send("Error interno del servidor");
  //   }
  // },
};
