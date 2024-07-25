const { generateToken, validateToken } = require("../config/tokens");
const { User } = require("../database/models");
const errors = require("../const/errors");
const usuariosServices = require("../services/usuarios.services");

//CONTROLADOR DE USUARIOS
module.exports = {
  register: async (req, res, next) => {
    try {
      const { email } = req.body;
      const userDB = await usuariosServices.findUserByEmail(email);
      if (userDB) {
        console.log(errors.usuarioRegistrado.code, "el error");
        console.log(errors.usuarioRegistrado.message, "el error");
        return res
          .status(errors.usuarioRegistrado.code)
          .send(errors.usuarioRegistrado.message);
      }

      const user = await usuariosServices.createUser(req.body);
      res.status(201);
      return res.send(user);
    } catch (error) {
      return res
        .status(errors.creacionUsuario.code)
        .send(errors.creacionUsuario.message);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await usuariosServices.findUserByEmail(email);
      if (!user) {
        return res
          .status(errors.usuarioInexistente.code)
          .send(errors.usuarioInexistente.message);
      }
      const isValid = await usuariosServices.validatePassword(user, password);

      if (!isValid) {
        return res
          .status(errors.validationError.code)
          .send(errors.validationError.message);
      }
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        lastName: user.lastName,
      };
      const token = generateToken(payload);
      res.cookie("token", token);
      return res.send({ token, ...payload });
    } catch (error) {
      return res.sendStatus(500);
    }
  },

  logout: async (req, res) => {
    res.clearCookie("token");
    return res.sendStatus(204);
  },

  me: async (req, res) => {
    return res.send(req.user);
  },

  listarInfo: async (req, res, next) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return next({
        code: errors.usuarioInexistente.code,
        message: errors.usuarioInexistente.message,
      });
    }
    try {
      const user = await usuariosServices.getUserById(userId);
      if (!user) {
        return next({
          code: errors.usuarioInexistente.code,
          message: errors.usuarioInexistente.message,
        });
      }
      return res.status(200).send(user);
    } catch (error) {
      return next(error);
    }
  },

  todos: async (req, res, next) => {
    try {
      const user = await usuariosServices.getAllUsers();
      if (user.length === 0) {
        return next({
          code: errors.usuarioInexistente.code,
          message: errors.usuarioInexistente.message,
        });
      }
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error retrieving users");
    }
  },

  eliminar: async (req, res, next) => {
    // const userId = req.params.userId;
    const { userId } = req.params;
    try {
      const user = await usuariosServices.deleteUser(userId);
      if (!user) {
        // return next(errors.usuarioInexistente.code);
        return res
          .status(errors.eliminarUsuario.code)
          .send(errors.eliminarUsuario.message);
      }
      return res.send(202);
    } catch (error) {
      return res.sendStatus(500);
    }
  },
  //Genera el link de recuperacion de contraseña y lo envia por correo
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const userEmail = await usuariosServices.forgotPassword(email);
      if (!userEmail) {
        return res.status(401);
      }
      return res.status(200).send(userEmail);
    } catch (error) {
      console.error("Error in forgotPassword controller", error);
      return res.status(500).json({ message: "internal error" });
    }
  },
  //Una vez que el usuario recibe el correo con el link para cambiar la contraseña se procede a validar el token
  validateTokenRestorePassword: async (req, res) => {
    const token = req.params.token;
    if (!token) return res.sendStatus(401);

    const { user } = validateToken(token);
    if (!user) return res.sendStatus(401);

    User.findOne({ where: { token } })
      .then((user) => {
        if (!user) return res.sendStatus(401);
        return res.send(user).status(200);
      })
      .catch((error) => {
        console.log("Error when trying to validate token", error);
        return res.status(500).send("Internal Server Error");
      });
  },

  //En el momento en que el usuario le da click para confirmar la nueva contraseña y haya pasado por la validaciones del front vuelve a verificar si el token sigue siendo valido o si ha expirado y luego se guarda la nueva contraseña
  overWritePassword: async (req, res) => {
    const id = req.params.id;
    if (!id) return res.sendStatus(401);
    User.findOne({ where: { id } })
      .then((user) => {
        if (!user) return res.sendStatus(401);
        user.token = null;
        user.password = req.body.password;
        user.save().then(() => {
          //  res.sendStatus(200);
          return res.status(200).send(user);
        });
      })
      .catch((error) => {
        return res
          .status(errors.changePassword.code)
          .send(errors.changePassword.message);
        // console.error("Error when trying to overwrite password:", error);
        // return res.status(500).send("Internal Server Error");
      });
  },

  changePassword: async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    User.findByPk(id)
      .then((user) => {
        if (!user) return res.sendStatus(401);
        user.validatePassword(oldPassword).then((isValid) => {
          if (!isValid) return res.sendStatus(401);
          user.password = newPassword;
          user.save().then(() => {
            return res.sendStatus(200);
          });
        });
      })
      .catch((error) => {
        return res.status(500).send("Internal Server Error");
      });
  },
};
