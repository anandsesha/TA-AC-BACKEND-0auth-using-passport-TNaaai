var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var UserOAuth = require('../models/UserOAuth');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/usersOauth/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var profileData = {
        name: profile.displayName,
        email: profile._json.email,
        username: profile.username,
        photo: profile._json.avatar_url,
      };
      try {
        var user = await UserOAuth.findOne({ email: profile._json.email });
        console.log(`USerrrrrrrrrrrrrrr` + user);
      } catch (err) {
        console.error('Error while querying the database:', err);
        return done(err);
      }
      // Before saving the obtained userInfo, check if the user exists in the db. If not create and save.

      if (!user) {
        var createdUser = await UserOAuth.create(profileData);
        console.log(`Created User is:--------` + createdUser);
        done(null, createdUser);
      } else {
        done(null, user);
      }
    }
  )
);

console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  var foundUser = await UserOAuth.findById(id);
  console.log(`FOundUSerrrrrrrrrrr` + foundUser);
  done(null, foundUser);
});
