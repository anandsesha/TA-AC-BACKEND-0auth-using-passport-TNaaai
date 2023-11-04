var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo');
var flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersOauthRouter = require('./routes/usersOauth');

var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
const auth = require('./middlewares/auth');

var app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/blogApplication-OAUth')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => console.log(err));

// Require the passport module
require('./modules/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session placed after cookieParser() and before accessing usersRouter below
//Session created below
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/blogApplication-OAUth',
    }),
  })
);

//Now we already have session created above and inside user route we have put userid inside session. So we can access the user's info using this userid
// by passing the userid to userInfo function created inside the auth middleware and then call the individula routes like /users, /articles or /comments
app.use(auth.userInfo);

//Intializes Passport for incoming requests, allowing authentication strategies to be applied
app.use(passport.initialize());
// Middleware that will restore login state from a session
app.use(passport.session());

app.use(flash());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/usersOauth', usersOauthRouter);
app.use('/articles', articlesRouter);

//for any comment to be made we need to be authenticated user.
app.use(auth.loggedInUser);
app.use('/comments', commentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
