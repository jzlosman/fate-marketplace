(function() {
    angular.module('stories')
    .controller('StoriesCreateCtrl', ['$log', '$scope', 'storiesAPI', 'toastr', '$state', 'chunker',
        function($log, $scope, storiesAPI, toastr, $state, chunker) {
            var vm = this;
            vm.story = {};
            vm.aspects = "";
            vm.form = {
                label: "Create"
            }
            vm.create = function() {
                vm.story.aspects = chunker.array(vm.stories.aspects);
                storiesAPI.stories.post(vm.story).then( function(result) {
                    $log.log('created!');
                    toastr['success'](vm.story.name+" created", 'Success');
                    $state.go('stories.list');
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error');
                })
            }
        }]);
})();