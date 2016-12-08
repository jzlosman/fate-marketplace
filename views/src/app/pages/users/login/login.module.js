(function () {
  'use strict';

  angular.module('user.authentication', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'app/pages/login/login.template.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm',
          standalone: true,
          title: 'Login'
        });
  }

})();