/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /* global angular */
    angular.module('user.authentication')
    .factory('usersAPI', factory);
    
    function factory(Restangular){
        var user = function(id) {
            return Restangular.one('users', id);
        };
        
        var login = function(username, password) {
            return Restangular.all('users').customPOST({username:username, password:password}, 'login');
        }
        
        return {
            users: Restangular.all('users'),
            user: user,
            login: login
        };
    };
})();