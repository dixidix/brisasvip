function BrisasNavbarDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasNavbar', brisasNavbarDirective);

    function brisasNavbarDirective($state){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/navbar-brisas/navbar-brisas.template.html',
    		link: link,
    		controllerAs: 'navbarCtrl',
    		controller: controller
    	};

    	function link(scope, element, attrs) {
            scope.logoFixed = false;
            angular.element(document).bind('scroll', function() {  
                var scroll = $(window).scrollTop();
                if (scroll > 60) {
                    scope.logoFixed = true;
                    $("nav").removeClass("navbar");
                    $("nav").addClass("navbar-fixed");
                    $("#brand").removeClass("navbar-brand");
                    $("#brand").addClass("navbar-fixed-brand");
                    $("#subbrand").removeClass("subbrand");
                    $("#subbrand").addClass("subbrand-fixed");
                    $("#brand img").attr("src","./../../styles/images/premium-fixed.png");
                } else {
                    scope.logoFixed = false;
                    $("nav").addClass("navbar");
                    $("nav").removeClass("navbar-fixed");
                    $("#brand").addClass("navbar-brand");
                    $("#brand").removeClass("navbar-fixed-brand");
                    $("#subbrand").addClass("subbrand");
                    $("#subbrand").removeClass("subbrand-fixed");
                    $("#brand img").attr("src","./../../styles/images/premium2.png");
                }
            });
        }
        function controller(){
    		var self = this; //jshint
            self.logoFixed = false;
            self.items = [
            {name:'Paquetes Turísticos',class:'menu packages', target:'packages','uisref':'home'},
            {name:'Galería', class:'menu', target:'galery','uisref':'home'},
            {name:'Tasa un viaje',class:'menu', target:'rate','uisref':'home.tasar'},
            {name:'Contactanos', class:'menu', target:'footer','uisref':'home'}
            ];
            $(document).on('click','.menu', function(event) {
                event.preventDefault();
                var target = "#" + this.getAttribute('data-target');
                if(target == "#top"){
                    $('html, body').animate({
                        scrollTop: 0
                    }, 1000);
                } else {                
                    $state.go('home').then(function(){
                     $('html, body').animate({
                        scrollTop: $(target).offset().top
                    }, 1000);
                 });
                }
            }); 
        }
    }
}

module.exports = BrisasNavbarDirective;