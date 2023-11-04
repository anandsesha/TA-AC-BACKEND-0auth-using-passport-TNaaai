var express = require('express');
var router = express.Router();
var UserOAuth = require('../models/UserOAuth');
const passport = require('passport');

router.get('/', (req, res, next) => {
  console.log(req.session, req.user, res.locals.user);
  res.send('in userOauth path');
});

// Routes for passport authentication success/failure
router.get('/success', function (req, res, next) {
  res.render('success');
});
router.get('/failure', function (req, res, next) {
  res.render('failure');
});

//When this below endpoint is hit (which is triggered by an <a> in index.ejs) we will pass the control over to passport which will talk to GitHub Server
router.get('/auth/github', passport.authenticate('github'));

// GitHub will get back on this route
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/users',
  }),
  (req, res, next) => {
    console.log(req.session, req.user, res.locals);
    // res.locals.user = req.user;
    res.redirect('/articles');
  }
);

router.get('/logout', async (req, res, next) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.redirect('/users');
});

module.exports = router;
