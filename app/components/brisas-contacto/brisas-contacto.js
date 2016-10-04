function BrisasContactoDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasContacto', brisasContactoDirective);
    brisasContactoDirective.$inject = ['$state','$http'];
    function brisasContactoDirective($state,$http){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-contacto/brisas-contacto.template.html',
    		link: link,
    		controllerAs: 'contactoCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {

        }
        function controller(){
    		var self = this; //jshint
            function sendMail(){
                $http.post('./dist/php/sendMail.php',
                {
                    name: self.email.name,
                    lastname:self.email.lastname,
                    tel:self.email.tel,
                    mail:self.email.mail,
                    consulta:self.email.consulta,
                    contactForm: true
                }).then(function (response){
                    $state.go('home',{},{reload:true});
                });
            }
            function sending(){
                self.btnMsg = "Enviando...";
                self.sendingMsg = true;
            }
            function init(){
                self.btnMsg = "Consultar";
                self.sending = sending;
                self.email = {
                    'name':'',
                    'lastname':'',
                    'tel':'',
                    'mail':'',
                    'consulta':''
                };
                self.sendMail = sendMail;

                $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: true }).success(function (response){
                    self.email.name = response.name;
                    self.email.lastname = response.lastname;
                    self.email.mail = response.userEmail;
                    self.email.tel = response.userTel;
                });
                if(sessionStorage.getItem('sskey')){
                    self.isLogged  = true;
                } else {
                    self.isLogged = false;
                }
                if(self.isLogged){
                    self.username = sessionStorage.getItem('username');
                }
            }
            init();
        }
    }
}

module.exports = BrisasContactoDirective;