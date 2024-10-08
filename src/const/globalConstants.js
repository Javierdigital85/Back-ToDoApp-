require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  SECRET: process.env.SECRET,
  ENVIRONMENT: process.env.ENVIRONMENT,
  HOST: process.env.HOST,
  DIALECT: process.env.DIALECT,
  DB_PASSWORD: process.env.DB_PASSWORD,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  SESSION_SECRET: process.env.SESSION_SECRET,
  CLIENT_URL: process.env.CLIENT_URL,
  NODE_ENV: process.env.NODE_ENV,
  TEST_DB_NAME: process.env.TEST_DB_NAME,
  TEST_DB_USERNAME: process.env.TEST_DB_USERNAME,
  TEST_DB_PASSWORD: process.env.TEST_DB_PASSWORD,
  TEST_DB_HOST: process.env.TEST_DB_HOST,
  TEST_DB_DIALECT: process.env.TEST_DB_DIALECT,
  DB_PORT: process.env.DB_PORT,
  FRONTEND_URL: process.env.FRONTEND_URL
};
