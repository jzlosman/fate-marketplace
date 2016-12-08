var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../../models/user');
var Client = require('../../models/auth/client');
var Token = require('../../models/auth/token');

passport.use('basic', new BasicStrategy(
    function(username, password, next) {
        User.findOne({ username: username }, function(err, user) {
            // error
            if (err) { return next(err); }    
            
            // no user found
            if (!user) { return next(null, false); }
            
            user.verifyPassword(password, function(err, isMatch) {
               if (err) { return next(err); }
               
               if (!isMatch) { return next(null, false); }
               
               return next(null, user);
            });
        });
    }
));
    
passport.use('client-basic', new BasicStrategy(
    function(username, password, next) {
        Client.findOne({ app: username }, function(err, client) {
            if(err)
                return next.send(err);
            
            if(!client || client.secret != password) { return next(null, false); }
            
            return next(null, client);
        })
    }
));

passport.use('bearer', new BearerStrategy(
    function(accessToken, next) {
        Token.findOne({ value: accessToken }, function (err, token) {
            if (err) { return next(err); }
            
            if(!token) {return next(null, false); }
            
            User.findOne({ _id: token.user_id }, function (err, user) {
                if (err) { return next(err); }
                
                if (!user) { return next(null, false); }
                
                next(null, user, {scope: '*'});
            })
        })
    }))

module.exports = { 
    isAuthenticated: passport.authenticate('bearer', { session: false }),
    isClientAuthenticated: passport.authenticate('client-basic', { session: false }),
    isBeaererAuthenticated: passport.authenticate('bearer', { session: false })
};
