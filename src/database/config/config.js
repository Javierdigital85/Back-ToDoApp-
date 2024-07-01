const globalConstants = require("../../const/globalConstants");

module.exports = {
  development: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: globalConstants.DB_NAME,
    host: globalConstants.HOST,
    dialect: globalConstants.DIALECT,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: globalConstants.DB_USERNAME,
    password: globalConstants.DB_PASSWORD,
    database: "database_production",
    host: globalConstants.HOST,
    dialect: globalConstants.DIALECT,
  },
};
