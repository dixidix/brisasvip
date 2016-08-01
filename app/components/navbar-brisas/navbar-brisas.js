function BrisasNavbarDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasNavbar', brisasNavbarDirective);
    brisasNavbarDirective.$inject = ['$state','$http'];
    function brisasNavbarDirective($state,$http){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/navbar-brisas/navbar-brisas.template.html',
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
                    $("#brand img").attr("src","./dist/styles/images/premium-fixed.png");
                } else {
                    scope.logoFixed = false;
                    $("nav").addClass("navbar");
                    $("nav").removeClass("navbar-fixed");
                    $("#brand").addClass("navbar-brand");
                    $("#brand").removeClass("navbar-fixed-brand");
                    $("#subbrand").addClass("subbrand");
                    $("#subbrand").removeClass("subbrand-fixed");
                    $("#brand img").attr("src","./dist/styles/images/premium2.png");
                }
            });
        }
        function controller($state){
    		var self = this; //jshint
            self.logoFixed = false;
            self.username = "";
            $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: true }).success(function (response){
                self.isAdmin = response.isAdmin;
                self.userId = response.userId;
            });
            if(sessionStorage.getItem('sskey')){
                self.isLogged  = true;
            } else {
                self.isLogged = false;
            }
            if(self.isLogged){
                self.username = sessionStorage.getItem('username');
            }
            self.exit = exit;
            self.toContact = toContact;
            function toContact(){
                if($state.current.name == 'home'){
                    $('html, body').animate({ scrollTop: 4400}, 'slow');    
                } else {
                    $state.go("home").then(function() {
                        $('html, body').animate({ scrollTop: 4400}, 'slow');
                    });
                }
            }
            function exit(){
                $http.post('./dist/php/delete_session.php',{ sskey: sessionStorage.getItem('sskey') }).success(function (response){
                   if(response.deleted){
                    sessionStorage.clear();
                    $state.go("home", {}, {reload:true});
                   }
               });
            }
        }
    }
}

module.exports = BrisasNavbarDirective;