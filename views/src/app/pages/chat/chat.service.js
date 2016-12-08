(function() {
    'use strict';
    angular.module('chat')
    .factory('messenger', ['$rootScope', 'auth', 'chat', 'usersAPI', '$log', function($rootScope, auth, chat, usersAPI, $log) {
        
        var vm = {};
        
        vm.messageList = [];
        vm.deletedList = [];
        
        vm.run = function(me) {
            vm.me = me;
            vm.joined();
        }
            
        vm.onReceive = function (message){
            console.log('Received: ' + message.text);
        }
        vm.onSend = function(message) {
            console.log('Sent: ' + message.text);
        }
        vm.onDelete = function(message){
            console.log('Deleted: ' + message.text);
        }
        
        vm.send = function(text){
            text = filter(text);
    
            if (validate(text)) {
              var message = {
                owner: vm.me,
                text: text,
                type: "text",
                date: moment()
              };
              $log.log('sending this message', message);
              
              vm.messageList.push(message);
              
              vm.onSend(message);
              
              chat.emit('message', message);
            }
        }
        
        vm.joined = function(){
             var message = {
                owner: vm.me,
                text: "",
                type: "joined",
                date: moment()
              };
              
              vm.onSend(message);
              chat.emit('message', message);
        }
  
        vm.receive = function(message){
            var text = filter(message.text)
            
            vm.messageList.push(message); 
            vm.onReceive(message);   
        }
        
        vm.delete = function(index) {
            index = index || (vm.messageList - 1);
            
            var deleted = vm.messageList.pop();
            
            vm.deletedList.push(deleted);
            vm.onDelete(deleted);
        }
  
        var filter = function(input) {
            var output = input.replace('bad input', 'good output'); // such amazing filter there right?
            return output;
        }
        
        var validate = function(input) {
            return !!input.length; // an amazing example of validation I swear.
        }
        
        chat.on('message', vm.receive);
        return vm;
    }]);
})();