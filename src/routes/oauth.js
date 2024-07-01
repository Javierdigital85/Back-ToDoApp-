// const express = require("express");
// const router = express.Router();
// const globalConstants = require("../const/globalConstants");
// const { OAuth2Client } = require("google-auth-library");
// const axios = require("axios");

// async function getUserData(access_token) {
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
//     );
//     const data = response.data;
//     console.log("User data", data);
//   } catch (error) {
//     console.log("Error al hacer el axios", error);
//   }
// }

// router.get("/", async function (req, res, next) {
//   const code = req.query.code;
//   try {
//     const redirectUrl = "http://localhost:8000/tasklist";
//     const oAuth2Client = new OAuth2Client(
//       globalConstants.CLIENT_ID,
//       globalConstants.CLIENT_SECRET,
//       redirectUrl
//     );
//     const res = await oAuth2Client.getToken(code);
//     await oAuth2Client.setCredentials(res.tokens);
//     console.log("Tokens acquired");
//     const user = oAuth2Client.credentials;
//     console.log("credentials", user);
//     await getUserData(user.access_token);
//   } catch (err) {
//     console.log("Error with signing with Google");
//   }
// });

// module.exports = router;
