var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/User');

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      var profileData = {
        name: profile.displayName,
        email: profile._json.email,
        username: profile.username,
        photo: profile._json.avatar_url,
      };

      // Before saving the obtained userInfo, check if the user exists in the db. If not create and save.
      var user = await User.findOne({ email: profile._json.email });
      if (!user) {
        var createdUser = await User.create(profileData);
        done(null, createdUser);
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  var foundUser = await User.findById(id);
  done(null, foundUser);
});
