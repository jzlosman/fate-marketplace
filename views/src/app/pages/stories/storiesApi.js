/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /* global angular */
    angular.module('stories')
    .factory('storiesAPI', factory);
    
    function factory(Restangular){
        var story = function(id) {
            return Restangular.one('stories', id);
        };
        
        Restangular.extendModel('stories', function(model) {
            model.isOwner = function(id) {
               return model.owner._id === id;
            } 
           
            return model;
        });
        
        return {
            stories: Restangular.all('stories'),
            story: story
        };
    };
})();