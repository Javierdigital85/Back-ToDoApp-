//requerimos express
const express = require("express");
const globalConstants = require("./const/globalConstants");
const routerConfig = require("./routes/index.routes");
const db = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./middleware/error");
let createError = require("http-errors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerConfig = require("../swaggerConfig");

const configuracionApi = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(morgan("tiny"));
};

const configuracionRouter = (app) => {
  app.use("/api", routerConfig.rutas_init());
  app.use(
    "/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJSDoc(swaggerConfig))
  );
  app.use(function (req, res, next) {
    next(createError(404)); //si no se encuentra la ruta, se envia un error 404
  });
  app.use(errorHandler);
};

const app = express(); //crea una instancia de express
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));
configuracionApi(app); //configurar la api
configuracionRouter(app); //configurar las rutas

module.exports = app;
