/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /* global angular */
    angular.module('locations')
    .factory('locationsAPI', factory);
    
    function factory(Restangular){
        var location = function(id) {
            return Restangular.one('locations', id);
        };
        
        return {
            locations: Restangular.all('locations'),
            location: location
        };
    };
})();