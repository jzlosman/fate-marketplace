(function() {
    angular.module('locations')
    .controller('LocationsCreateCtrl', ['$log', '$scope', 'locationsAPI', 'toastr', '$state', 'chunker', 'user',
        function($log, $scope, locationsAPI, toastr, $state, chunker, user) {
            var vm = this;
            vm.location = {};
            vm.aspects = "";
            vm.form = {
                label: "Create"
            }
            vm.save = function() {
                vm.location.aspects = chunker.array(vm.location.aspects);
                locationsAPI.locations.post(vm.location).then( function(result) {
                    $log.log('created!');
                    toastr['success'](vm.location.name+" created", 'Success');
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
                        filename: user.profile.username + '-' + file.file.name ,
                        raw: event.target.result
                    }
                };
                fileReader.readAsDataURL(file.file);
           }
        }]);
})();