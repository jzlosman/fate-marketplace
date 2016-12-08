(function() {
    'use strict';
    /*global angular*/
    angular.module('stories', [])
    .config(routeConfig);
    
    function routeConfig($stateProvider) {
         $stateProvider
        .state('stories', {
          url: '/stories',
          template : '<ui-view></ui-view>',
          abstract: true,
          title: 'Stories',
          sidebarMeta: {
            icon: 'ion-film-marker',
            order: 250,
          },
        })
        .state('stories.list', {
          url: '/list',
          templateUrl: 'app/pages/stories/list/list.html',
          title: 'Stories',
          controller: 'StoriesListCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('stories.create', {
          url: '/create',
          templateUrl: 'app/pages/stories/create/create.html',
          title: 'New Story',
          controller: 'StoriesCreateCtrl',
          controllerAs: 'vm',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('stories.edit',
        {
          url: '/edit/:id',
          templateUrl: 'app/pages/stories/create/create.html',
          controller: 'StoriesEditCtrl',
          controllerAs: 'vm',
          title: 'Edit Story'
        })
        .state('stories.view',
        {
          url: '/view/:id',
          templateUrl: 'app/pages/stories/view/view.html',
          controller: 'StoriesViewCtrl',
          controllerAs: 'vm',
          title: 'Story Details'
        });
  }
})();