var express = require('express');
var router = express.Router();

router.get('/newSession', function(req, res) {
  var newSession = new Session();

  newSession.save(function(err, data) {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/session/' + data._id);
    }
  })
});

router.get('/:id', function(req, res) {
  if (req.params.id) {
    Session.findOne({ _id: req.params.id }, function(err, data) {
      if (err) {
        console.log(err);
        res.render('error');
      }

      if (data) {
        res.render('session', { data: data, roomId: data.id });
      } else {
        res.render('error');
      }
    })
  } else {
    res.render('error');
  }
});

module.exports = router;
