// const errors = require("../const/errors");
// const { User } = require("../models");
// const { OAuth2Client } = require("google-auth-library");

// const clientId =
//   "1065357848546-u8k0oc8ad4aoaamtrnkl0qn8ui6osg2j.apps.googleusercontent.com";

// const authClient = new OAuth2Client(clientId);

// module.exports = {
//   login: async (req, res) => {
//     try {
//       const { idToken } = req.body;
//       if (idToken) {
//         const ticket = await authClient.verifyIdToken({
//           idToken,
//           audience: clientId,
//         });
//         const payload = ticket.getPayload();
//         // console.log(response);
//         const { email_verified, email, name, picture } = ticket.payload;
//         if (email_verified) {
//           const user = await User.findOne({ where: { email } });
//           if (user) {
//             return res.json(user);
//           } else {
//             const password = email + clientId;
//             const newUser = await User.create({
//               email,
//               name,
//               picture,
//               password,
//             });
//             res.json(newUser);
//           }
//         } else {
//           res.status(400).json({ error: "Emailnot verified" });
//         }
//       } else {
//         res.status(400).json({ error: "Missing idToken" });
//       }
//     } catch (error) {
//       console.log("Error de autenticacion", error);
//     }
//   },

//   logout: async (req, res) => {
//     if (req.session) {
//       req.session.destroy((err) => {
//         if (err) {
//           return res.status(500).json({ error: "Logout error" });
//         }
//         res.clearCookie("connect.sid", { path: "/" });
//         res.redirect("http://localhost:5173"); // Redirigir al cliente después del cierre de sesión
//       });
//     } else {
//       res.redirect("http://localhost:5173");
//     }
//   },

//   welcome: async (req, res) => {
//     if (req.session.loggedin) {
//       res.json({ message: "Welcome", user: req.session.user });
//     } else {
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   },

//   obtenerProfile: async (req, res) => {
//     try {
//       if (req.session.loggedin) {
//         // Suponiendo que tienes un modelo de Sequelize llamado User
//         const userData = await User.findOne({
//           where: { id: req.session.userId },
//         });
//         if (userData) {
//           res.json(userData); // Enviar los datos como JSON
//         } else {
//           res.status(404).json({ error: "Usuario no encontrado" });
//         }
//       } else {
//         res.status(401).json({ error: "Acceso denegado" });
//       }
//     } catch (error) {
//       console.log("Error al obtener el perfil:", error);
//       res.status(500).json({ error: "Error interno del servidor" });
//     }
//   },

//   datos: async (req, res) => {
//     scope[("email", "profile")];
//     // Manejar la redirección después de la autenticación exitosa
//     res.redirect("/tasklist"); // Por ejemplo, redirigir al inicio de la aplicación
//   },

//   callback: async (req, res) => {
//     req.session.loggedin = true;
//     return res.redirect("/welcome");
//   },
// };
