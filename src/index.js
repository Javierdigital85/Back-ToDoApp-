const app = require("./app");
const db = require("./db");
const globalConstants = require("./const/globalConstants");

const port = process.env.PORT || globalConstants.PORT;
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost";

db.sync({ force: false }).then(() => {
  app.listen(port, host, () => {
    console.log(`La aplicación está escuchando en el puerto: ${port}`);
  });
});
