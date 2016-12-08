(function () {
  'use strict';

  angular.module('settings')
      .controller('SettingsListCtrl', SettingsListCtrl);

  /** @ngInject */
  function SettingsListCtrl($scope, settingsAPI, $state) {
   var vm = this;
   
   vm.goToEdit = function(id) {
       $state.go('settings.edit', {id:id})
   }
   
   settingsAPI.settings.getList().then( function( results ){
      vm.settings = results; 
   }).catch( function(err) {
       vm.error = err;
   });
  }

})();

