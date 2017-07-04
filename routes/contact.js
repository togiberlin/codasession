var express = require('express');
var router = express.Router();

/* GET and POST contact page. */
router.route('/')
  .get(function(req, res, next) {
    res.render('contact', { title: 'Contact us' });
  })
  .post(function(req, res, next) {
    res.render('thankyou', { title: 'Email successfully sent!' });
  });

module.exports = router;
