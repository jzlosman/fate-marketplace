/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /* global angular */
    angular.module('settings')
    .factory('settingsAPI', factory);
    
    function factory(Restangular){
        var setting = function(id) {
            return Restangular.one('settings', id);
        };
        
        return {
            settings: Restangular.all('settings'),
            setting: setting
        };
    };
})();