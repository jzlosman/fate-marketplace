/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
      .directive('pageTop', pageTop);

  /** @ngInject */
  function pageTop(auth, $state, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/pageTop/pageTop.html',
      link: function($scope) {
        // $rootScope profile gets used 
        $scope.logout = function() {
          auth.logout();
          $state.go('login', {}, {reload: true});
        }
      }
    };
  }

})();