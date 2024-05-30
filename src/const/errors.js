module.exports = {
  validationError: {
    code: 422,
    message: "Error de validacion",
  },
  faltanCampos: {
    code: 422,
    message: "Faltan Campos Necesarios",
  },
  usuarioInexistente: {
    code: 404,
    message: "El usuario no existe",
  },
  tareaEliminada: {
    code: 404,
    message: "La tarea ya fue inexistente",
  },
  Notfound: {
    code: 404,
    message: "Not Found",
  },
  tareaCreada: {
    code: 405,
    message: "La tarea ya existe",
  },
  tareaActualizada: {
    code: 404,
    message: "La tarea no se puede actuaizar, porque no existe",
  },
};
