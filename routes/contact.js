var express = require('express');
var router = express.Router();

// contact form email
var nodemailer = require('nodemailer');
var config = require('../config');
var nodemailerTransporter = nodemailer.createTransport(config.mailer)

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
      var mailDetails = {
        from: 'CodaSession <noreply@codasession.io>',
        to: config.mailer.auth.user,
        subject: 'A visitor left a message for you!',
        text: req.body.message
      };

      nodemailerTransporter.sendMail(mailDetails, function(error,info) {
        if(error) {
          return console.log(error);
        }
      });
      res.render('thankyou', { title: 'Email successfully sent!' });
    };
  });

module.exports = router;
