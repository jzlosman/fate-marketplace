(function() {
    angular.module('settings')
    .controller('SettingsEditCtrl', ['user', '$log', '$scope', 'settingsAPI', 'toastr', '$state', '$stateParams', 'chunker',
        function(user, $log, $scope, settingsAPI, toastr, $state, $stateParams, chunker) {
            var vm = this;
            vm.setting = {};
            vm.form = {
                label:"Update"
            }
            
            var run = function() {
                getSetting();
            };
            
            var getSetting = function() {
                settingsAPI.story($stateParams.id).get().then( function(result) {
                    vm.setting = result;
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error Retrieving Setting');
                });
            }
            
            vm.save = function() {
                settingsAPI.setting($stateParams.id).patch(vm.setting).then( function(result) {
                    $log.log('updated!');
                    toastr['success'](vm.setting.name+" updated", 'Success');
                    $state.go('settings.list');
                }).catch( function(err) {
                    toastr['error'](err.message, 'Error');
                })
            }
            
            
            vm.prepareImage = function(file, event, flow){
               var fileReader;
                fileReader = new FileReader();
                fileReader.onload = function(event) {
                    vm.setting.cover = {
                        filename: user.profile.username + '-' + file.file.name ,
                        raw: event.target.result
                    }
                };
                fileReader.readAsDataURL(file.file);
           }
            
            run();
        }]);
})();