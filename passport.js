var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Initialize new session, when user logs in
passport.serializeUser(function(user, done) {
  done(null, user._id);
})

// Does the user with the ID exist inside the DB?
passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}, function(err, user){
    done(err, user);
  })
});

// The actual authentication process
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, done) {
      if(err) return done(err);
      // Case 1: Username doesn't exist
      if(!user) {
        return done(null, false, {
          message: 'Username and password wrong or unknown'
        });
      }
      // Case 2: Invalid password
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Username and password wrong or unknown'
        });
      }

      // Case 3: username and password correct
      return done(null, user);
    })
  }
));
