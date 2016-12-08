(function() {
    'use strict';
    /*global angular*/
    angular.module('locations', [])
    .config(routeConfig);
    
    function routeConfig($stateProvider) {
         $stateProvider
        .state('locations', {
          url: '/locations',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Locations',
          sidebarMeta: {
            icon: 'ion-earth',
            order: 250,
          },
        })
        .state('locations.list', {
          url: '/list',
          templateUrl: 'app/pages/locations/list/list.html',
          title: 'Locations',
          controller: 'LocationsListCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('locations.create', {
          url: '/create',
          templateUrl: 'app/pages/locations/create/create.html',
          title: 'New Location',
          controller: 'LocationsCreateCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('locations.edit',
        {
          url: '/edit/:id',
          templateUrl: 'app/pages/locations/create/create.html',
          controller: 'LocationsEditCtrl',
          controllerAs: 'vm',
          title: 'Edit Location'
        });
  }
})();