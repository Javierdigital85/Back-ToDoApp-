const app = require("./app");
const db = require("./db");
const globalConstants = require("./const/globalConstants");

db.sync({ force: false }).then(() => {
  app.listen(globalConstants.PORT, () => {
    console.log(
      `La aplicación está escuchando en el puerto: ${globalConstants.PORT}`
    );
  });
});
