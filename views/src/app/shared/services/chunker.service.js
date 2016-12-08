(function () {
  'use strict';
  /* global angular */
  angular.module('shared.services')
  .factory('chunker', [ function(){ 
      
      var array = function(s) {
         return s.split(',');
      }
      
      var string = function(a) {
         return a.join(',');
      }
      
      return {
          string: string,
          array: array
      }
  }]);
})();