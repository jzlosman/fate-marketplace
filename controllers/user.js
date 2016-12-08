var User = require('../models/user');
var Client = require('../models/auth/client');
var oauth2Controller = require('./auth/oauth2');
var xhr = require('../components/shared/xhr');
var hat = require('hat');

var postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    facebook_id: req.body.facebook_id
  })
  
  user.save(function(err) {
    if(err){
      if (err) { 
        console.log(err); 
        return xhr.conflict(res, err.errmsg); 
      }
    }
    
    var client = new Client({
      name: user.username + "'s Primary Client",
      app: user._id+"-app",
      user_id: user._id,
      secret: hat(128,16)
    });
    
    client.save(function(err, client) {
      if (err) { 
        console.log(err); 
        return xhr.conflict(res, err.errmsg); 
      }
      oauth2Controller.credentialsToToken(req.body.username, req.body.password, function(err, token){
        if (err) { return res.send(err); }
        xhr.returnJson(res, {
          message: "New player added to One Mean RPG",
          user: { 
            _id: user._id,
            _username: user.username
          },
          token: token
        })
      })
    })
  });
};

var getUsers = function(req, res) {
  User.find(function(err, users){
    if(err){
      return res.send(err);
    }
    res.json(users);
  })
};

var getUser = function(req, res) {
  User.findOne({_id: req.params.id}, function(err, user){
    if(err){
      return res.send(err);
    }
    res.json(user);
  })
};

var login= function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if(err) {return res.send(err); }
    if(user == null) {
      return xhr.notAuthorized(res, 'Your email or password are incorrect.');
    }
    
    // if user.verified == false -> need to send verification email
    oauth2Controller.credentialsToToken(req.body.username, req.body.password, function(err, token){
        if (err) { return res.send(err); }
        xhr.returnJson(res, {
          message: "Welcome back",
          user: { 
            _id: user._id,
            _username: user.username
          },
          token: token
        });
    });
  });
}

module.exports = {
    postUsers: postUsers,
    getUsers: getUsers,
    getUser: getUser,
    login: login
};