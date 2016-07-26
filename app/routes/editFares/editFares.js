function faresController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('faresCtrl', faresCtrl);

    faresCtrl.$inject = ['$state','$scope','$http'];

    function faresCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.fare = {};
        function update(){
          $http.post('./dist/php/edit_fares.php', {
            bbandera_dia: parseFloat(self.fare.bbandera_dia).toFixed(2),
            km_dia: parseFloat(self.fare.km_dia).toFixed(2),
            bbandera_noche: parseFloat(self.fare.bbandera_noche).toFixed(2),
            km_noche: parseFloat(self.fare.km_noche).toFixed(2)
          }).then(function (response){
            $state.go('home',{},{reload:true});
          });
        }
        function init(){
         self.update = update;
         $http.get('./dist/php/get_fares.php').then(function(response) {    
          angular.forEach(response.data.fares, function(item){
            if(item.daytime == 1){
              self.fare.bbandera_dia = item.bajada_bandera;
              self.fare.km_dia =  item.km;
            } else if(item.daytime == 2) {
              self.fare.bbandera_noche = item.bajada_bandera;
              self.fare.km_noche =  item.km;
            }
          });
        });
       }
       init();
     }
   };
   module.exports = faresController;