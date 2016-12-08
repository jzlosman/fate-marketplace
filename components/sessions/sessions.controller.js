var Model = require('./sessions.model');
var RestController = require('../shared/rest.controller');

var controller = RestController.create(Model, ['summary', 'chapter', 'aspects', 'notes.shared', 'notes.hidden', 'history'], 'chapter owner characters.player characters.character', 'chapter owner characters.player characters.character');
module.exports = controller;