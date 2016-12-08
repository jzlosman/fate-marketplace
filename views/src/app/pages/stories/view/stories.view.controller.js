(function () {
  'use strict';

  angular.module('stories')
      .controller('StoriesViewCtrl', StoriesViewCtrl);

  /** @ngInject */
  function StoriesViewCtrl($log, $scope, $state, $stateParams, auth, toastr, sessions, storiesAPI, chaptersAPI) {
   var vm = this;
   vm.userId = auth.getUserId();
   vm.loading = true;
   vm.new = {
       name: '',
       intro: ''
   }
   
   vm.chapters = [];
   vm.story = {};
   
   var run = function() {
       getStory();
       getChapters();
   }
   
   vm.goToEdit = function(id) {
       $state.go('stories.edit', {id:id})
   }
   
   vm.play = function(id) {
       sessions.startNewSessionFromStory(id);
   }
   
   vm.createNewChapter = function() {
       var data = {
           name: vm.new.name,
           intro: vm.new.intro,
           story: $stateParams.id
       };
       chaptersAPI.chapters.post(data).then( function( result ) {
           addChapterToList(result.data);
           vm.new.name = '';
           vm.new.intro = '';
       }).catch( function(err) {
           vm.error = err;
           toastr['error'](err.message, 'Error creating new chapter')
           return err;
       });
   }
   
   var addChapterToList = function(chapter) {
       vm.chapters.push(chapter);
   }
   
   var getChapters = function() {
       chaptersAPI.chapters.getList({story: $stateParams.id}).then( function( result ) {
           vm.chapters = result;
       }).catch( function(err) {
           vm.error = err;
           toastr['error'](err.message, 'Error loading chapters')
           return err;
       });
   }
   
   var getStory = function() {
       storiesAPI.story($stateParams.id).get().then( function( result ){
          vm.story = result; 
          return result;
       }).catch( function(err) {
           vm.error = err;
           toastr['error'](err.message, 'Error loading story')
           return err;
       }).then( function(result) {
           vm.loading = false;
       });
   }
   
   run();
  }

})();

