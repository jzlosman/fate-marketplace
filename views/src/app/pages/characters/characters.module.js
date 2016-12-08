/**
 * @author zaborowski
 */
(function () {
  'use strict';
    /*global angular*/
  angular.module('BlurAdmin.pages.characters', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('characters', {
          url: '/characters',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Characters',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('characters.list', {
          url: '/list',
          templateUrl: 'app/pages/characters/list/list.html',
          title: 'Character List',
          controller: 'CharactersListCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('characters.create', {
          url: '/create',
          templateUrl: 'app/pages/characters/create/create.html',
          title: 'Character Create',
          controller: 'CharactersCreateCtrl',
          controllerAs: 'vm',
          authRequired: true,
          sidebarMeta: {
            order: 100,
          },
        })
        .state('characters.edit',
        {
          url: '/edit/:id',
          templateUrl: 'app/pages/characters/edit/edit.html',
          controller: 'CharactersEditCtrl',
          controllerAs: 'vm',
          title: 'Character Edit',
          authRequired: true
        });
  }
})();
