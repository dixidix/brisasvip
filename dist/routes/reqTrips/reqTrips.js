function reqTripsController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqTripsCtrl', reqTripsCtrl);

    reqTripsCtrl.$inject = ['$state','$scope','$http'];

    function reqTripsCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.trips = {};
        function update(reqTrip){
          console.log(reqTrip);
        }

        function init(){
         self.update = update;
         $http.get('./dist/php/get_reqTrips.php').then(function(response) {    
          self.trips = response.data.reqTrips;
          $scope.bigTotalItems = Object.keys(self.trips).length;
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
   module.exports = reqTripsController;