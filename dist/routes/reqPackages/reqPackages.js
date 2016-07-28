function reqPackagesController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqPackagesCtrl', reqPackagesCtrl);

    reqPackagesCtrl.$inject = ['$state','$scope','$http','$filter'];

    function reqPackagesCtrl($state, $scope,$http,$filter){
        var self = this; //jshint ignore:line
        self.packages = [];
        $scope.filtered = [];
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
          $scope.$watch('search', function (term) {
            var obj = term;
            $scope.filtered = $filter('filter')(self.packages, obj);
            $scope.currentPage = 1;
          }); 
        });
       }
       init();
     }
   };
   module.exports = reqPackagesController;