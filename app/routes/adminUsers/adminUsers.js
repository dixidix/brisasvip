function adminUsersController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('adminUsersCtrl', adminUsersCtrl);
    adminUsersCtrl.$inject = ['$state','$scope','$http','$uibModal'];
    app.controller('modalUserCtrl', modalUserCtrl);
    modalUserCtrl.$inject = ['$scope','$state','$http','$filter','$uibModalInstance','$rootScope','items'];

    function adminUsersCtrl($state, $scope, $http, $uibModal){
        var self = this; //jshint ignore:line
        self.users = {};
        self.user = {};
        function remove(user){
          self.user = user;
          self.openModal('md');
        }
        function edit(user){
          $state.go('home.editUser', {user: user},{});
        }
        function makeAdmin(user){

          $http.post('./dist/php/edit_user.php', {
            id: user.id,
            lockunlock: user.isAdmin,
            editUser:false
          }).then(function (response){
            $state.go($state.current,{},{ reload: true });
          });
        }
        function openModal(size){
         var modalInstance = $uibModal.open({
          templateUrl: 'confirmRemove.html',
          controller: 'modalUserCtrl',
          controllerAs:'modalUser',
          size: size,
          resolve: {
            items: function () {
              return self.user;
            }
          }

        });
       }
       function init(){
         self.remove = remove;
         self.edit = edit;
         self.makeAdmin = makeAdmin;
         self.openModal = openModal;
         $http.post('./dist/php/get_users.php',{ sskey: sessionStorage.getItem('sskey') }).then(function(response) {    

          self.users = response.data.users;
          $scope.totalItems = Object.keys(self.users).length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;
          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };
          $scope.pageChanged = function() {

          };
        });
       }
       init();
     }
     function modalUserCtrl($scope,$state,$http, $filter, $uibModalInstance, $rootScope, items){

      var self = this;
      
      function confirm(){       
        $http.post('./dist/php/delete_user.php', {
          id: self.user.id
        }).then(function (response){
         $uibModalInstance.dismiss('cancel');
         $state.go($state.current,{},{ reload: true });              
       });
      }
      function cancel(){
       $uibModalInstance.dismiss('cancel');
     }
     function init(){
      console.log(items);
      self.user = items;
      self.confirm = confirm;
      self.cancel = cancel;
    }

    init();
  }
};
module.exports = adminUsersController;