var express = require('express');
const passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
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
  passport.authenticate('github', { failureRedirect: '/faliure' }),
  (req, res, next) => {
    res.redirect('/success');
  }
);

module.exports = router;
