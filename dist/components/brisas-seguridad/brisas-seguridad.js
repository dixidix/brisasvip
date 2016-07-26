function BrisasSeguridadDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasSeguridad', brisasSeguridadDirective);
    function brisasSeguridadDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-seguridad/brisas-seguridad.template.html',
    		link: link,
    		controllerAs: 'securityCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {

      }
      function controller(){
    		var self = this; //jshint
        }
    }
}

module.exports = BrisasSeguridadDirective;