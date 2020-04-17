const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.SECRET_OR_KEY = keys.SECRET_OR_KEY;

module.exports = passport => {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        done();
    }));
};