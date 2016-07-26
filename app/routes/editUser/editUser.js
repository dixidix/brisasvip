function editUsersController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('editUsersCtrl', editUsersCtrl);

    editUsersCtrl.$inject = ['$state','$scope','$http'];

    function editUsersCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.user = {};
        function update(){
          $http.post('./dist/php/edit_editUser.php', {

          }).then(function (response){
            $state.go('home',{},{reload:true});
          });
        }
        function init(){
         self.update = update;
         self.user = $state.params.user;
       }
       init();
     }
   };
   module.exports = editUsersController;