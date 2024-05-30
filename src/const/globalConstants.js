require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  SECRET: process.env.SECRET,
  ENVIRONMENT: process.env.ENVIRONMENT,
  HOST: process.env.HOST,
  DIALECT: process.env.DIALECT,
};
