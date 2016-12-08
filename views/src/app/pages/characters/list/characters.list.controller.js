(function () {
  'use strict';

  angular.module('BlurAdmin.pages.characters')
      .controller('CharactersListCtrl', CharactersListCtrl);

  /** @ngInject */
  function CharactersListCtrl($scope, charactersAPI, $state) {
   var vm = this;
   
   vm.goToEdit = function(id) {
       $state.go('characters.edit', {id:id})
   }
   
   charactersAPI.characters.getList().then( function( results ){
      vm.characters = results; 
   }).catch( function(err) {
       vm.error = err;
   });
  }

})();

