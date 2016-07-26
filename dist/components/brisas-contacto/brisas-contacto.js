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
            }
            init();
        }
    }
}

module.exports = BrisasContactoDirective;