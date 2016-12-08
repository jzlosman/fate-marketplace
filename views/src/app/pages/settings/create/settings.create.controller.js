(function() {
    angular.module('settings')
    .controller('SettingsCreateCtrl', ['user', '$log', '$scope', 'settingsAPI', 'toastr', '$state', 'chunker',
        function(user, $log, $scope, settingsAPI, toastr, $state, chunker) {
            var vm = this;
            vm.setting = {};
            vm.form = {
                label: "Create"
            }
            vm.create = function() {
                settingsAPI.settings.post(vm.setting).then( function(result) {
                    $log.log('created!');
                    toastr['success'](vm.setting.name+" created", 'Success');
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
        }]);
})();