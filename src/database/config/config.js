const globalConstants = require("../../const/globalConstants");

module.exports = {
  development: {
    username: globalConstants.DB_USERNAME,
    password: null,
    database: globalConstants.DB_NAME,
    host: globalConstants.HOST,
    dialect: globalConstants.DIALECT,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: globalConstants.HOST,
    dialect: globalConstants.DIALECT,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: globalConstants.HOST,
    dialect: globalConstants.DIALECT,
  },
}[globalConstants.ENVIRONMENT];
