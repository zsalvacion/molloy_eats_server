import passport from 'passport';
import { Student } from './connectors';
import bcrypt from 'bcrypt';

const LocalStrategy = require('passport-local').Strategy;

passport.use(‘local’, new LocalStrategy(
	function(username, password, done) {
		Student.findOne({ StudentName: username }, function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false);
			}

			if (!user.password != bcrypt.hashSync(password, 10)) {
				return done(null, false);
			}

			return done(null, user);
		}
));