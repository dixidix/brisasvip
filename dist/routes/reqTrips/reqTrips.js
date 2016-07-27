function reqTripsController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqTripsCtrl', reqTripsCtrl);

    reqTripsCtrl.$inject = ['$state','$scope','$http'];

    function reqTripsCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.trips = {};
        function confirm(trip){
          console.log(trip);
          $http.post('./dist/php/sendMail.php', {
            email:trip.email,
            msg:"El viaje ha sido agendado. Muchas gracias por utilizar nuestros servicios.",
            from:trip.req_from,
            to:trip.req_to,
            date:trip.date,
            time:trip.time,
            id:trip.id,
            confirm: true
          }).then(function (response){  });
        }
        function revoke(trip){
          console.log(trip);
          $http.post('./dist/php/sendMail.php', {
            email:trip.email,
            id:trip.id,
            msg:"Hubo un problema al procesar su solicitud de  viaje. Por favor comunicate a los siguientes tel&eacute;fonos para solicitar tu traslado: +54 9 0261 4309100 - +54 9 0261 4376499 - +54 9 0261 4378080. Muchas gracias.",
            revoke: true
          }).then(function (response){ });
        }
        function init(){
          self.revoke = revoke;
          self.confirm = confirm;
         $http.get('./dist/php/get_reqTrips.php').then(function(response) {    
          self.trips = response.data.reqTrips;
          $scope.bigTotalItems = Object.keys(self.trips).length;
          $scope.bigCurrentPage = 1;
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
   module.exports = reqTripsController;