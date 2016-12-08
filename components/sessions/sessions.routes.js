var express = require('express');
var controller = require('./sessions.controller');
var router = express.Router();
var auth = require('../../controllers/auth/auth');

controller.isAuthOn(['create', 'update', 'remove']);

router.route('/sessions')
    .get(controller.all)
    .post(auth.isAuthenticated, controller.create);

router.route('/sessions/:id')
    .get(controller.one)
    .patch(auth.isAuthenticated, controller.update)
    .delete(auth.isAuthenticated, controller.remove);

module.exports = router;