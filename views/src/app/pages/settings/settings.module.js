/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /*global angular*/
  angular.module('settings', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('settings', {
          url: '/settings',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Settings',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('settings.list', {
          url: '/list',
          templateUrl: 'app/pages/settings/list/list.html',
          title: 'Settings',
          controller: 'SettingsListCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('settings.create', {
          url: '/create',
          templateUrl: 'app/pages/settings/create/create.html',
          title: 'Create a New Setting',
          controller: 'SettingsCreateCtrl',
          controllerAs: 'vm',
          authRequired: true,
          sidebarMeta: {
            order: 100,
          },
        })
        .state('settings.edit',
        {
          url: '/edit/:id',
          templateUrl: 'app/pages/settings/create/create.html',
          controller: 'SettingsEditCtrl',
          controllerAs: 'vm',
          title: 'Edit Setting',
          authRequired: true
        });
  }
})();
