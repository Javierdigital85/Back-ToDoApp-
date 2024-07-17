const errors = require("../const/errors");

module.exports = function (err, req, res, next) {
  let response = {
    success: false,
    error: {
      code: err.code || 500,
      message: err.message || "Internal sever error",
    },
  };

  if (err.isJoi) {
    //isJoi es una propiedad específica de la librería Joi para indicar u error determinado
    //pregunta si el error fue de validacion
    let validationErrorType = err.details[0].type;
    let errorKey = "validationError";
    //pregunta si los campos estan completos
    if (validationErrorType === "any.required") {
      errorKey = "faltanCampos";
    }
    // aqui accedo con dototation a las propiedades de arriba!
    response.error.code = errors[errorKey].code;
    response.error.message = errors[errorKey].message;
  }

  // if (errors[err.message]) {
  //   response.error.code = errors[err.message].code;
  //   response.error.message = errors[err.message].message;
  // }

  // // Manejo específico para error de tarea inexistente
  // if (err.message === errors.tareaInexistente.message) {
  //   response.error.code = errors.tareaInexistente.code;
  //   response.error.message = errors.tareaInexistente.message;
  // }
  // if (err.message === errors[err.message]) {
  //   response.error.code = errors[err.message].code;
  //   response.error.message = errors[err.message].message;
  // }
  // if (err.message === "Not Found") {
  //   let errorKey = "Notfound";
  //   response.error.code = errors[errorKey].code;
  //   response.error.message = errors[errorKey].message;
  // }

  res.status(response.error.code).json(response);
};
