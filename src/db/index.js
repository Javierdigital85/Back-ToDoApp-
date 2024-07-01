// CONECCION A LA BASE DE DATOS
const globalConstants = require("../const/globalConstants");
const Sequelize = require("sequelize");
// const config = require("../database/config/config");

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
      logging: false,
    }
  );
}
module.exports = sequelize;

// const Sequelize = require("sequelize");
// const globalConstants = require("../const/globalConstants");

// // Definir la configuración para diferentes entornos
// const dbConfig = {
//   development: {
//     database: globalConstants.DB_NAME,
//     username: null,
//     password: null,
//     dialect: globalConstants.DIALECT,
//     host: globalConstants.HOST,
//     logging: false,
//   },
//   test: {
//     database: globalConstants.DB_NAME_TEST,
//     username: null,
//     password: null,
//     dialect: globalConstants.DIALECT,
//     host: globalConstants.HOST,
//     logging: false,
//   },
//   production: {
//     database: process.env.DB_NAME,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     dialect: process.env.DB_DIALECT,
//     host: process.env.DB_HOST,
//     logging: false,
//   },
// };

// const env = process.env.NODE_ENV || "development";
// const config = dbConfig[env];

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   {
//     dialect: config.dialect,
//     host: config.host,
//     logging: config.logging,
//   }
// );

// module.exports = sequelize;
