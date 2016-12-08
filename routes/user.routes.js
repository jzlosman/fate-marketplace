var express = require('express');
var controller = require('../controllers/user');
var router = express.Router();
var auth = require('../controllers/auth/auth');

router.route('/users').get(auth.isAuthenticated, controller.getUsers).post(controller.postUsers);
router.route('/users/:id').get(controller.getUser);
router.route('/users/login').post(controller.login);
module.exports = router;