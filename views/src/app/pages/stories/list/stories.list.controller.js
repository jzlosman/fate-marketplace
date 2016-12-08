(function () {
  'use strict';

  angular.module('stories')
      .controller('StoriesListCtrl', StoriesListCtrl);

  /** @ngInject */
  function StoriesListCtrl($log, $scope, $state, auth, toastr, sessions, storiesAPI) {
   var vm = this;
   vm.userId = auth.getUserId();
   vm.loading = true;
   
   vm.goToEdit = function(id) {
       $state.go('stories.edit', {id:id})
   }
   
   vm.play = function(id) {
       $state.go('stories.view', {id:id});
       sessions.startNewSessionFromStory(id);
       // sessions.startNewSessionFromStory(id);
   }
   
   storiesAPI.stories.getList().then( function( results ){
      vm.stories = results; 
      return results;
   }).catch( function(err) {
       vm.error = err;
       toastr['error'](err.message, 'Error loading stories')
       return err;
   }).then( function(result) {
       vm.loading = false;
   });
  }

})();

