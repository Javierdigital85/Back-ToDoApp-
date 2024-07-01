const passport = require("passport");
const globalConstants = require("../const/globalConstants");
// const GoogleStrategy = require("passport-google-oauth").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: globalConstants.CLIENT_ID,
      clientSecret: globalConstants.CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/authRoutes/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
