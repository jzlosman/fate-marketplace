(function() {
    'use strict';
    angular.module('chat')
    .factory('chatHTML', ['auth', function(auth) {
        
        var vm = {};
        var messageWrapper = 'message-wrapper';
        var circleWrapper = 'circle-wrapper';
        var textWrapper = 'text-wrapper';
        
        var classes = {
            me: 'meClass',
            them: 'themClass',
            aspect: 'aspectClass'
        }
        
      var _build = function(text, who) {
        return '<div class="'+messageWrapper+'"'+classes[who]+'">' +
                  '<div class="'+circleWrapper+' animated bounceIn"></div>' +
                  '<div class="'+textWrapper+'">...</div>' +
                '</div>';
      }
      
      
      var _buildAspect = function(text, isNew) {
        return '<div class="'+messageWrapper+'"'+classes.aspect+'">' +
                  '<div class="'+circleWrapper+' animated bounceIn"></div>' +
                  '<div class="'+textWrapper+'">...</div>' +
                '</div>';
      }
      
      vm.addAspect = function(text) {
        return _buildAspect(text, true);  
      }
      
      vm.invokeAspect = function(text) {
        return _buildAspect(text, false);  
      }
      
      vm.me = function(text) {
        return _build(text, 'me');
      }
      
      vm.them = function(text) {
        return _build(text, 'them');
      }
        return vm;
    }]);
})();