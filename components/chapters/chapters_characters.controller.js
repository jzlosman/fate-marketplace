var Model = require('./settings.model');
var xhr = require('../shared/xhr');

var addLocationToSetting = function(req, res) {
   if(req.body.location_id === undefined) { return xhr.validationError(res, 'validation errors', { 'location_id': 'required' }); }
   
   Model.findOne({ owner: req.user._id, _id: req.params.id }, function(err, instance) {
       if(err) { return res.send(err); }
       
       if(!instance) { return xhr.notFound(res, 'Setting not found'); }
       
       if(instance.locations.indexOf(req.body.location_id) !== -1){
           xhr.conflict(res, 'Location already exists in this setting');
       }
       
       instance.locations.push(req.body.location_id);
       
       instance.save(function(err) {
            if(err) { res.send(err); }
            xhr.returnEntity(res, instance);
       });
    });
}


var removeLocationFromSetting = function(req, res) {
   Model.findOne({ owner: req.user._id, _id: req.params.id }, function(err, instance) {
       if(err) { return res.send(err); }
       
       if(!instance) { return xhr.notFound(res, 'Setting not found'); }
       
       var i = instance.locations.indexOf(req.params.location_id);
       if(i === -1){
           xhr.notFound(res, 'Location does not exist in this setting');
       }
       
       instance.locations.splice(i,1);
       
       instance.save(function(err) {
            if(err) { res.send(err); }
            xhr.returnEntity(res, instance);
       });
    });
}

module.exports = { 
    addLocationToSetting: addLocationToSetting, 
    removeLocationFromSetting: removeLocationFromSetting
};