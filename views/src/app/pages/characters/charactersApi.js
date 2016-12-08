/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /* global angular */
    angular.module('BlurAdmin.pages.characters')
    .factory('charactersAPI', factory);
    
    function factory(Restangular){
        var character = function(id) {
            return Restangular.one('characters', id);
        };
        
        return {
            characters: Restangular.all('characters'),
            character: character
        };
    };
})();