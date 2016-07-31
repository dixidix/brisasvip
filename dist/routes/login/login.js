function loginController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$state','$scope', '$rootScope','$http'];

    function loginCtrl($state, $scope, $rootScope,$http){
        var self = this; //jshint ignore:line
        self.user = {};
        self.fpwduser = {};
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
        function pwdreset(){
          self.fpwduser.sending = true;
          $http
          .post('./dist/php/reset_pwd.php', { email: self.fpwduser.email, toReset: false })
          .then(function (response){
            self.error = '';
            if(!response.data.errors){
              $http.post('./dist/php/sendMail.php', {
                email:self.fpwduser.email,
                token:response.data.fpswdToken,
                msg:"se ha solicitado la renovacion de contraseña para " + self.fpwduser.email + ",por favor ingresa en: http://localhost:8080/brisas_vip/#/reset-pwd/q"+response.data.fpswdToken + "para continuar con el proceso.",
                resetPwd: true
              }).then(function (response){
                self.showfpwdSuccessMsg = true;
              });              
            } else {
              self.fpwd.error = response.data.errors;
              self.registerForm.email.$setValidity("email", false);
            }
          });
        }
        function init(){
         $('html, body').animate({
          scrollTop: $("#login").offset().top
        }, 1000);
         self.fpwdshow = false;
         self.fpwduser.sending = false;
         self.pwdreset = pwdreset;
         self.login = login;
       }
       init();
     }
   };
   module.exports = loginController;