//CONECCION A LA BASE DE DATOS
const globalConstants = require("../const/globalConstants");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(globalConstants.DB_NAME, null, null, {
  dialect: globalConstants.DIALECT, //TIPO DE BASE DE DATOS QUE NOS CONECTAMOS
  host: globalConstants.HOST,
  logging: false,
});

module.exports = sequelize;
