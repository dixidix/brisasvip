function reqTripsController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqTripsCtrl', reqTripsCtrl);
    reqTripsCtrl.$inject = ['$state','$scope','$rootScope','$http','$uibModal','$filter'];
    app.controller('modalTripCtrl', modalTripCtrl);
    modalTripCtrl.$inject = ['$scope','$state','$http','$filter','$uibModalInstance','$rootScope','items'];

    function reqTripsCtrl($state, $scope,$rootScope,$http,$uibModal,$filter){
        var self = this; //jshint ignore:line
        self.trips = [];
        self.trip = {};
        function confirm(trip){
         self.trip = trip;
         self.trip.confirmTrip = true;
         self.openModal('md');

       }
       function revoke(trip){
        self.trip = trip;
        self.trip.confirmTrip = false;
        self.openModal('md');

      }
      function openModal(size){
       var modalInstance = $uibModal.open({
        templateUrl: 'confirmTripModal.html',
        controller: 'modalTripCtrl',
        controllerAs:'modalTrip',
        size: size,
        resolve: {
          items: function () {
            return self.trip;
          }
        }

      });
     }
     function init(){
      $scope.filtered = [];
      self.openModal = openModal;
      self.revoke = revoke;
      self.confirm = confirm;
      $http.get('./dist/php/get_reqTrips.php').then(function(response) {    
        self.trips = response.data.reqTrips;
        $rootScope.tripsToContest = $filter('filter')(self.trips, {state:0}).length;
        console.log($rootScope.tripsToContest);
        $scope.totalItems = Object.keys(self.trips).length;
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
          $scope.filtered = $filter('filter')(self.trips, obj);
          $scope.currentPage = 1;
        }); 
      });
    }
    init();
  }
  function modalTripCtrl($scope,$state,$http, $filter, $uibModalInstance, $rootScope, items){

    var self = this;

    function confirm(){
      var trip = items;
      self.sendingEmail = true;
      if(items.confirmTrip){
        $http.post('./dist/php/sendMail.php', {
          email:trip.email,
          msg:"El viaje ha sido agendado. Muchas gracias por utilizar nuestros servicios.",
          from:trip.req_from,
          to:trip.req_to,
          date:trip.date,
          time:trip.time,
          price:trip.price,
          id:trip.id,
          confirm: true
        }).then(function (response){
          self.sendingEmail = false;
          self.action = "confirmar";
          $uibModalInstance.dismiss('cancel');
          $state.go($state.current,{},{ reload: true });
        });
      } else {
        self.sendingEmail = true;
        $http.post('./dist/php/sendMail.php', {
          email:trip.email,
          id:trip.id,
          msg:"Hubo un problema al procesar su solicitud de  viaje. Por favor comunicate a los siguientes tel&eacute;fonos para solicitar tu traslado: +54 9 0261 4309100 - +54 9 0261 4376499 - +54 9 0261 4378080. Muchas gracias.",
          revoke: true
        }).then(function (response){
          self.sendingEmail = false;
          self.action = "rechazar";
          $uibModalInstance.dismiss('cancel');
          $state.go($state.current,{},{ reload: true });
        });
      }
    }
    function cancel(){
     $uibModalInstance.dismiss('cancel');
   }
   function init(){
    self.sendingMsg = "Enviando...";
    self.sendingEmail = false;
    console.log(items);
    self.confirm = confirm;
    self.cancel = cancel;
    if(items.confirmTrip){
      self.action = "confirmar";
    }else{
      self.action = "rechazar";
    }
  }

  init();
}
};

module.exports = reqTripsController;