var express = require('express');
var router = express.Router();
var oauth2Controller = require('../../controllers/auth/oauth2');
var authController = require('../../controllers/auth/auth');

router.route('/oauth2/authorize')
        .get(authController.isAuthenticated, oauth2Controller.authorization)
        .post(authController.isAuthenticated, oauth2Controller.decision);
        
router.route('/oauth2/credentials')
        .post(oauth2Controller.credentialsExchange);
        
router.route('/oauth2/token')
        .post(authController.isClientAuthenticated, oauth2Controller.token);
        
module.exports = router;