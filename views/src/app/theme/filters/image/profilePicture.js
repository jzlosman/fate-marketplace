/**
 * @author v.lugovsky
 * created on 17.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .filter('profilePicture', profilePicture);

  /** @ngInject */
  function profilePicture(layoutPaths) {
    return function(profile) {
      return 'https://graph.facebook.com/'+profile.facebook_id+'/picture?type=square';
    };
  }

})();
