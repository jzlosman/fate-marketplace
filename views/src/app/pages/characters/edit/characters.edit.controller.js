(function () {
  'use strict';

  angular.module('BlurAdmin.pages.characters')
      .controller('CharactersEditCtrl', CharactersEditCtrl);

  /** @ngInject */
  function CharactersEditCtrl(user, $log, $scope, $stateParams, $state, charactersAPI, toastr, chunker) {
   var vm = this;
   
   var newImage = {};
   vm.loading = {
       newImage: false
   };
   
   var load = function(id) {
       charactersAPI.character(id).get().then(function(result) {
           vm.character = result;
           vm.aspects = chunker.string(vm.character.aspects.others);
           vm.character.aspects.others = chunker.string(vm.character.aspects.others);
           toastr['success']('Successfully load character', 'Success')
       }).catch(function(err) {
           $log.log('error loading character', err);
           toastr['error'](err.message, 'Error loading character')
       })
   }
   
   vm.save = function() {
       $log.log('aspects', vm.character.aspects.others);
       vm.character.aspects.others = chunker.array(vm.character.aspects.others);
       $log.log('aspects now', vm.character.aspects.others);
       $log.log('character image is ', vm.character.image.filename);
       
       charactersAPI.character(vm.character._id).patch(vm.character).then(function(result) {
           toastr['success']('Successfully updated character', 'Success')
           $state.go('characters.list');
       })
   }
   
   vm.prepareImage = function(file, event, flow){
       var fileReader;
        $log.log('getting ready to read a file!', file.file);
        fileReader = new FileReader();
        fileReader.onload = function(event) {
            vm.character.image = {
                filename: user.profile.username + '-' + file.file.name ,
                raw: event.target.result
            }
            vm.loading.newImage = false;
        };
        vm.loading.newImage = true;
        fileReader.readAsDataURL(file.file);
   }
   
   load($stateParams.id);
   
  }

})();

