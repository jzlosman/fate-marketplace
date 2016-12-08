(function () {
  'use strict';
  /* global angular */
  angular.module('shared.services')
  .factory('user', ['$localStorage', '$rootScope', '$log', 'auth', 'usersAPI', function($localStorage, $rootScope, $log, auth, usersAPI){ 
      var profile = {};
      var preferences = {};
      
      var reload = function() {
        usersAPI.user(auth.getUserId()).get().then(function(result) {
          $log.log('profile grabbed ', result);
          profile = result;
          $rootScope.profile = {
            'username': profile.username,
            'color': profile.color,
            'facebook_id': profile.facebook_id,
            '_id': profile._id
          }
        })
      }
      
      $rootScope.$on('USER_ID_CHANGED', function(event, args) {
        reload();
      });
      
      return {
        preferences: preferences,
        profile: profile,
        reload: reload
      }
  }]);
})();