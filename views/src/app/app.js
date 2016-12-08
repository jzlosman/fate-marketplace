'use strict';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'restangular',
  'ngStorage',
  'angularMoment',
  'btford.socket-io',
  'flow',
  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'shared.services',
  'locations',
  'chat',
  'settings',
  'chapters',
  'user.authentication'
]).
config(['RestangularProvider', function(RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/'); 

  RestangularProvider.addResponseInterceptor( 
    function(data, operation, what) { 
      var extractedData = data; 
      if (operation == 'getList') { 
        extractedData = data._embedded || []; 
        extractedData.meta = data._meta;
      }  

      return extractedData; 
    } 
  ); 
}])
.run(['$log', '$state', '$rootScope', 'Restangular', 'auth', 'user', 'redirect',
function($log, $state, $rootScope, RestangularProvider, auth, user, redirect) {

    var onTokenUpdate = function(event, args) {
      if (args.token === undefined || args.token === null) {
        RestangularProvider.setDefaultHeaders();
      } else {
        RestangularProvider.setDefaultHeaders({Authorization: 'Bearer ' + args.token});
      }
    };
    
    var onStateChange = function(e, toState, toParams, fromState, fromParams) {
      $rootScope.isAuth = auth.isAuth();
      if (toState.standalone !== undefined){
        $rootScope.standalone = toState.standalone;
      } else {
        $rootScope.standalone = false;
      }
      
      if (toState.authRequired && !auth.isAuth()) {
        e.preventDefault();
        redirect.setRedirect(toState, toParams);
        $log.log('going to login');
        return $state.go('login', {}, {
          location: true
        });
      }
      $log.log('continue on');
    };
    
    $rootScope.$on('$stateChangeStart', onStateChange);
    $rootScope.$on('TOKEN_UPDATE', onTokenUpdate);
    
    auth.loadFromStorage();
}]);