var Model = require('./settings.model');
var RestController = require('../shared/rest.controller');

var controller = RestController.create(Model, ['description', 'name', 'cover'], 'owner locations', 'owner locations');
module.exports = controller;