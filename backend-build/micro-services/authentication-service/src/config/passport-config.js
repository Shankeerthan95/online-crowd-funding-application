const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/models/User');

passport.use(new LocalStrategy(
    {usernameField: "email", passwordField: "password"},
    function(email, password, done) {

    User.findByEmail(email, (err, user) => {
        if (err) return done(err);

        if(!user)
        {
            return done(null, null, "User not found")
        }

        user.validatePassword(password)
        .then(valid => {
            if (valid) { return done(null, user); }
            return done(null, null, "Incorrect password");
        })

    })

       
}));


