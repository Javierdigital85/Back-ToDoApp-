module.exports = (schema) => {
  return (req, res, next) => {
    let result = schema.validate(req.body); //valida los datos de entrada con el esquema

    if (result.error) {
      next(result.error); //envia el error al controlador
    } else {
      next(); //si no hay error con la ejecucion continua con el controlador
    }
  };
};
