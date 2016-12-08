var express = require('express');
var controller = require('../../controllers/auth/client');
var auth = require('../../controllers/auth/auth');
var router = express.Router();


router.route('/clients').get(auth.isAuthenticated, controller.getClients).post(auth.isAuthenticated, controller.postClients);
router.route('/clients/:id').delete(auth.isAuthenticated, controller.deleteClients);

module.exports = router;