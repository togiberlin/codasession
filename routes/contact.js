var express = require('express');
var router = express.Router();

/* GET and POST contact page. */
router.route('/')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Contact us' });
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Please enter your name').notEmpty();
    req.checkBody('email', 'Please enter your email').isEmail();
    req.checkBody('message', 'Please enter a message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'Contact us',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    }
    else {
      res.render('thankyou', { title: 'Email successfully sent!' });
    };
  });

module.exports = router;
