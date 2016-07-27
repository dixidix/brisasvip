function reqPackagesController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqPackagesCtrl', reqPackagesCtrl);

    reqPackagesCtrl.$inject = ['$state','$scope','$http'];

    function reqPackagesCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.packages = {};
        function init(){
         $http.get('./dist/php/get_reqPackages.php').then(function(response) {    
          self.packages = response.data.reqPackages;
          $scope.totalItems = Object.keys(self.packages).length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;
          $scope.maxSize = 5;
          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };
          $scope.pageChanged = function() {

          };
        });
       }
       init();
     }
   };
   module.exports = reqPackagesController;