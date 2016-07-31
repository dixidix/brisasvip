function registerController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$state','$scope','$http','$timeout'];

    function registerCtrl($state, $scope,$http,$timeout){
        var self = this; //jshint ignore:line        
        self.user = {};
        function register(){
          if(validatePwd(self.user.password, self.user.pwd2)){
            self.user.country = $('#country').val();
            self.btnMsg = "Enviando";
            self.sending = true;
            $http.post('./dist/php/register.php', {
              name: self.user.name,
              lastname: self.user.lastname,
              email: self.user.email,
              tel: self.user.tel,
              city: self.user.country,
              password: self.user.password
            })
            .then(function (response){
              self.error = '';
              if(!response.data.errors){       
                $http.post('./dist/php/sendMail.php', {
                  email: self.user.email,
                  token: response.data.registerToken,
                  msg:"se ha solicitado el registro de el usuario " + self.user.email + ",por favor ingresa en: http://localhost:8080/brisas_vip/#/register/"+response.data.registerToken + "para continuar con el proceso.",
                  registerToken: true
                }).then(function (response){
                  self.registerForm.$setPristine();
                  self.user = {};         
                  self.validateRegister = true;
                });     
              } else {
                self.error = response.data.errors;
                self.registerForm.email.$setValidity("email", false);
              }
            });
          }
        }
        function validatePwd(pwd1,pwd2){
          if(pwd1 !== pwd2){
            self.registerForm.password.$setValidity('invalid',true);
            self.registerForm.pwd2.$setValidity('invalid',true);
            self.match = true;
            return false;                
          }else{          
            self.registerForm.password.$setValidity('valid',true);
            self.registerForm.pwd2.$setValidity('valid',true);
            self.match = false; 
            return true;               
          }
        }

        function resetEmail(){
          self.error = "";
        }
        function init(){         
          self.validateRegister = false;
          self.validToken = true;
          self.btnMsg = "Registrarme";
          self.sending = false;
          self.concludeRegister = false;
          $('html, body').animate({
            scrollTop: $("#register").offset().top
          }, 1000); 
          self.register = register;
          self.resetEmail = resetEmail;
          var input1 = document.getElementById('country');
          var autocomplete = new google.maps.places.Autocomplete(input1);
          if($state.params.token){           

            $http
            .post('./dist/php/register.php', { conclude:true, token: $state.params.token})
            .then(function(response){
              console.log(response);
              if(response.data.errors.invalid){
                self.validToken = false;
                self.invalidMsg = "El C&oacute;digo de Registro es inv&aacute;lido o ya ha sido utilizado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";
                $timeout(function() { 
                  $state.go('home'); 
                }, 5000);
              } else if(response.data.errors.expired){
                self.validToken = false;
                self.invalidMsg = "El C&oacute;digo de Registro ha expirado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";
                $timeout(function() { 
                  $state.go('home'); 
                }, 5000);
              }else {
                self.concludeRegister = true;
              }
            });
          }else{
            self.concludeRegister = false;            

          }
        }

        init();
      }
    };
    module.exports = registerController;