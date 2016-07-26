function BrisasSearchDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line
    require('./../header-brisas/header-brisas.js');
    app.directive('brisasSearch', brisasSearchDirective);

    function brisasSearchDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/search-brisas/search-brisas.template.html',
    		link: link,
    		controllerAs: 'searchCtrl',
    		controller: controller
    	};

    	function link(scope, element, attrs) {

    	}
    	function controller(){
    		var self = this; //jshint
            

    	}
    }
}

module.exports = BrisasSearchDirective;