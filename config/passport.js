var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(function (id, done) {
	User.findOne({ _id: id}, function (err, user) {
		done(err, user);
	})
})

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
	User.findOne({ email: email}, function (err, user ){
		if (err) return done(err);
		if (!user) return done(null, false);
		const validPassword = user.comparePassword(password);
		if (!validPassword) {
			return done(null, false);
		}
		return done(null, user);
	})
}))


