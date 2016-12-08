var Model = require('./chapters.model');
var RestController = require('../shared/rest.controller');

var controller = RestController.create(Model, ['name', 'intro', 'summary', 'characters', 'locations'], 'setting characters.player characters.character', 'setting characters.player characters.character');
module.exports = controller;