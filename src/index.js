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

// const app = require("./app");
// const db = require("./db");
// const globalConstants = require("./const/globalConstants");
// const dotenv = require("dotenv");

// // Cargar variables de entorno según el entorno actual
// dotenv.config({
//   path: globalConstants.ENVIRONMENT === "test" ? ".env.test" : ".env",
// });

// // Función para iniciar la aplicación
// async function startApp() {
//   try {
//     // Sincronizar la base de datos
//     await db.sync({ force: globalConstants.ENVIRONMENT === "test" }); // Fuerza la sincronización en entorno de prueba

//     // Iniciar la aplicación

//     app.listen(globalConstants.PORT, () => {
//       console.log(
//         `La aplicación está escuchando en el puerto: ${globalConstants.PORT}`
//       );
//     });
//   } catch (error) {
//     console.error("Error al iniciar la aplicación:", error);
//   }
// }

// // Lógica para manejar entornos de desarrollo, prueba y producción
// if (require.main === module) {
//   startApp(); // Iniciar la aplicación principal
// }

// // Exportar la aplicación para pruebas (opcional)
// module.exports = app;
