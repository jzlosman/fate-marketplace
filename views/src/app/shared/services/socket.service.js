(function() {
    'use strict';
    angular.module('shared.services').
    factory('chat', function (socketFactory) {
      return socketFactory();
    });
})();