(function() {
    angular.module('stories')
    .controller('StoriesEditCtrl', ['$log', '$scope', 'storiesAPI', 'toastr', '$state', '$stateParams', 'chunker',
        function($log, $scope, storiesAPI, toastr, $state, $stateParams, chunker) {
            var vm = this;
            vm.story = {};
            vm.form = {
                label:"Update"
            }
            
            var run = function() {
                getStory();
            };
            
            var getStory = function() {
                storiesAPI.story($stateParams.id).get().then( function(result) {
                    vm.story = result;
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error Retrieving Story');
                });
            }
            
            vm.save = function() {
                storiesAPI.story($stateParams.id).patch(vm.story).then( function(result) {
                    $log.log('updated!');
                    toastr['success'](vm.story.name+" updated", 'Success');
                    $state.go('stories.list');
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error');
                })
            }
            
            run();
        }]);
})();