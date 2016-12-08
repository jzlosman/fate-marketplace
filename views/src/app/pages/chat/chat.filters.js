/**
 * @author v.lugovsky
 * created on 17.12.2015
 */
(function () {
  'use strict';

  angular.module('chat')
      .filter('chatUsername', chatUsername);

  /** @ngInject */
  function chatUsername() {
    return function(owner, user) {
      if(owner._id == user._id){
          return 'You';
      }
      else {
          return owner.username;
      }
    };
  }

})();
