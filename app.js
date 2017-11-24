var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var validator = require('express-validator');

var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

require('./passport');
var config = require('./config');

// routefiles
var indexRoutes = require('./routes/index');
var authRoutes = require('./routes/auth');
var sessionRoutes = require('./routes/session');
var aboutRoutes = require('./routes/about');
var contactRoutes = require('./routes/contact');

// Connect to NoSQL DB
var promise = mongoose.connect(config.mongoDB.dbConnString, {useMongoClient: true});

// Use native promises: http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

// models
global.User = require('./models/user');
global.Session = require('./models/session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// loading all partials
hbs.registerPartials(__dirname + '/views/partials');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// session configuration
app.use(session({
  secret: config.mongoDB.sessionKey,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// create session variable, if user is authenticated
app.use(function(req, res, next) {
  if(req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
});

// form validation
app.use(validator());

// make routes available
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/session', sessionRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
