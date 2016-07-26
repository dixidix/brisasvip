function BrisasChoferDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasChofer', brisasChoferDirective);

    function brisasChoferDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-chofer/brisas-chofer.template.html',
    		link: link,
    		controllerAs: 'choferCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {

          scope.choferes = [
          {
            id:'1',
            img:'http://www.tripincdn.com.ar/img/Mendoza/Potrerillos/Potrerillos-9.jpg',
            title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id:'2',
            img:'http://www.tripincdn.com.ar/img/Mendoza/Potrerillos/Potrerillos-9.jpg',
            title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id:'3',
            img:'http://www.tripincdn.com.ar/img/Mendoza/Potrerillos/Potrerillos-9.jpg',
            title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id:'4',
            img:'http://www.tripincdn.com.ar/img/Mendoza/Potrerillos/Potrerillos-9.jpg',
            title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
        ];
    }
    function controller(){
    		var self = this; //jshint
        }
    }
}

module.exports = BrisasChoferDirective;