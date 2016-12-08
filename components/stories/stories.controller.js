var Model = require('./stories.model');
var RestController = require('../shared/rest.controller');

var controller = RestController.create(Model, ['setting', 'name'], 'setting owner players.user', 'owner setting players.user');
module.exports = controller;