(function() {
    /* global $ angular*/
    'use strict';
    angular.module('chat')
    .directive('chatPanel', chatPanel);
    
  /** @ngInject */
  function chatPanel($rootScope, messenger, usersAPI, storiesAPI, $log) {
    return {
      templateUrl: 'app/pages/chat/chatPopout.template.html',
        restrict: 'E',
        replace: true,
        scope: {
            session: '='
        },
        link: function($scope, element, attrs) {

            $rootScope.$watch('profile', function() {
                $scope.me = $rootScope.profile;
                messenger.run($scope.me);
            })
            
            $rootScope.$on('new_session', function(scope, story_id){
                storiesAPI.story(story_id).get().then(function(result) {
                    $scope.story = result;
                })
            })
        
            $scope.people = [];
            $scope.story = {};
            $scope.chapter = {};
            $scope.message = '';
            $scope.minimized = false;
            
            $scope.messages = messenger.messageList;
            
            usersAPI.users.getList().then(function(result) {
                $scope.people = result;
            })
            
            var $content = $('.chat-history');
            var $inner = $('.chat-history-inner');
            
            
            function scrollBottom() {
                $($inner).animate({
                  scrollTop: $($content).offset().top + $($content).outerHeight(true)
                }, {
                  queue: false,
                  duration: 'ease'
                });
            }
            
            function buildSent(message) {
                console.log('sending: ', message.text);
                scrollBottom();
            }
            
            function buildReceived(message) {
                console.log('receiving: ', message.text);
                scrollBottom();
            }
            
            $scope.sendMessage = function() {
                $log.log('sending ', $scope.message);
                messenger.send($scope.message);
                $scope.message = '';
            }
            
            $scope.toggle = function() {
                $scope.minimized = !$scope.minimized;
                $('.chat').slideToggle(300, 'swing');
	            $('.chat-message-counter').fadeToggle(300, 'swing');
            }
            
            messenger.onSend = buildSent;
            messenger.onReceive = buildReceived;
            $scope.toggle();
      }
    };
  }
})();