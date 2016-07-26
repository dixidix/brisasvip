function loginController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$state','$scope', '$rootScope','$http'];

    function loginCtrl($state, $scope, $rootScope,$http){
        var self = this; //jshint ignore:line
        self.user = {};
        self.error = '';
        self.loginError = "";
        function login(){
          $http.post('./dist/php/login.php', {username: self.user.username, password:self.user.password})
          .then(function (response){
            self.error = '';
            if(!response.data.errors){
              sessionStorage.sskey = response.data.sskey;
              sessionStorage.username = response.data.name  + " " + response.data.lastname;
              self.loginForm.$setPristine();
              self.user = {};
              $state.go("home",{},{reload: true});
            } else {
              self.error = response.data.errors.loginError;
              self.loginForm.$setPristine();
              self.user = {};
            }
          });
        }
        function init(){
         $('html, body').animate({
          scrollTop: $("#login").offset().top
        }, 1000);
         self.login = login;
       }
       init();
     }
   };
   module.exports = loginController;