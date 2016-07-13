function BrisasFooterDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasFooter', brisasFooterDirective);

    function brisasFooterDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/brisas-footer/brisas-footer.template.html',
    		link: link,
    		controllerAs: 'footerCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {

        }
        function controller(){
    		var self = this; //jshint
        }
    }
}

module.exports = BrisasFooterDirective;