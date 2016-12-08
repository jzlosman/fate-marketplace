(function() {
    angular.module('locations')
    .controller('LocationsEditCtrl', ['$log', '$scope', 'locationsAPI', 'toastr', '$state', '$stateParams', 'chunker', 'user',
        function($log, $scope, locationsAPI, toastr, $state, $stateParams, chunker, user) {
            var vm = this;
            vm.location = {};
            vm.form = {
                label:"Update"
            }
            
            var run = function() {
                getLocation();
            };
            
            var getLocation = function() {
                locationsAPI.location($stateParams.id).get().then( function(result) {
                    vm.location = result;
                    $log.log('aspects are', vm.location.aspects, _.isArray(vm.location.aspects));
                    
                    vm.aspects = chunker.string(vm.location.aspects);
                    vm.location.aspects = chunker.string(vm.location.aspects);
                    
                    
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error Retrieving Location');
                });
            }
            
            vm.save = function() {
                vm.location.aspects = chunker.array(vm.location.aspects);
                locationsAPI.location($stateParams.id).patch(vm.location).then( function(result) {
                    $log.log('updated!');
                    toastr['success'](vm.location.name+" updated", 'Success');
                    $state.go('locations.list');
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error');
                })
            }
   
            vm.prepareImage = function(file, event, flow){
               var fileReader;
                fileReader = new FileReader();
                fileReader.onload = function(event) {
                    vm.location.cover = {
                        filename: user.profile.username + '-' + file.file.name,
                        raw: event.target.result
                    }
                };
                fileReader.readAsDataURL(file.file);
            }
            
            run();
        }]);
})();