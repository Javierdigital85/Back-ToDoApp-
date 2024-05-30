//SE ENCARGA DE CONECTAR TODAS LAS RUTAS
const express = require("express");
const router = express.Router();
const usuarioRouter = require("./usuario.routes");
const taskRouter = require("./tasks.routes");

const rutas_init = () => {
  router.use("/usuarios", usuarioRouter);
  router.use("/tasks", taskRouter);

  return router;
};

module.exports = { rutas_init };
