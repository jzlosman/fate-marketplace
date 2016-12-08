/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /* global angular */
    angular.module('chapters')
    .factory('chaptersAPI', factory);
    
    function factory(Restangular){
        var chapter = function(id) {
            return Restangular.one('chapters', id);
        };
        
        return {
            chapters: Restangular.all('chapters'),
            chapter: chapter
        };
    };
})();