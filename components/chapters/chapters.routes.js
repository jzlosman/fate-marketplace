var express = require('express');
var controller = require('./chapters.controller');
var router = express.Router();
var auth = require('../../controllers/auth/auth');

controller.isAuthOn(['create', 'update', 'remove']);

router.route('/chapters').post(auth.isAuthenticated, controller.create).get(controller.all);

router.route('/chapters/:id')
    .get(controller.one)
    .patch(auth.isAuthenticated, controller.update)
    .delete(auth.isAuthenticated, controller.remove);
    
/* router.route('/chapters/:id/locations')
    .post(auth.isAuthenticated, settings_locations_controller.addLocationToSetting);

router.route('/chapters/:id/locations/:location_id')
    .delete(auth.isAuthenticated, settings_locations_controller.removeLocationFromSetting);
*/
module.exports = router;