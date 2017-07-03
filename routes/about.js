var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'CodaSession', subtitle: 'Distributed yet highly collaborative coding' });
});

module.exports = router;
