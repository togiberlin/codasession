var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');

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
    User.findOne({ email: username }, function(err, user) {
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

passport.use(new FacebookStrategy({
    clientID: config.facebook.appID,
    clientSecret: config.facebook.appSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'email']
  },
  function(token, refreshToken, profile, done) {
    User.findOne({ 'facebookId': profile.id }, function(err, user) {
      if (err) return done(err);

      if (user) {
        return done(null, user);
      } else {
        debugger;
        User.findOne({ email: profile.emails[0].value }, function(err, user) {
          if (user) {
            user.facebookId = profile.id
            return user.save(function(err) {
              if (err) return done(null, false, { message: "Can't save. An error has occurred." } );
              return done(null, user);
            })
          }

          var user = new User();
          user.name = profile.displayName;
          user.email = profile.emails[0].value;
          user.facebookId = profile.id;
          user.save(function(err) {
            if (err) return done(null, false, { message: "Can't save. An error has occurred." } );
            return done(null, user);
          });
        });
      }
    });
  }
));
