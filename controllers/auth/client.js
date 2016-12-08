var Client = require('../../models/auth/client');
var hat = require('hat');

exports.postClients = function(req, res) {
    var client = new Client();
    client.name = req.body.name;
    client.app = req.body.app;
    client.user_id = req.user._id;
    client.secret = hat(128,16);
    
    client.save(function (err) {
        if(err) 
            return res.send(err);
        
        res.json({message: 'Client added to the locker!', data: client});
    });
};

exports.getClients = function(req, res) {
    Client.find({ user_id: req.user._id }, function(err, clients) {
        if (err)
            return res.send(err);
        res.json(clients);
    });
};

exports.deleteClients = function(req, res) {
   Client.remove({ user_id:req.user._id, _id: req.params.id }, function(err) {
    if(err) {
      res.send(err);
    } 
    res.json({message: 'client application deleted from your locker.'})
  });
}