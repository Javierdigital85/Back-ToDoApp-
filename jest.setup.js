const dotenv = require("dotenv");
dotenv.config({ path: ".env.test" }); // Cargar variables de entorno de prueba


jest.mock("nodemailer", () => require("./mocks/nodemailer"));
// Mockear nodemailer
jest.mock("nodemailer", () => {
  const nodemailer = jest.createMockFromModule("nodemailer");
  nodemailer.createTransport = jest.fn(() => ({
    verify: jest.fn().mockResolvedValue(true),
  }));
  return nodemailer;
});
