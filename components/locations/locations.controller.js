var Model = require('./locations.model');
var RestController = require('../shared/rest.controller');

var controller = RestController.create(Model, ['intro', 'description', 'name', 'cover', 'aspects'], '', 'owner');
module.exports = controller;