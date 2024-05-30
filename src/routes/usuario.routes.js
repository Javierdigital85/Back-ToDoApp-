//RUTAS DE LOS USUARIOS
const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario.controller");
const { validateUser } = require("../middleware/auth");
const validate = require("../middleware/validate");
const usuarioSchema = require("../middleware/schemes/usuario.scheme");

router.post(
  "/register",
  validate(usuarioSchema.register),
  usuarioController.register
);
router.post("/login", usuarioController.login);
router.post("/logout", usuarioController.logout);
router.get("/me", validateUser, usuarioController.me);
router.get("/todos", usuarioController.todos);
router.get("/usuario/:userId", usuarioController.listarInfo);
router.delete("/:userId", usuarioController.eliminar);

// router.get("/employee", usuarioController.obtenerEmpleados);

module.exports = router;
