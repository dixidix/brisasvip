function BrisasServiceDescriptionDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasServiceDescription', brisasServiceDescriptionDirective);

    function brisasServiceDescriptionDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/brisas-service-description/brisas-service-description.template.html',
    		link: link,
    		controllerAs: 'serviceDescriptionCtrl',
    		controller: controller
    	};

    	function link(scope, element, attrs) {
    	}
    	function controller(){
    		var self = this; //jshint
        }
    }
}

module.exports = BrisasServiceDescriptionDirective;