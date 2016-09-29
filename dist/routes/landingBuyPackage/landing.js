function landingController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('landingCtrl', landingCtrl);

    landingCtrl.$inject = ['$state','$scope','$rootScope','$http','$sce'];

    function landingCtrl($state, $scope,$rootScope,$http){
        var self = this; //jshint ignore:line
        function goHome(){
            $state.go('home',{reload:true});
        }
        function init(){
          self.goHome = goHome;
          $('html, body').animate({ scrollTop: 420 }, 'slow');    
          if($rootScope.pckg){
              $http.post('./dist/php/add_soldpackage.php', {
                 name : $rootScope.pckg.name,
                 lastname : $rootScope.pckg.lastname,
                 email : $rootScope.pckg.email,
                 tel : $rootScope.pckg.tel,
                 date :  $rootScope.pckg.date,
                 time : $rootScope.pckg.time,
                 packageId : $rootScope.pckg.packageId
             }).then(function (response){

             });
         }
     }
     init();
 }
};
module.exports = landingController;