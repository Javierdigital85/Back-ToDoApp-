// const express = require("express");
// const router = express.Router();
// const globalConstants = require("../const/globalConstants");
// const { OAuth2Client } = require("google-auth-library");

// router.post("/", async function (req, res) {
//   const redirectUrl = "http://localhost:8000/oauth";
//   const oAuth2Client = new OAuth2Client(
//     globalConstants.CLIENT_ID,
//     globalConstants.CLIENT_SECRET,
//     redirectUrl
//   );

//   const authorizeUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: "https://www.googleapis.com/auth/userinfo.profile openid",
//     prompt: "consent",
//   });
//   res.json({ url: authorizeUrl });
// });

// module.exports = router;
