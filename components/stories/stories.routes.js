var express = require('express');
var controller = require('./stories.controller');
var stories_chapters_controller = require('./stories_chapters.controller')
var router = express.Router();
var auth = require('../../controllers/auth/auth');

controller.isAuthOn(['create', 'update', 'remove']);

router.route('/stories')
    .get(controller.all)
    .post(auth.isAuthenticated, controller.create);

router.route('/stories/:id')
    .get(controller.one)
    .patch(controller.update)
    .delete(auth.isAuthenticated, controller.remove);

router.route('/stories/:id/chapters')
    .post(auth.isAuthenticated, stories_chapters_controller.addChapterToStory);
router.route('/stories/:id/chapters/:id')
    .delete(auth.isAuthenticated, stories_chapters_controller.removeChapterFromStory);
module.exports = router;