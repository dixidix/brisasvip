function adminUsersController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('adminUsersCtrl', adminUsersCtrl);

    adminUsersCtrl.$inject = ['$state','$scope','$http'];

    function adminUsersCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.users = {};
        function remove(id){
          $http.post('./dist/php/delete_user.php', {
            id: id
          }).then(function (response){
            $state.go($state.current,{},{ reload: true });              
          });
        }
        function edit(user){
          $state.go('home.editUser', {user: user},{});
        }
        function makeAdmin(user){
          console.log(user.id, user.isAdmin);
          $http.post('./dist/php/edit_user.php', {
            id: user.id,
            lockunlock: user.isAdmin,
            editUser:false
          }).then(function (response){
            $state.go($state.current,{},{ reload: true });
          });
        }
        function init(){
         self.remove = remove;
         self.edit = edit;
         self.makeAdmin = makeAdmin;
         $http.post('./dist/php/get_users.php',{ sskey: sessionStorage.getItem('sskey') }).then(function(response) {    
          console.log(response.data.users);
          self.users = response.data.users;
          $scope.bigTotalItems = Object.keys(self.users).length;
          $scope.bigCurrentPage = 1;
          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };
          $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.currentPage);
          };
        });
       }
       init();
     }
   };
   module.exports = adminUsersController;