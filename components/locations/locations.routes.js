var express = require('express');
var controller = require('./locations.controller');
var router = express.Router();
var auth = require('../../controllers/auth/auth');

controller.isAuthOn(['create', 'update', 'remove']);

router.route('/locations')
    .get(controller.all)
    .post(auth.isAuthenticated, controller.create);

router.route('/locations/:id')
    .get(controller.one)
    .patch(auth.isAuthenticated, controller.update)
    .delete(auth.isAuthenticated, controller.remove);

module.exports = router;