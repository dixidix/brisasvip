function fpwdController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('fpwdCtrl', fpwdCtrl);
    fpwdCtrl.$inject = ['$http','$filter','$state','$scope'];

    function fpwdCtrl($http, $filter, $state, $scope,$stateParams){
        var self = this;
        self.validToken = false;
        self.successChangingPwd = false;
        function validatePwd(pwd1,pwd2){
            if(pwd1 === pwd2){
                self.changepwd(pwd1);
            }else{
                self.fpwdForm.$setValidity('valid',false);
                self.fpwdForm.pwd1.$setValidity('valid',false);
                self.fpwdForm.pwd2.$setValidity('valid',false);
                self.match = true;                
            }
        }
        function changepwd(pwd){
            console.log(pwd);
            $http
            .post('./dist/php/reset_pwd.php', { pwd:pwd, token: $state.params.token, toReset: true })
            .then(function (response){
               self.successChangingPwd = true;
           });
        }
        function init(){ 
             self.match = false;
            self.changepwd = changepwd;
            self.validatePwd = validatePwd;
            if($state.params.token){            
                self.validToken = true;
            }else{
                self.validToken = false;
            }

            $('html, body').animate({ scrollTop: 460 }, 'slow');    
        }
        init();
    }

};
module.exports = fpwdController;