var oauth2orize = require('oauth2orize');
var hat = require('hat');

var User = require('../../models/user');
var Client = require('../../models/auth/client');
var Code = require('../../models/auth/code');
var Token = require('../../models/auth/token');

var xhr = require('../../components/shared/xhr');
var server = oauth2orize.createServer();

// When a client redirects a user to user authorization endpoint, an authorization transaction is initiated. 
// To complete the transaction, the user must authenticate and approve the authorization request. 
// Because this may involve multiple HTTP request/response exchanges, the transaction is stored in the session.
server.serializeClient(function(client, next) {
    return next(null, client._id);
});

server.deserializeClient(function(id, next) {
    Client.findOne({ _id: id }, function (err, client) {
        if(err) { return next(err); }
        return next(null, client);
    });
});

server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, next) {
    var code = new Code({
        value: hat(256, 16),
        client_id: client._id,
        redirectUri: redirectUri,
        user_id: user._id
    });
    
    code.save(function(err) {
        if (err) { return next(err); }
        next(null, code.value);
    });
}));

server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, next) {
    Code.findOne({ value: code }, function (err, authCode) {
        if (err) { return next(err); }
        if(authCode === undefined) { return next(null, false); }
        if(client._id.toString() !== authCode.client_id) {return next(null, false); }
        if(redirectUri !== authCode.redirectUri) { return next(null, false); }
        
        authCode.remove(function (err) {
            if(err) { return next(err); }
            
            var token = new Token({
                value: hat(256, 16),
                client_id: authCode.client_id,
                user_id: authCode.user_id,
            });
            
            token.save(function (err) {
                if (err) { return next(err); }
                
                next(null, token);
            });
        });
    });
}));

var credentialsToToken = function(username, password, next) {
    User.findOne({ username: username }).select('_id username +password').exec(function(err, user) {
        // error
        if (err) { return next(err); }    
        
        // no user found
        if (!user) { return next(null, false); }
        
        user.verifyPassword(password, function(err, isMatch) {
           if (err) { return next(err); }
           if (!isMatch) { return next(null, false); }
           
           Client.findOne({ user_id: user._id }, function(err, client) {
             var token = new Token({
                value: hat(256, 16),
                client_id: client._id,
                user_id: user._id,
            });
                    
            token.save(function (err) {
                if (err) { return next(err); }
                
                next(null, token);
            });  
           });
        });
    });
};

exports.credentialsExchange = function(req, res, next) {
    credentialsToToken(req.body.username, req.body.password, function(err, token) {
        if (err) { return next(err); }
        return xhr.returnJson(res, {token: token});
    })
}

exports.credentialsToToken = credentialsToToken;

exports.authorization = [
    server.authorization(function(client_app, redirectUri, next) {
        Client.findOne({ app: client_app }, function(err, client) {
            if (err) { return next(err); }
            return next(null, client, redirectUri);
        });
    }),
    function(req, res) {
        res.render('dialog', {transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
];

exports.decision = [ server.decision() ];

exports.token = [
    server.token(),
    server.errorHandler()
];