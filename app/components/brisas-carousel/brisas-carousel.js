function BrisasCarouselDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasCarousel', brisasCarouselDirective);

    function brisasCarouselDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/brisas-carousel/brisas-carousel.template.html',
    		link: link,
    		controllerAs: 'carousel',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {

    	}
    	function controller(){
    		var self = this; //jshint
    		self.myInterval = 3000;
    		self.noWrapSlides = false;
    		self.active = 1;
    		var currIndex = 0;
    		self.slides = [
    		{
    			text:'UNIDADES DE ALTA GAMA',
                subtext:'Las mejores unidades, lo ultimo en tecnologia del transporte',
    			image: './../../styles/images/slide_1.jpg'
    		},
    		{
    			text:'DISPONIBILIDAD DE UNIDADES',
                subtext:'Vehiculos disponibles 24/7 para todas tus necesidades',
    			image: './../../styles/images/slide_2.jpg'
    		},
    		{
    			text:'SELECCION DE CONDUCTORES',
                subtext:'Pedinos tu conductor favorito, lo reservaremos para vos',
    			image: './../../styles/images/slide_3.jpg'
    		},
    		{
    			text:'PENSADO PARA TU CONFORT',
                subtext:'Ultimo modelo en unidades, para que disfrutes tus viajes al maximo',
    			image: './../../styles/images/slide_4.jpg'
    		}
    		];
    	}
    }
}

module.exports = BrisasCarouselDirective;