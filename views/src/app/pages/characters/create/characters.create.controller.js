(function () {
  'use strict';

  angular.module('BlurAdmin.pages.characters')
      .controller('CharactersCreateCtrl', CharactersCreateCtrl);

  /** @ngInject */
  function CharactersCreateCtrl($log, $scope, $state, charactersAPI, user) {
   var vm = this;
   vm.character = {}
   vm.create = function() {
       vm.character.aspects.others = vm.character.aspects.others.split(',');
       charactersAPI.characters.post(vm.character).then(function(result) {
           $log.log('character created');
           $state.go('characters.list');
       })
   }
   
   vm.prepareImage = function(file, event, flow){
       var fileReader;
        fileReader = new FileReader();
        fileReader.onload = function(event) {
            vm.character.image = {
                filename: user.profile.username + '-' + file.file.name ,
                raw: event.target.result
            }
        };
        fileReader.readAsDataURL(file.file);
   }
  }

})();

