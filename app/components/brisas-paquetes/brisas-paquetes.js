function BrisasPaquetesDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasPaquetes', brisasPaquetesDirective);
    brisasPaquetesDirective.$inject = ['$http'];
    function brisasPaquetesDirective($http){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-paquetes/brisas-paquetes.template.html',
    		link: link,
    		controllerAs: 'packagesCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {
      }
      function controller(){
    		var self = this; //jshint
        }
    }
}

module.exports = BrisasPaquetesDirective;