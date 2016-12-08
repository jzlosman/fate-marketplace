(function () {
  'use strict';
  /* global angular */
  angular.module('shared.services')
  .factory('auth', ['$localStorage', '$rootScope', '$log', function($localStorage, $rootScope, $log){ 
      var token = '';
      var username = '';
      var userId = '';
      var lastLoggedIn; 
      
      var setToken = function(val) {
        token = val;
        $rootScope.$broadcast('TOKEN_UPDATE', {
          token: val
        });
        updateLocalStorage();
        return this;
      };
      
      var getToken = function() {
        return token;
      };
      
      var setUserId = function(val) {
        userId = val;
        
        $rootScope.$broadcast('USER_ID_CHANGED', {
          id: val
        });
        $log.log('setting user id to ', val);
        updateLocalStorage();
        return this;
      };
      
      var getUserId = function() {
          return userId;
      }
      
      var updateLocalStorage = function() {
          if (token && userId) {
              $localStorage.token = token;
              $localStorage.user_id = userId;  
          }
      };
      
      var clearLocalStorage = function() {
        delete $localStorage.token;
        delete $localStorage.user_id;
      };
      
      var loadFromStorage = function() {
        var _token = $localStorage.token;
        var _userId = $localStorage.user_id;
        
        if (_userId !== undefined && _userId !== '' 
              && _token !== undefined && _token !== '') {
          setToken(_token);
          setUserId(_userId);
        }else {
            _token = null;
        }
      };
      
      var isAuth = function() {
        return token !== '' && userId !== '';
      };
      
      var logout = function() {
        token = null;
        userId = null;
        clearLocalStorage();
      }
      
       return {
          setToken: setToken,
          getToken: getToken,
          setUserId: setUserId,
          getUserId: getUserId,
          updateLocalStorage: updateLocalStorage,
          clearLocalStorage: clearLocalStorage,
          loadFromStorage: loadFromStorage,
          isAuth: isAuth,
          logout: logout
      }
      
  }]);
})();