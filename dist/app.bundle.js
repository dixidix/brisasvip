(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';

	var app = angular.module('brisas', ['ui.router','ngAnimate','ui.bootstrap'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {url: "/", templateUrl: "./routes/home/home.template.html"})
		.state('home.paquetes', {url: "paquetes/{packageId}", templateUrl: "./routes/paquetes/paquetes.template.html", controller:"packageCtrl", controllerAs:"package"})
		.state('home.conocenos', {url: "about",templateUrl: "./routes/conocenos/conocenos.template.html", controller:"knowUsCtrl", controllerAs:"knowUs"})
		.state('home.tasar', {url: "tasar/q={from}&{to}&{time}",templateUrl: "./routes/tasar/search-brisas.template.html", controller:"rateCtrl", controllerAs:"rate"})
		.state('home.choferes', {url: "drivers",templateUrl: "./routes/choferes/choferes.template.html", controller:"driversCtrl", controllerAs:"drivers"});
	});
	require('./components/navbar-brisas/navbar-brisas.js')(angular, app);
	require('./components/header-brisas/header-brisas.js')(angular, app);
	require('./components/brisas-service-description/brisas-service-description.js')(angular, app);
	require('./components/brisas-paquetes/brisas-paquetes.js')(angular, app);
	require('./components/brisas-carousel/brisas-carousel.js')(angular, app);
	require('./components/brisas-chofer/brisas-chofer.js')(angular, app);
	require('./components/brisas-footer/brisas-footer.js')(angular, app);
	require('./routes/paquetes/paquetes.js')(angular, app);
	require('./routes/conocenos/conocenos.js')(angular, app);
	require('./routes/choferes/choferes.js')(angular, app);
	require('./routes/tasar/search-brisas.js')(angular, app);
})();

},{"./components/brisas-carousel/brisas-carousel.js":2,"./components/brisas-chofer/brisas-chofer.js":3,"./components/brisas-footer/brisas-footer.js":4,"./components/brisas-paquetes/brisas-paquetes.js":5,"./components/brisas-service-description/brisas-service-description.js":6,"./components/header-brisas/header-brisas.js":7,"./components/navbar-brisas/navbar-brisas.js":8,"./routes/choferes/choferes.js":9,"./routes/conocenos/conocenos.js":10,"./routes/paquetes/paquetes.js":11,"./routes/tasar/search-brisas.js":12}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
function BrisasChoferDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasChofer', brisasChoferDirective);

    function brisasChoferDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/brisas-chofer/brisas-chofer.template.html',
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
function BrisasPaquetesDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasPaquetes', brisasPaquetesDirective);
    brisasPaquetesDirective.$inject = ['$http'];
    function brisasPaquetesDirective($http){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/brisas-paquetes/brisas-paquetes.template.html',
    		link: link,
    		controllerAs: 'packagesCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {
          $http.get('./../services/packages.json').then(function(response) {
             scope.packages = response.data.packages;
         });


      }
      function controller(){
    		var self = this; //jshint
        }
    }
}

module.exports = BrisasPaquetesDirective;
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
function BrisasHeaderDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line 
    

    app.directive('brisasHeader', brisasHeaderDirective);

    function brisasHeaderDirective($window){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/header-brisas/header-brisas.template.html',
    		link: link,
    		controllerAs: 'headerCtrl',
    		controller: controller
    	};

    	function link(scope,ctrl, element, attrs) {
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();   
            });
        }
        function controller(){
          var self = this,
            enviado = false; //jshint
            self.data = {
                from:'',
                to:'',
                time:''
            };
            angular.element($window).bind("scroll", function() {
                if($('body').scrollTop() > 0){
                    self.scrolling = true;  
                } else {
                    self.scrolling = false;  
               }
           });
            self.searchData = function() {
               return self.enviado = true;
           }
       }
   }
}

module.exports = BrisasHeaderDirective;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
function driversController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('driversCtrl', driversCtrl);

    driversCtrl.$inject = ['$state','$scope'];

    function driversCtrl($state, $scope){
        var self = this; //jshint ignore:line


        function init(){

        }
       init();
   }
};
module.exports = driversController;
},{}],10:[function(require,module,exports){
function knowUsController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('knowUsCtrl', knowUsCtrl);

    knowUsCtrl.$inject = ['$state','$scope'];

    function knowUsCtrl($state, $scope){
        var self = this; //jshint ignore:line


        function init(){

        }
       init();
   }
};
module.exports = knowUsController;
},{}],11:[function(require,module,exports){
function packageController(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('packageCtrl', packageCtrl);

    packageCtrl.$inject = ['$http','$filter','$state','$scope','$uibModal'];

    function packageCtrl($http, $filter, $state, $scope, $uibModal, $uibModalInstance){
        var self = this, data = {}  ; //jshint ignore:line

        $http.get('./../services/packages.json').then(function(response) {           
            self.data = $filter('filter')(response.data.packages, {id: $state.params.packageId})[0];
            self.data.imgSelected = self.data.img;
        });
        self.toBigPicture = toBigPicture;
        function init(){     
        	$('iframe').load(function(){
        		$(".loading").remove();
        	}).show();
        	self.open = function (size) {
        		var modalInstance = $uibModal.open({
        			animation: true,
        			templateUrl: 'myModalContent.html',
        			size: size,
        			resolve: {
        				item: function(){return  $state.params.package;}
        			}
        		});
        		self.cancel = function () {
        			$uibModalInstance.dismiss('cancel');
        		};
        	};
        }
        function toBigPicture(src){
            self.data.imgSelected = src;
        }
    // self.sellPackage = function () {
    //     var x = screen.width/2 - 1200/2;
    //     var mercadopago = window.open("https://www.mercadopago.com/mla/checkout/start?pref_id=209883872-f26e6388-c738-431f-9d13-fd4de5931edd",'popup','height=585,width=800,left='+x);
    // }
    init();
}
};
module.exports = packageController;
},{}],12:[function(require,module,exports){
function rateController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('rateCtrl', rateCtrl);

    rateCtrl.$inject = ['$state','$scope'];

    function rateCtrl($state, $scope){
        var self = this; //jshint ignore:line


        function init(){
            self.data = $state.params;
            self.data.pricing = "0.00";
            $('html, body').animate({
                scrollTop: 400
            }, 500);
        }
        init();
    }
};
module.exports = rateController;
},{}]},{},[1]);
