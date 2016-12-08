var Model = require('./characters.model');
var RestController = require('../shared/rest.controller');

var controller = RestController.create(Model, ['name', 'description', 'image', 'aspects.others', 'aspects.high_concept', 'aspects.trouble'], '', 'owner');
module.exports = controller;