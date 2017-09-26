var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/login')
  .get(function(req, res, next) {
    res.render('login', { title: 'Account sign in'});
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
})

router.route('/register')
  .get(function(req, res, next) {
    res.render('register', { title: 'Sign up to CodaSession' });
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Please provide your name').notEmpty();
    req.checkBody('email', 'Please provide your email').isEmail();
    req.checkBody('password', 'Please provide your password').notEmpty();
    req.checkBody('password', 'Please provide a matching password').equals(req.body.confirmPassword).notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      res.render('register', {
        name: req.body.name,
        email: req.body.email,
        errorMessages: errors
      });
    } else {
      var user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      user.setPassword(req.body.password);
      user.save(function(err) {
        if (err) {
          res.render('register', { errorMessages: err })
        } else {
          res.redirect('/login');
        }
      })
    }
  });

// Login with Facebook feature
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;
