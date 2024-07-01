// const session = require("express-session");
// const passport = require("passport");
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
// const globalConstants = require("../const/globalConstants");

// const passportUtil = (app) => {
//   app.use(
//     session({
//       secret: globalConstants.SESSION_SECRET,
//       resave: false,
//       saveUninitialized: true,
//       cookie: {
//         maxAge: 1000 * 60 * 60 * 24, // 1 day
//       },
//     })
//   );
//   app.use(passport.initialize());
//   app.use(passport.session());

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: globalConstants.CLIENT_ID,
//         clientSecret: globalConstants.CLIENT_SECRET,
//         callbackURL: "http://localhost:8000/google/callback",
//         scope: ["profile", "email"],
//       },
//       (accessToken, refreshToken, profile, callback) => {
//         callback(null, profile);
//       }
//     )
//   );
//   passport.serializeUser((user, done) => {
//     done(null, user);
//   });
//   passport.deserializeUser((user, done) => {
//     done(null, user);
//   });
// };

// module.exports = passportUtil;
