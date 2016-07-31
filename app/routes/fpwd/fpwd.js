function fpwdController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('fpwdCtrl', fpwdCtrl);
    fpwdCtrl.$inject = ['$http','$filter','$timeout','$state','$scope','$sce'];

    function fpwdCtrl($http, $filter,$timeout, $state, $scope,$stateParams,$sce){
        var self = this;
        self.validToken = false;
        self.successChangingPwd = false;
        function validatePwd(pwd1,pwd2){
            if(pwd1 === pwd2){
                self.changepwd(pwd1);
                self.fpwdForm.$setValidity('valid',true);
                self.fpwdForm.pwd1.$setValidity('valid',true);
                self.fpwdForm.pwd2.$setValidity('valid',true);
            }else{
                self.fpwdForm.$setValidity('invalid',true);
                self.fpwdForm.pwd1.$setValidity('invalid',true);
                self.fpwdForm.pwd2.$setValidity('invalid',true);
                self.match = true;                
            }
        }
        function changepwd(pwd){
            console.log(pwd);
            $http
            .post('./dist/php/reset_pwd.php', { pwd:pwd, token: $state.params.token, toReset: true })
            .then(function (response){
               self.successChangingPwd = true;
               $timeout(function() { 
                $state.go('home'); 
            }, 5000);
           });
        }
        function init(){ 
         self.match = false;
         self.invalidMsg = "";
         self.changepwd = changepwd;
         self.validatePwd = validatePwd;
         if($state.params.token){            
            self.validToken = true;
            $http
            .post('./dist/php/reset_pwd.php', { token: $state.params.token, checkValidToken: true })
            .then(function (response){
                if(response.data.errors.invalid){
                 self.validToken = false;
                 self.invalidMsg = "El C&oacute;digo de renovaci&oacute;n de contrase&ntilde;a es inv&aacute;lido o ya ha sido utilizado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";

                 $timeout(function() { 
                    $state.go('home'); 
                }, 5000);
             }
             if(response.data.errors.expired){
                 self.validToken = false;
                 self.invalidMsg = "El C&oacute;digo de renovaci&oacute;n de contrase&ntilde;a ha expirado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";
                 $timeout(function() { 
                    $state.go('home'); 
                }, 5000);
             }
         });
        }else{
            self.validToken = false;
        }

        $('html, body').animate({ scrollTop: 460 }, 'slow');    
    }
    init();
}

};
module.exports = fpwdController;