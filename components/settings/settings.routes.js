var express = require('express');
var controller = require('./settings.controller');
var settings_locations_controller = require('./settings_locations.controller');
var router = express.Router();
var auth = require('../../controllers/auth/auth');

controller.isAuthOn(['create', 'update', 'remove']);

router.route('/settings')
    .get(controller.all)
    .post(auth.isAuthenticated, controller.create);

router.route('/settings/:id')
    .get(controller.one)
    .patch(auth.isAuthenticated, controller.update)
    .delete(auth.isAuthenticated, controller.remove);
    
router.route('/settings/:id/locations')
    .post(auth.isAuthenticated, settings_locations_controller.addLocationToSetting);

router.route('/settings/:id/locations/:location_id')
    .delete(auth.isAuthenticated, settings_locations_controller.removeLocationFromSetting);

module.exports = router;