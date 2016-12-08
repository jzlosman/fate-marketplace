(function() {
    'use strict';
    angular.module('stories')
    .factory('sessions', ['$log', '$rootScope', '$localStorage', function($log, $rootScope, $localStorage) {
        $log.log("loading sessions service");
        
        function startNewSessionFromStory(scope, story_id) {
            $rootScope.$emit('new_session', story_id);
        }
        
        return {
            startNewSessionFromStory: startNewSessionFromStory
        }
    }])
})();