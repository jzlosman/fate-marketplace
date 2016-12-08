(function () {
  'use strict';

  angular.module('locations')
      .controller('LocationsListCtrl', LocationsListCtrl);

  /** @ngInject */
  function LocationsListCtrl($scope, locationsAPI, toastr, $state) {
   var vm = this;
   
   
   vm.goToEdit = function(id) {
       $state.go('locations.edit', {id:id})
   }
   
   
   locationsAPI.locations.getList().then( function( results ){
      vm.locations = results; 
   }).catch( function(err) {
       vm.error = err;
       toastr['error'](err.message, 'Error loading locations')
   });
  }

})();

