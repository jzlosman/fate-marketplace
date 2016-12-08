var express = require('express');
var controller = require('./characters.controller');
var router = express.Router();
var auth = require('../../controllers/auth/auth');
var multer = require('multer');

controller.isAuthOn(['create', 'update', 'remove']);

router.route('/characters').get(controller.all).post(auth.isAuthenticated,  controller.create);
router.route('/characters/:id').get(controller.one).patch(auth.isAuthenticated, multer({dest: __dirname + '/../../public/uploads'}).single('newImage'), controller.update).delete(auth.isAuthenticated, controller.remove);

module.exports = router;