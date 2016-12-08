(function() {
    'use strict';
    angular.module('user.authentication')
    .controller('LoginCtrl', LoginCtrl);
    
    /** @ngInject */
    function LoginCtrl($log, $scope,$state, auth, redirect, user, usersAPI) {
        var vm = this;
        vm.user = {
            username: "",
            password: ""
        };
        
        $scope.login = function() {
            $log.log('logging in');
            usersAPI.login(vm.user.username, vm.user.password)
            .then(function(result) {
                handleSuccessfulLogin(result);
            }).catch(function(err) {
                $log.log('error logging in', err);
            });
        }
        
        function handleSuccessfulLogin(identity){
          auth
          .setToken(identity.token.value)
          .setUserId(identity.user._id);
          
          user.profile = identity.user;

          if (redirect.redirect() === false) {
            //  if no redirection happens, go to user profile  (redirect(), will do the redirect, if it can)
            $state.go('characters.list')
          }
        }
    }
})();