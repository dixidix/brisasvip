function reqPackagesController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqPackagesCtrl', reqPackagesCtrl);

    reqPackagesCtrl.$inject = ['$state','$scope','$http'];

    function reqPackagesCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.packages = {};
        function update(reqPackage){
          console.log(reqPackage);
        }
        function init(){
         self.update = update;
         $http.get('./dist/php/get_reqPackages.php').then(function(response) {    
          self.packages = response.data.reqPackages;
          $scope.bigTotalItems = Object.keys(self.packages).length;
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
   module.exports = reqPackagesController;