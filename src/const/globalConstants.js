require("dotenv").config();


module.exports = {
 // Development
 DB_USERNAME_DEV: process.env.DB_USERNAME_DEV,
 DB_PASSWORD_DEV: process.env.DB_PASSWORD_DEV,
 DB_NAME_DEV: process.env.DB_NAME_DEV,
 HOSTDEV: process.env.HOSTDEV,
 ENVIRONMENT_TESTING: process.env.ENVIRONMENT_DEV,
 SECRET: process.env.SECRET,
 ENVIRONMENT_DEV: process.env.ENVIRONMENT_DEV,
 // Production
 DIALECT: process.env.DIALECT,
 HOST: process.env.HOST,
 DB_PORT: process.env.DB_PORT || 5000,
 DB_USERNAME: process.env.DB_USERNAME,
 DB_NAME: process.env.DB_NAME,
 DB_PASSWORD: process.env.DB_PASSWORD,
 // Frontend URL
 FRONTEND_URL: process.env.FRONTEND_URL,
 // Nodemailer
 NODEMAILER_HOST: process.env.NODEMAILER_HOST,
 NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
 NODEMAILER_PASS: process.env.NODEMAILER_PASS,
 // Client config
 CLIENT_ID: process.env.CLIENT_ID,
 CLIENT_SECRET: process.env.CLIENT_SECRET,
 SESSION_SECRET: process.env.SESSION_SECRET,
 CLIENT_URL: process.env.CLIENT_URL,
 DB_USERNAME: process.env.DB_USERNAME,
 ENVIRONMENT: process.env.ENVIRONMENT_DEV,
 NODE_ENV: process.env.NODE_ENV,
 DB_PORT: process.env.DB_PORT,
 // Testing
 TEST_DB_NAME: process.env.TEST_DB_NAME,
 TEST_DB_USERNAME: process.env.TEST_DB_USERNAME,
 TEST_DB_PASSWORD: process.env.TEST_DB_PASSWORD,
 TEST_DB_HOST: process.env.TEST_DB_HOST,
 TEST_DB_DIALECT: process.env.TEST_DB_DIALECT,
};
