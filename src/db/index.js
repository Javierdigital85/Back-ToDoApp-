// CONECCION A LA BASE DE DATOS
const globalConstants = require("../const/globalConstants");
const Sequelize = require("sequelize");

let sequelize;

if (globalConstants.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: globalConstants.TEST_DB_DIALECT,
    host: globalConstants.TEST_DB_HOST,
    username: globalConstants.TEST_DB_USERNAME,
    password: globalConstants.TEST_DB_PASSWORD,
    database: globalConstants.TEST_DB_NAME,
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    globalConstants.DB_NAME,
    globalConstants.DB_USERNAME,
    globalConstants.DB_PASSWORD,

    {
      dialect: globalConstants.DIALECT, //TIPO DE BASE DE DATOS QUE NOS CONECTAMOS
      host: globalConstants.HOST,
      port: globalConstants.PORT,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Ajusta esto según tus necesidades de seguridad
        },
      },
      logging: false,
    }
  );
}
module.exports = sequelize;
