const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
//bring in the model
const User = require('../models/user');
//bring in the database
const config = require('../config/database');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
      console.log(jwt_payload );
      User.getUserById(jwt_payload._id, (err, user)=>{
        if (err) {
          return done(err , false);
        }

        if (user) {
          return done(null, user);
        }
        else {
          return done(null , false);
        }
      });
    }));
  }
