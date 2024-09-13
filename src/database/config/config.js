require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAMEDEV,
    password: process.env.DB_PASSWORDDEV,
    database: process.env.DB_NAMEDEV,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.TEST_DB_USERNAME || "root",
    password: process.env.TEST_DB_PASSWORD || null,
    database: process.env.TEST_DB_NAME || "database_test",
    host: process.env.TEST_DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "database_production",
    host: process.env.HOST || "localhost",
    dialect: "postgres",
  },
};
