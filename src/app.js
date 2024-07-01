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
const passport = require("passport");
const session = require("express-session");
require("./utils/pasaporte");

// const authRoutes = require("./routes/authRoutes");
//const passportUtil = require("./utils/passport");

const configuracionApi = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // passportUtil(app);
  // passport(app);
  app.use(morgan("tiny"));
};

const configuracionRouter = (app) => {
  app.use("/api/", routerConfig.rutas_init());
  app.use(function (req, res, next) {
    next(createError(404)); //si no se encuentra la ruta, se envia un error 404
  });
  app.use(errorHandler);
};

const app = express(); //crea una instancia de express
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));
configuracionApi(app); //configurar la api
configuracionRouter(app); //configurar las rutas

// db.sync({ force: false }).then(() => {
//   app.listen(globalConstants.PORT);
//   console.log(
//     "la aplicacion esta escuchando en el puerto: " + globalConstants.PORT
//   );
// });

module.exports = app;
