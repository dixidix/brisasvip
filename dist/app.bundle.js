(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
	'use strict';

	var app = angular.module('brisas', ['ui.router','ngAnimate','ui.bootstrap','ngSanitize','ui-rangeSlider'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {url: "/", templateUrl: "./dist/routes/home/home.template.html", data: { requireAdmin: false }, controller:"homeCtrl", controllerAs:"home"})
		.state('home.paquetes', {url: "paquetes", templateUrl: "./dist/routes/paquetes/paquetes.template.html", data: { requireAdmin: false }, controller:"packageCtrl", controllerAs:"package"})
		.state('home.pckgDescription', {url: "paquetes/{packageId}", templateUrl: "./dist/routes/paquetes-desc/paquetes-desc.template.html", data: { requireAdmin: false }, controller:"packageDescCtrl", controllerAs:"packageDesc"})
		.state('home.conocenos', {url: "conocenos",templateUrl: "./dist/routes/conocenos/conocenos.template.html", data: { requireAdmin: false }, controller:"knowUsCtrl", controllerAs:"knowUs"})
		.state('home.tasar', {url: "tasar/q={from}&{to}&{time}",templateUrl: "./dist/routes/tasar/search-brisas.template.html", data: { requireAdmin: false }, controller:"rateCtrl", controllerAs:"rate"})
		.state('home.login', {url: "login", templateUrl: "./dist/routes/login/login.template.html", data: { requireAdmin: false }, controller:"loginCtrl", controllerAs:"login"})
		.state('home.editUser', {url: "editar-usuario",params: {user:{},  userId:''}, templateUrl: "./dist/routes/editUser/editUser.template.html", data: { requireAdmin: false }, controller:"editUsersCtrl", controllerAs:"editUser"})
		.state('home.register', {url: "register/:token", templateUrl: "./dist/routes/register/register.template.html", data: { requireAdmin: false }, controller:"registerCtrl", controllerAs:"register"})
		.state('home.editPackage', {url: "editar-paquete/{packageId}", templateUrl: "./dist/routes/addPackage/addPackage.template.html",  data: { requireAdmin: true }, controller:"addPackageCtrl", controllerAs:"addPackage"})
		.state('home.dashboard', {url: "administrar", abstract:true,  data: { requireAdmin: true }, views: {  "": { templateUrl: "./dist/routes/dashboard/dashboard.template.html",  data: { requireAdmin: true }, controller:"dashboardCtrl", controllerAs:"dashboard"}}})
		.state('home.dashboard.addPackage', {url: "",params: {pkgedit:{}}, views: {
			"tab1": {  templateUrl: "./dist/routes/addPackage/addPackage.template.html", controller:"addPackageCtrl", controllerAs:"addPackage"},
			"tab2": {  templateUrl: "./dist/routes/editFares/editFares.template.html", controller:"faresCtrl", controllerAs:"fares"},
			"tab3": {  templateUrl: "./dist/routes/adminUsers/adminUsers.template.html", controller:"adminUsersCtrl", controllerAs:"adminUsers"},
			"tab4": {  templateUrl: "./dist/routes/reqPackages/reqPackages.template.html", controller:"reqPackagesCtrl", controllerAs:"reqPackages"},
			"tab5": {  templateUrl: "./dist/routes/reqTrips/reqTrips.template.html", controller:"reqTripsCtrl", controllerAs:"reqTrips"}
		}})
		.state('home.choferes', {url: "choferes",templateUrl: "./dist/routes/choferes/choferes.template.html", data: { requireAdmin: false }, controller:"driversCtrl", controllerAs:"drivers"})
		.state('home.fpwd', {url: "reset-pwd/:token",templateUrl: "./dist/routes/fpwd/fpwd.template.html", data: { requireAdmin: false }, controller:"fpwdCtrl", controllerAs:"fpwd"})
		.state('home.landing', {url: "finalizar-compra",templateUrl: "./dist/routes/landingBuyPackage/landing.template.html", data: { requireAdmin: false }, controller:"landingCtrl", controllerAs:"landing"})
		.state('home.buyPackage', {url: "comprar", params: { paymentGatewayUrl: null, packageId: null },templateUrl: "./dist/routes/buyPackage/buyPackage.template.html", data: { requireAdmin: false }, controller:"buyPackageCtrl", controllerAs:"buyPackage"});
	});
	app.run(function ($rootScope, $http, $state){
		self.isAdmin  = 0;

		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

			$http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: false }).success(function (response){
				self.isAdmin = response.isAdmin;
				var requireAdmin = toState.data.requireAdmin;	
				if(requireAdmin && self.isAdmin == 0 || requireAdmin && self.isAdmin == undefined){
					event.preventDefault();
					$state.go('home',{reload:true});
				}
			});
		});
	});
	app.filter('start', function () {
		return function (input, start) {
			if (!input || !input.length) { return; }
			start = +start;
			return input.slice(start);
		};
	});
	
	require('./routes/home/home.js')(angular, app);
	require('./components/navbar-brisas/navbar-brisas.js')(angular, app);
	require('./components/header-brisas/header-brisas.js')(angular, app);
	require('./components/brisas-service-description/brisas-service-description.js')(angular, app);
	require('./components/brisas-paquetes/brisas-paquetes.js')(angular, app);
	require('./components/brisas-seguridad/brisas-seguridad.js')(angular, app);
	require('./components/brisas-carousel/brisas-carousel.js')(angular, app);
	require('./components/brisas-chofer/brisas-chofer.js')(angular, app);
	require('./components/brisas-contacto/brisas-contacto.js')(angular, app);
	require('./components/brisas-footer/brisas-footer.js')(angular, app);
	require('./components/uploader/uploader.js')(angular, app);
	require('./services/uploadService.js')(angular, app);
	require('./routes/paquetes/paquetes.js')(angular, app);
	require('./routes/paquetes-desc/paquetes-desc.js')(angular, app);
	require('./routes/conocenos/conocenos.js')(angular, app);
	require('./routes/choferes/choferes.js')(angular, app);
	require('./routes/editFares/editFares.js')(angular, app);
	require('./routes/editUser/editUser.js')(angular, app);
	require('./routes/adminUsers/adminUsers.js')(angular, app);
	require('./routes/reqPackages/reqPackages.js')(angular, app);
	require('./routes/reqTrips/reqTrips.js')(angular, app);
	require('./routes/dashboard/dashboard.js')(angular, app);
	require('./routes/buyPackage/buyPackage.js')(angular, app);
	require('./routes/landingBuyPackage/landing.js')(angular, app);
	require('./routes/login/login.js')(angular, app);
	require('./routes/fpwd/fpwd.js')(angular, app);
	require('./routes/register/register.js')(angular, app);
	require('./routes/addPackage/addPackage.js')(angular, app);
	require('./routes/tasar/search-brisas.js')(angular, app);
})();

},{"./components/brisas-carousel/brisas-carousel.js":2,"./components/brisas-chofer/brisas-chofer.js":3,"./components/brisas-contacto/brisas-contacto.js":4,"./components/brisas-footer/brisas-footer.js":5,"./components/brisas-paquetes/brisas-paquetes.js":6,"./components/brisas-seguridad/brisas-seguridad.js":7,"./components/brisas-service-description/brisas-service-description.js":8,"./components/header-brisas/header-brisas.js":9,"./components/navbar-brisas/navbar-brisas.js":10,"./components/uploader/uploader.js":11,"./routes/addPackage/addPackage.js":12,"./routes/adminUsers/adminUsers.js":13,"./routes/buyPackage/buyPackage.js":14,"./routes/choferes/choferes.js":15,"./routes/conocenos/conocenos.js":16,"./routes/dashboard/dashboard.js":17,"./routes/editFares/editFares.js":18,"./routes/editUser/editUser.js":19,"./routes/fpwd/fpwd.js":20,"./routes/home/home.js":21,"./routes/landingBuyPackage/landing.js":22,"./routes/login/login.js":23,"./routes/paquetes-desc/paquetes-desc.js":24,"./routes/paquetes/paquetes.js":25,"./routes/register/register.js":26,"./routes/reqPackages/reqPackages.js":27,"./routes/reqTrips/reqTrips.js":28,"./routes/tasar/search-brisas.js":29,"./services/uploadService.js":30}],2:[function(require,module,exports){
function BrisasCarouselDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasCarousel', brisasCarouselDirective);

    function brisasCarouselDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-carousel/brisas-carousel.template.html',
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
    			image: './dist/styles/images/slide_1.jpg'
    		},
    		{
    			text:'DISPONIBILIDAD DE UNIDADES',
                subtext:'Vehiculos disponibles 24/7 para todas tus necesidades',
    			image: './dist/styles/images/slide_2.jpg'
    		},
    		{
    			text:'SELECCION DE CONDUCTORES',
                subtext:'Pedinos tu conductor favorito, lo reservaremos para vos',
    			image: './dist/styles/images/slide_3.jpg'
    		},
    		{
    			text:'PENSADO PARA TU CONFORT',
                subtext:'Ultimo modelo en unidades, para que disfrutes tus viajes al maximo',
    			image: './dist/styles/images/slide_4.jpg'
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
},{}],4:[function(require,module,exports){
function BrisasContactoDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasContacto', brisasContactoDirective);
    brisasContactoDirective.$inject = ['$state','$http'];
    function brisasContactoDirective($state,$http){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-contacto/brisas-contacto.template.html',
    		link: link,
    		controllerAs: 'contactoCtrl',
    		controller: controller
    	};

    	function link(scope, ctrl, element, attrs) {

        }
        function controller(){
    		var self = this; //jshint
            function sendMail(){
                $http.post('./dist/php/sendMail.php',
                {
                    name: self.email.name,
                    lastname:self.email.lastname,
                    tel:self.email.tel,
                    mail:self.email.mail,
                    consulta:self.email.consulta,
                    contactForm: true
                }).then(function (response){
                    $state.go('home',{},{reload:true});
                });
            }
            function sending(){
                self.btnMsg = "Enviando...";
                self.sendingMsg = true;
            }
            function init(){
                self.btnMsg = "Consultar";
                self.sending = sending;
                self.email = {
                    'name':'',
                    'lastname':'',
                    'tel':'',
                    'mail':'',
                    'consulta':''
                };
                self.sendMail = sendMail;
            }
            init();
        }
    }
}

module.exports = BrisasContactoDirective;
},{}],5:[function(require,module,exports){
function BrisasFooterDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasFooter', brisasFooterDirective);

    function brisasFooterDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-footer/brisas-footer.template.html',
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
function BrisasServiceDescriptionDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.directive('brisasServiceDescription', brisasServiceDescriptionDirective);

    function brisasServiceDescriptionDirective(){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/brisas-service-description/brisas-service-description.template.html',
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
},{}],9:[function(require,module,exports){
function BrisasHeaderDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line 
    

    app.directive('brisasHeader', brisasHeaderDirective);
    brisasHeaderDirective.$inject = ['$state'];
    function brisasHeaderDirective($window,$state){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/header-brisas/header-brisas.template.html',
    		link: link,
    		controllerAs: 'headerCtrl',
    		controller: controller
    	};

    	function link(scope,ctrl, element, attrs) {
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();   
            });
        }
        function controller($state){
          var self = this,
            enviado = false; //jshint
            self.data = {
                from:'',
                to:'',
                time:''
            };
            var from = document.getElementById('from');
            var autocomplete1 = new google.maps.places.Autocomplete(from);
            autocomplete1.setComponentRestrictions({'country': 'ar'});
            var to = document.getElementById('to');
            var autocomplete2 = new google.maps.places.Autocomplete(to);
            autocomplete2.setComponentRestrictions({'country': 'ar'});

            self.search = function(){
                self.data.from = $('#from').val();
                self.data.to = $('#to').val();
                $state.go('home.tasar',{ from: self.data.from, to: self.data.to,  time: self.data.time }, {reload:true});
            }
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
function uploaderDirective(angular, app) {
	'use strict';
	app.directive('uploaderModel', uploaderDirective);
	uploaderDirective.$inject = ['$parse'];
	function uploaderDirective($parse){
		return {
			restrict: 'A',
			link: function (scope, iElement, iAttrs) {
				iElement.on("change", function (e) {
					$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
				});
			}
		};
	}
}

module.exports = uploaderDirective;
},{}],12:[function(require,module,exports){
function addPackageController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('addPackageCtrl', addPackageCtrl);

    addPackageCtrl.$inject = ['$state','$scope','$sce','$http', '$filter','uploadService'];

    function addPackageCtrl($state, $scope, $sce, $http, $filter,uploadService,  fromState, fromParams){
        var self = this; //jshint ignore:line        
        self.package = {};
        self.editImg = [];
        function updatePackage(){
          if(self.editImg.length){
            self.package.editImg = JSON.stringify(self.editImg);
          }
          self.package.hasPromo = self.myPromo.value;
          self.package.zone = self.myZone;
          switch(self.package.hasPromo) {
            case 0: delete self.package.bonificado; delete self.package.porcentaje; break;            
            case 1: delete self.package.bonificado; break;            
            case 2: delete self.package.porcentaje;  break;       
          }
          
          uploadService.uploadForm(self.package, './dist/php/edit_package.php')
          .then(function () {
            $state.go('home.paquetes',{},{ reload: true });
          })
          .finally(function(){ });
        }
        function addPackage(){
          self.package.timestamp = (new Date).getTime();
          self.package.zone = self.myZone;
          uploadService.uploadForm(self.package, './dist/php/add_package.php')
          .then(function () {
            $state.go('home.paquetes',{},{ reload: true });
          })
          .finally(function(){ });
        }
        function submit(){
          if(self.isEditing){
            self.updatePackage();
          }else{
            self.addPackage();
          }
        }
        function changeImg(index, id){
          switch(index) {
            case 0: self.changeImg0 = true; self.editImg.push({img: 'img1', id:id}); break;            
            case 1: self.changeImg1 = true; self.editImg.push({img: 'img2', id:id}); break;            
            case 2: self.changeImg2 = true; self.editImg.push({img: 'img3', id:id}); break;            
            case 3: self.changeImg3 = true; self.editImg.push({img: 'img4', id:id}); break;           
          }
        }

        function init(){       
          self.promos = [
          {value:0, beneficio:"Seleccione un tipo de descuento"},
          {value:1, beneficio:"Porcentaje"},
          {value:2, beneficio:"Bonificado"}
          ];   
          self.zonas = [
          {value:'', name:"Seleccione una zona"},
          {value:'1', name:"Bodegas"},
          {value:'2', name:"Alta Monta&ntilde;a"},
          {value:'3', name:"City Tour"},
          {value:'4', name:"Sur Mendocino"},
          {value:'5', name:"Este Mendocino"},
          {value:'6', name:"D&iacute;a de campo"}
          ];  
          self.changeImg0 = false;
          self.changeImg1 = false;
          self.changeImg2 = false;       
          self.changeImg3 = false;
          self.isEditing = false;
          self.myPromo = self.promos[0];   
          self.myZone = self.zonas[0].value;

          self.actionLabel = "Crear Paquete";
          if( $state.params.packageId ){
            $http.get('./dist/php/get_packages.php').then(function(response) {           
              self.package = $filter('filter')(response.data.packages, {id: $state.params.packageId})[0];
              self.actionLabel = "Modificar Paquete";
              self.isEditing = true;
              self.myPromo = self.promos[self.package.hasPromo];
              self.myZone = self.zonas[self.package.zone].value;
            });
          }
          // $('html, body').animate({
          //   scrollTop: $("#addPackage").offset().top
          // }, 1000); 
          self.addPackage = addPackage;
          self.updatePackage = updatePackage;
          self.submit = submit;
          self.changeImg = changeImg;
        }
        init();
      }
    };
    module.exports = addPackageController;
},{}],13:[function(require,module,exports){
function adminUsersController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('adminUsersCtrl', adminUsersCtrl);
    adminUsersCtrl.$inject = ['$state','$scope','$http','$uibModal','$filter'];
    app.controller('modalUserCtrl', modalUserCtrl);
    modalUserCtrl.$inject = ['$scope','$state','$http','$filter','$uibModalInstance','$rootScope','items'];

    function adminUsersCtrl($state, $scope, $http, $uibModal, $filter){
        var self = this; //jshint ignore:line
        self.users = [];
        self.user = {};
        function remove(user){
          self.user = user;
          self.openModal('md');
        }
        function edit(user){
          $state.go('home.editUser', {user: user},{});
        }
        function makeAdmin(user){

          $http.post('./dist/php/edit_user.php', {
            id: user.id,
            lockunlock: user.isAdmin,
            editUser:false
          }).then(function (response){
            $state.go($state.current,{},{ reload: true });
          });
        }
        function openModal(size){
         var modalInstance = $uibModal.open({
          templateUrl: 'confirmRemove.html',
          controller: 'modalUserCtrl',
          controllerAs:'modalUser',
          size: size,
          resolve: {
            items: function () {
              return self.user;
            }
          }

        });
       }
       function init(){
         self.remove = remove;
         self.edit = edit;
         self.makeAdmin = makeAdmin;
         self.openModal = openModal;
         $scope.filtered = [];
         $http.post('./dist/php/get_users.php',{ sskey: sessionStorage.getItem('sskey') }).then(function(response) {    

          self.users = response.data.users;
          $scope.totalItems = Object.keys(self.users).length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;
          $scope.maxSize = 5;
          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };
          $scope.pageChanged = function() {

          };
          $scope.$watch('search', function (term) {
            var obj = term;
            $scope.filtered = $filter('filter')(self.users, obj);
            $scope.currentPage = 1;
          }); 
        });
       }
       init();
     }
     function modalUserCtrl($scope,$state,$http, $filter, $uibModalInstance, $rootScope, items){

      var self = this;
      
      function confirm(){       
        $http.post('./dist/php/delete_user.php', {
          id: self.user.id
        }).then(function (response){
         $uibModalInstance.dismiss('cancel');
         $state.go($state.current,{},{ reload: true });              
       });
      }
      function cancel(){
       $uibModalInstance.dismiss('cancel');
     }
     function init(){
      console.log(items);
      self.user = items;
      self.confirm = confirm;
      self.cancel = cancel;
    }

    init();
  }
};
module.exports = adminUsersController;
},{}],14:[function(require,module,exports){
function BuyPackageController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('buyPackageCtrl', buyPackageCtrl);

    buyPackageCtrl.$inject = ['$state','$scope','$rootScope','$http','$sce'];

    function buyPackageCtrl($state, $scope,$rootScope,$http,$sce){
        var self = this; //jshint ignore:line
        function trustSrc (src) {
            return $sce.trustAsResourceUrl(src);
        }

        function init(){
            $('html, body').animate({ scrollTop: 420 }, 'slow');    
            if($state.params.paymentGatewayUrl){
                self.paymentGatewayUrl = $state.params.paymentGatewayUrl;
            } else {
                $state.go('home.paquetes',{},{reload:true});
            }            
            self.trustSrc = trustSrc;
        }
        init();
    }
};
module.exports = BuyPackageController;
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
function dashboardController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$state','$scope','$rootScope','$http','$sce'];

    function dashboardCtrl($state, $scope,$rootScope,$http){
        var self = this; //jshint ignore:line

        function init(){
            $rootScope.tripsToContest = $scope.tripsToContest;
            $('html, body').animate({ scrollTop: 420 }, 'slow');    
            self.tabs = [
            { title: "Crear paquetes", route: "tab1", active: true },
            { title: "Editar Tarifas", route: "tab2", active: false },
            { title: "Administrar usuarios", route: "tab3", active: false },
            { title: "Solicitudes de paquetes", route: "tab4", active: false },
            { title: "Solicitudes de viajes", route: "tab5", active: false }
            ];

        }
        init();
    }
};
module.exports = dashboardController;
},{}],18:[function(require,module,exports){
function faresController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('faresCtrl', faresCtrl);

    faresCtrl.$inject = ['$state','$scope','$http'];

    function faresCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.fare = {};
        function update(){
          $http.post('./dist/php/edit_fares.php', {
            bbandera_dia: parseFloat(self.fare.bbandera_dia).toFixed(2),
            km_dia: parseFloat(self.fare.km_dia).toFixed(2),
            bbandera_noche: parseFloat(self.fare.bbandera_noche).toFixed(2),
            km_noche: parseFloat(self.fare.km_noche).toFixed(2)
          }).then(function (response){
            $state.go('home',{},{reload:true});
          });
        }
        function init(){
         self.update = update;
         $http.get('./dist/php/get_fares.php').then(function(response) {    
          angular.forEach(response.data.fares, function(item){
            if(item.daytime == 1){
              self.fare.bbandera_dia = item.bajada_bandera;
              self.fare.km_dia =  item.km;
            } else if(item.daytime == 2) {
              self.fare.bbandera_noche = item.bajada_bandera;
              self.fare.km_noche =  item.km;
            }
          });
        });
       }
       init();
     }
   };
   module.exports = faresController;
},{}],19:[function(require,module,exports){
function editUsersController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('editUsersCtrl', editUsersCtrl);

    editUsersCtrl.$inject = ['$state','$scope','$http'];

    function editUsersCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.user = {};
        function update(){
          $http.post('./dist/php/edit_user.php', {
            id: self.user.id,
            name:self.user.name,
            lastname:self.user.lastname,
            email:self.user.email,
            tel:self.user.tel,
            city:self.user.city,
            password:self.user.password || '',
            editUser: true
          }).then(function (response){
            $state.go('home',{},{reload:true});
          });
        }
        function init(){
          if($state.params.userId){
            $http
            .post('./dist/php/get_users.php',{sskey: sessionStorage.getItem('sskey'), userId: $state.params.userId })
            .then(function(response) {  
              self.user = response.data.users[0];
            });
          }
          $('html, body').animate({ scrollTop: 500 }, 'slow'); 
          self.update = update;
          self.user = $state.params.user;

          var input1 = document.getElementById('country');
          var autocomplete = new google.maps.places.Autocomplete(input1);
        }
        init();
      }
    };
    module.exports = editUsersController;
},{}],20:[function(require,module,exports){
function fpwdController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('fpwdCtrl', fpwdCtrl);
    fpwdCtrl.$inject = ['$http','$filter','$timeout','$state','$scope','$sce'];

    function fpwdCtrl($http, $filter,$timeout, $state, $scope,$stateParams,$sce){
        var self = this;
        self.validToken = false;
        self.successChangingPwd = false;
        function validatePwd(pwd1,pwd2){
            if(pwd1 === pwd2){
                self.changepwd(pwd1);
                self.fpwdForm.$setValidity('valid',true);
                self.fpwdForm.pwd1.$setValidity('valid',true);
                self.fpwdForm.pwd2.$setValidity('valid',true);
            }else{
                self.fpwdForm.$setValidity('invalid',true);
                self.fpwdForm.pwd1.$setValidity('invalid',true);
                self.fpwdForm.pwd2.$setValidity('invalid',true);
                self.match = true;                
            }
        }
        function changepwd(pwd){
            console.log(pwd);
            $http
            .post('./dist/php/reset_pwd.php', { pwd:pwd, token: $state.params.token, toReset: true })
            .then(function (response){
               self.successChangingPwd = true;
               $timeout(function() { 
                $state.go('home'); 
            }, 5000);
           });
        }
        function init(){ 
         self.match = false;
         self.invalidMsg = "";
         self.changepwd = changepwd;
         self.validatePwd = validatePwd;
         if($state.params.token){            
            self.validToken = true;
            $http
            .post('./dist/php/reset_pwd.php', { token: $state.params.token, checkValidToken: true })
            .then(function (response){
                if(response.data.errors.invalid){
                 self.validToken = false;
                 self.invalidMsg = "El C&oacute;digo de renovaci&oacute;n de contrase&ntilde;a es inv&aacute;lido o ya ha sido utilizado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";

                 $timeout(function() { 
                    $state.go('home'); 
                }, 5000);
             }
             if(response.data.errors.expired){
                 self.validToken = false;
                 self.invalidMsg = "El C&oacute;digo de renovaci&oacute;n de contrase&ntilde;a ha expirado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";
                 $timeout(function() { 
                    $state.go('home'); 
                }, 5000);
             }
         });
        }else{
            self.validToken = false;
        }

        $('html, body').animate({ scrollTop: 460 }, 'slow');    
    }
    init();
}

};
module.exports = fpwdController;
},{}],21:[function(require,module,exports){
function homeController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$state','$scope','$rootScope','$window','$http'];

    function homeCtrl($state, $scope, $rootScope,$window,$http){
        var self = this; //jshint ignore:line


        function init(){
            $('html, body').scrollTop(0);

            $rootScope.$on("$stateChangeSuccess", function (event, currentState, previousState) {
                $window.scrollTo(0, 0);
            });
        }
        init();
    }
};
module.exports = homeController;
},{}],22:[function(require,module,exports){
function landingController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('landingCtrl', landingCtrl);

    landingCtrl.$inject = ['$state','$scope','$rootScope','$http','$sce'];

    function landingCtrl($state, $scope,$rootScope,$http){
        var self = this; //jshint ignore:line
        function goHome(){
            $state.go('home',{reload:true});
        }
        function init(){
            $('html, body').animate({ scrollTop: 420 }, 'slow');    
            $http.post('./dist/php/add_soldpackage.php', {
             name : $rootScope.pckg.name,
             lastname : $rootScope.pckg.lastname,
             email : $rootScope.pckg.email,
             tel : $rootScope.pckg.tel,
             date :  $rootScope.pckg.date,
             time : $rootScope.pckg.time,
             packageId : $rootScope.pckg.packageId
         }).then(function (response){

        });
         self.goHome = goHome;
    }
    init();
}
};
module.exports = landingController;
},{}],23:[function(require,module,exports){
function loginController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$state','$scope', '$rootScope','$http'];

    function loginCtrl($state, $scope, $rootScope,$http){
        var self = this; //jshint ignore:line
        self.user = {};
        self.fpwduser = {};
        self.error = '';
        self.loginError = "";
        function login(){
          $http.post('./dist/php/login.php', {username: self.user.username, password:self.user.password})
          .then(function (response){
            self.error = '';
            if(!response.data.errors){
              sessionStorage.sskey = response.data.sskey;
              sessionStorage.username = response.data.name  + " " + response.data.lastname;
              self.loginForm.$setPristine();
              self.user = {};
              $state.go("home",{},{reload: true});
            } else {
              self.error = response.data.errors.loginError;
              self.loginForm.$setPristine();
              self.user = {};
            }
          });
        }
        function pwdreset(){
          self.fpwduser.sending = true;
          $http
          .post('./dist/php/reset_pwd.php', { email: self.fpwduser.email, toReset: false })
          .then(function (response){
            self.error = '';
            if(!response.data.errors){
              $http.post('./dist/php/sendMail.php', {
                email:self.fpwduser.email,
                token:response.data.fpswdToken,
                msg:"se ha solicitado la renovacion de contraseña para " + self.fpwduser.email + ",por favor ingresa en: http://localhost:8080/brisas_vip/#/reset-pwd/q"+response.data.fpswdToken + "para continuar con el proceso.",
                resetPwd: true
              }).then(function (response){
                self.showfpwdSuccessMsg = true;
              });              
            } else {
              self.fpwd.error = response.data.errors;
              self.registerForm.email.$setValidity("email", false);
            }
          });
        }
        function init(){
         $('html, body').animate({
          scrollTop: $("#login").offset().top
        }, 1000);
         self.fpwdshow = false;
         self.fpwduser.sending = false;
         self.pwdreset = pwdreset;
         self.login = login;
       }
       init();
     }
   };
   module.exports = loginController;
},{}],24:[function(require,module,exports){
function packageDescController(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('packageDescCtrl', packageDescCtrl);
    packageDescCtrl.$inject = ['$http','$filter','$state','$scope','$uibModal'];
    app.controller('modalPckgCtrl', modalPckgCtrl);
    modalPckgCtrl.$inject = ['$scope','$state','$filter','$uibModalInstance','$sce','$compile','$rootScope','items'];

    function packageDescCtrl($http, $filter, $state, $scope,$uibModal){
        var self = this, data = {}  ; //jshint ignore:line
        $http.get('./dist/php/get_packages.php').then(function(response) {           
            self.data = $filter('filter')(response.data.packages, {id: $state.params.packageId})[0];
            if(self.data.bonificado){
                self.data.bonificado = self.data.bonificado.split(",");
            }
            self.data.imgSelected = self.data.images[0].url;
        });
        self.toBigPicture = toBigPicture;
        function openModal(size){
            var modalInstance = $uibModal.open({
                templateUrl: 'buyModal.html',
                controller: 'modalPckgCtrl',
                controllerAs:'buyPckg',
                size: size,
                resolve: {
                    items: function () {
                        return self.data;
                  }
              }
          });
        }
        function buyPackage(){
            self.openModal('md');
        }
        function init(){     
            $('html, body').animate({ scrollTop: 460 }, 'slow');    
            self.openModal = openModal;
            self.buyPackage = buyPackage;
        }
        function toBigPicture(src){
            self.data.imgSelected = src;
        }
        init();
    }
    function modalPckgCtrl($scope,$state,$filter, $uibModalInstance,$sce,$compile,$rootScope,items){
        var self = this;        
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        $scope.open1 = function() {
            $scope.popup1.opened = true;
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };
        $scope.today();
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };
        function buy(){
          self.pckg.date =  $filter('date')($scope.dt,'dd-MM-yyyy');
          self.pckg.time = $filter('date')($scope.mytime,'HH:mm');
          $uibModalInstance.dismiss('cancel');
          self.paymentGatewayUrl = items.paymentGatewayUrl;
          self.pckg.packageId = items.id;  
          $rootScope.pckg = self.pckg;
          $state.go('home.buyPackage',{ paymentGatewayUrl: self.paymentGatewayUrl, packageId: self.packageId }, {reload:true});
      }
      function cancel(){
         $uibModalInstance.dismiss('cancel');
     };
     $rootScope.$on("$stateChangeStart", function (evt) {
      $uibModalInstance.dismiss('cancel');
  });
     function init(){
        self.buy = buy;
        self.cancel = cancel;
        self.pckg = {};
    }
    init();
}
};
module.exports = packageDescController;
},{}],25:[function(require,module,exports){
function packageController(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('packageCtrl', packageCtrl);
    app.filter('rangeFilter',rangeFilter);
    packageCtrl.$inject = ['$http','$state','$filter','$sce'];

    function packageCtrl($http,$state,$filter,$sce){
        var self = this, data = {}  ; //jshint ignore:line
        $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: false  }).success(function (response){
          self.isAdmin = response.isAdmin;
        });
        function remove(id, title){
          if(confirm("Esta seguro que desea eliminar el paquete '" + title + "' ?")){
            $http.post('./dist/php/delete_package.php', {
              id: id
            }).then(function (response){
              $state.go($state.current,{},{ reload: true });              
            });
          }
        }
        function edit(pkgedit){
          $state.go('home.editPackage', {pkgedit: pkgedit},{});
        }
        function getPackages(){
          $http.get('./dist/php/get_packages.php').then(function(response) {    
            self.packages = response.data.packages;
          });
        }
        function init(){ 
          self.minPrice = 0;
          self.maxPrice = 20000;
          self.userMinPrice = self.minPrice;
          self.userMaxPrice = self.maxPrice;
          self.airport = false;
          self.hotel = false;
          self.allInclusive = false;
          self.lunch = false;
          $('html, body').animate({ scrollTop: 450 }, 'slow');    
          self.remove = remove;        
          self.edit = edit;
          self.getPackages = getPackages;
          self.getPackages();
        }
        init();
      }
      function rangeFilter() {
        return function( items, rangeInfo ) {
          if(items !== undefined){
            var filtered = [];
            var min = parseInt(rangeInfo.userMinPrice);
            var max = parseInt(rangeInfo.userMaxPrice);
        // If time is with the range
        angular.forEach(items, function(item) {
          if(!item.porcentaje){
            if( item.price >= min && item.price <= max ) {
              filtered.push(item);
            }
          }else{
            var discount = item.price - ((item.price * item.porcentaje) / 100);
            if( discount >= min && discount <= max ) {
              filtered.push(item);
            }
          }
        });
        return filtered;
      } else {
        return items;
      };
    };
  }
};

module.exports = packageController;
},{}],26:[function(require,module,exports){
function registerController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$state','$scope','$http','$timeout'];

    function registerCtrl($state, $scope,$http,$timeout){
        var self = this; //jshint ignore:line        
        self.user = {};
        function register(){
          if(validatePwd(self.user.password, self.user.pwd2)){
            self.user.country = $('#country').val();
            self.btnMsg = "Enviando";
            self.sending = true;
            $http.post('./dist/php/register.php', {
              name: self.user.name,
              lastname: self.user.lastname,
              email: self.user.email,
              tel: self.user.tel,
              city: self.user.country,
              password: self.user.password
            })
            .then(function (response){
              self.error = '';
              if(!response.data.errors){       
                $http.post('./dist/php/sendMail.php', {
                  email: self.user.email,
                  token: response.data.registerToken,
                  msg:"se ha solicitado el registro de el usuario " + self.user.email + ",por favor ingresa en: http://localhost:8080/brisas_vip/#/register/"+response.data.registerToken + "para continuar con el proceso.",
                  registerToken: true
                }).then(function (response){
                  self.registerForm.$setPristine();
                  self.user = {};         
                  self.validateRegister = true;
                });     
              } else {
                self.error = response.data.errors;
                self.registerForm.email.$setValidity("email", false);
              }
            });
          }
        }
        function validatePwd(pwd1,pwd2){
          if(pwd1 !== pwd2){
            self.registerForm.password.$setValidity('invalid',true);
            self.registerForm.pwd2.$setValidity('invalid',true);
            self.match = true;
            return false;                
          }else{          
            self.registerForm.password.$setValidity('valid',true);
            self.registerForm.pwd2.$setValidity('valid',true);
            self.match = false; 
            return true;               
          }
        }

        function resetEmail(){
          self.error = "";
        }
        function init(){         
          self.validateRegister = false;
          self.validToken = true;
          self.btnMsg = "Registrarme";
          self.sending = false;
          self.concludeRegister = false;
          $('html, body').animate({
            scrollTop: $("#register").offset().top
          }, 1000); 
          self.register = register;
          self.resetEmail = resetEmail;
          var input1 = document.getElementById('country');
          var autocomplete = new google.maps.places.Autocomplete(input1);
          if($state.params.token){           

            $http
            .post('./dist/php/register.php', { conclude:true, token: $state.params.token})
            .then(function(response){
              console.log(response);
              if(response.data.errors.invalid){
                self.validToken = false;
                self.invalidMsg = "El C&oacute;digo de Registro es inv&aacute;lido o ya ha sido utilizado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";
                $timeout(function() { 
                  $state.go('home'); 
                }, 5000);
              } else if(response.data.errors.expired){
                self.validToken = false;
                self.invalidMsg = "El C&oacute;digo de Registro ha expirado.<br>Ser&aacute; redireccionado a la pantalla principal.<br> Por favor intente nuevamente.<br> Muchas gracias por elegirnos.";
                $timeout(function() { 
                  $state.go('home'); 
                }, 5000);
              }else {
                self.concludeRegister = true;
              }
            });
          }else{
            self.concludeRegister = false;            

          }
        }

        init();
      }
    };
    module.exports = registerController;
},{}],27:[function(require,module,exports){
function reqPackagesController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqPackagesCtrl', reqPackagesCtrl);

    reqPackagesCtrl.$inject = ['$state','$scope','$http','$filter'];

    function reqPackagesCtrl($state, $scope,$http,$filter){
        var self = this; //jshint ignore:line
        self.packages = [];
        $scope.filtered = [];
        function init(){
         $http.get('./dist/php/get_reqPackages.php').then(function(response) {    
          self.packages = response.data.reqPackages;
          $scope.totalItems = Object.keys(self.packages).length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;
          $scope.maxSize = 5;
          $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
          };
          $scope.pageChanged = function() {

          };
          $scope.$watch('search', function (term) {
            var obj = term;
            $scope.filtered = $filter('filter')(self.packages, obj);
            $scope.currentPage = 1;
          }); 
        });
       }
       init();
     }
   };
   module.exports = reqPackagesController;
},{}],28:[function(require,module,exports){
function reqTripsController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('reqTripsCtrl', reqTripsCtrl);
    reqTripsCtrl.$inject = ['$state','$scope','$rootScope','$http','$uibModal','$filter'];
    app.controller('modalTripCtrl', modalTripCtrl);
    modalTripCtrl.$inject = ['$scope','$state','$http','$filter','$uibModalInstance','$rootScope','items'];

    function reqTripsCtrl($state, $scope,$rootScope,$http,$uibModal,$filter){
        var self = this; //jshint ignore:line
        self.trips = [];
        self.trip = {};
        function confirm(trip){
         self.trip = trip;
         self.trip.confirmTrip = true;
         self.openModal('md');

       }
       function revoke(trip){
        self.trip = trip;
        self.trip.confirmTrip = false;
        self.openModal('md');

      }
      function openModal(size){
       var modalInstance = $uibModal.open({
        templateUrl: 'confirmTripModal.html',
        controller: 'modalTripCtrl',
        controllerAs:'modalTrip',
        size: size,
        resolve: {
          items: function () {
            return self.trip;
          }
        }

      });
     }
     function init(){
      $scope.filtered = [];
      self.openModal = openModal;
      self.revoke = revoke;
      self.confirm = confirm;
      $http.get('./dist/php/get_reqTrips.php').then(function(response) {    
        self.trips = response.data.reqTrips;
        $rootScope.tripsToContest = $filter('filter')(self.trips, {state:0}).length;
        console.log($rootScope.tripsToContest);
        $scope.totalItems = Object.keys(self.trips).length;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;
        $scope.maxSize = 5;
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
        $scope.pageChanged = function() {

        };
        $scope.$watch('search', function (term) {
          var obj = term;
          $scope.filtered = $filter('filter')(self.trips, obj);
          $scope.currentPage = 1;
        }); 
      });
    }
    init();
  }
  function modalTripCtrl($scope,$state,$http, $filter, $uibModalInstance, $rootScope, items){

    var self = this;

    function confirm(){
      var trip = items;
      self.sendingEmail = true;
      if(items.confirmTrip){
        $http.post('./dist/php/sendMail.php', {
          email:trip.email,
          msg:"El viaje ha sido agendado. Muchas gracias por utilizar nuestros servicios.",
          from:trip.req_from,
          to:trip.req_to,
          date:trip.date,
          time:trip.time,
          price:trip.price,
          id:trip.id,
          confirm: true
        }).then(function (response){
          self.sendingEmail = false;
          self.action = "confirmar";
          $uibModalInstance.dismiss('cancel');
          $state.go($state.current,{},{ reload: true });
        });
      } else {
        self.sendingEmail = true;
        $http.post('./dist/php/sendMail.php', {
          email:trip.email,
          id:trip.id,
          msg:"Hubo un problema al procesar su solicitud de  viaje. Por favor comunicate a los siguientes tel&eacute;fonos para solicitar tu traslado: +54 9 0261 4309100 - +54 9 0261 4376499 - +54 9 0261 4378080. Muchas gracias.",
          revoke: true
        }).then(function (response){
          self.sendingEmail = false;
          self.action = "rechazar";
          $uibModalInstance.dismiss('cancel');
          $state.go($state.current,{},{ reload: true });
        });
      }
    }
    function cancel(){
     $uibModalInstance.dismiss('cancel');
   }
   function init(){
    self.sendingMsg = "Enviando...";
    self.sendingEmail = false;
    console.log(items);
    self.confirm = confirm;
    self.cancel = cancel;
    if(items.confirmTrip){
      self.action = "confirmar";
    }else{
      self.action = "rechazar";
    }
  }

  init();
}
};

module.exports = reqTripsController;
},{}],29:[function(require,module,exports){
function rateController(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('rateCtrl', rateCtrl);
    rateCtrl.$inject = ['$state','$scope','$http','$filter','$uibModal'];
    app.controller('modalCtrl', modalCtrl);
    modalCtrl.$inject = ['$scope','$state','$uibModalInstance','$sce','$compile','$rootScope'];


    function rateCtrl($state, $scope,$http,$filter,$uibModal){
        var self = this; //jshint ignore:line

        var options = {
        	componentRestrictions: {country: "ar"}
        };
        var dist = 0.00;
        var rendererOptions = {
        	'map': map,
        	'draggable':false
        };
        $scope.today = function() {
        	$scope.dt = new Date();
        };
        $scope.dateOptions = {
        	formatYear: 'yy',
        	maxDate: new Date(2020, 5, 22),
        	minDate: new Date(),
        	startingDay: 1
        };
        $scope.open1 = function() {
        	$scope.popup1.opened = true;
        	$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        	$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
        	opened: false
        };
        $scope.today();
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 1;

        $scope.options = {
        	hstep: [1, 2, 3],
        	mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
        	$scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
        	var d = new Date();
        	d.setHours( 14 );
        	d.setMinutes( 0 );
        	$scope.mytime = d;
        };

        var input1 = document.getElementById('from');
        var input2 = document.getElementById('to');
        var autocomplete = new google.maps.places.Autocomplete(input1,options);
        var autocomplete = new google.maps.places.Autocomplete(input2,options);
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        var directionsService = new google.maps.DirectionsService();
        var map;


        function initMap() {
        	var options = {
        		componentRestrictions: {country: "ar"}
        	};
        	google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {        
        		computeTotalDistance(directionsDisplay.directions);
        	});
        }
        function resetAll() {
        	map.setZoom(13);
        	map.panTo(new google.maps.LatLng(-32.888810, -68.850378));
        	$("#from").val(null);
        	$("#to").val(null);
        	$("#dist").val("0 km");
        	$("#total_price_ht_0").val("$0.00");
        	$("#tarifa").val('default');
        	directionsDisplay.setDirections({routes: []});
        };
        function calcRoute() {
        	var start =  $state.params.from;
        	var end = $state.params.to;
        	var request = {
        		origin: start,
        		destination: end,
           unitSystem: google.maps.UnitSystem.METRIC,
           travelMode: google.maps.DirectionsTravelMode.DRIVING
         };
         directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
           directionsDisplay.setDirections(response);
           console.log(response.routes[0].legs[0].distance);
           dist = parseFloat(response.routes[0].legs[0].distance.value/1000).toFixed(2);
           stripint(dist);
           recalc();
         }
       });
       }
       function computeTotalDistance(result) {
         var total = 0;
         var myroute = result.routes[0];
         for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total/1000;

        document.getElementById('total').innerHTML = total + ' km';
      }

      google.maps.event.addDomListener(window, 'load', initMap);
      function stripint(val) {

       $('#dist').val(val + ' Km.');
     }
     function recalc() {
        	// var calculatedDistance = $('#dist').val().replace(".", "");
        	// var calculatedDistance = parseFloat(calculatedDistance);
          console.log(dist);
          var selection = $('#tarifa').val();

          $http.post('./dist/php/get_fares.php', {
            daytime: selection
          }).then(function (response){
            if(response.data.fares.length){
             var total = ((dist * parseFloat(response.data.fares[0].km)) + parseFloat(response.data.fares[0].bajada_bandera)).toFixed(2);
             $('#totalPrice').val(total);
           }
         });
        }

        google.maps.event.addDomListener(window, 'load', initMap);
        function openModal(size){
        	var modalInstance = $uibModal.open({
        		templateUrl: 'myModal.html',
        		controller: 'modalCtrl',
        		size: size

        	});
        }
        function reserve(){

          self.reserved.from = $state.params.from;
          self.reserved.to = $state.params.to;
          self.reserved.distance = parseFloat($('#dist').val().replace(",", ""));
          self.reserved.price = $('#totalPrice').val();
          self.reserved.date =  $filter('date')($scope.dt,'dd-MM-yyyy');
          self.reserved.time = $filter('date')($scope.mytime,'HH:mm');
          self.reserved.user = sessionStorage.getItem('username');
          if(sessionStorage.getItem('sskey')){
            if(self.reserved.from  == "" || self.reserved.to == ""){
              self.noSearch = true;
            }else{
              self.btnMsg = "Solicitando...";
              self.sending = true;
              self.noSearch = false;
              $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: true }).success(function (response){
                self.userId = response.userId;
                self.userEmail = response.userEmail;
                self.userTel = response.userTel;
                $http.post('./dist/php/sendMail.php', {
                 from : $state.params.from,
                 to : $state.params.to,
                 distance : parseFloat($('#dist').val().replace(",", "")),
                 price : $('#totalPrice').val(),
                 date :  $filter('date')($scope.dt,'dd-MM-yyyy'),
                 time : $filter('date')($scope.mytime,'HH:mm'),
                 user : sessionStorage.getItem('username'),
                 userId : self.userId,
                 userEmail: self.userEmail,
                 userTel: self.userTel,
                 rateForm: true
               }).then(function (response){ self.openModal('md');self.sending = false; self.btnMsg = "Solicitar Viaje"; });
              });
            }
          } else {
            self.openModal('md');
          }
        }

        function init(){
         self.reserved = {
          'from':'',
          'to':'',
          'price':'',
          'distance':'',
          'date':'',
          'time':'',
          'user':''
        };
        self.btnMsg = "Solicitar Viaje";
        self.sending = false;
        $('#from').val($state.params.from);
        $('#to').val($state.params.to);
        $('#tarifa').val($state.params.time);
        self.data = $state.params;
        self.data.price = "0.00";
        self.reserve = reserve;
        self.openModal = openModal;
        $('html, body').animate({ scrollTop: 340 }, 'slow');    
        google.maps.event.addDomListener(window, 'load', initMap);
        var myLatlng = new google.maps.LatLng(-32.888810, -68.850378);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        calcRoute();
        directionsDisplay.setMap(map); 
        self.closed = false;
        var today = new Date();
        var today = parseInt(today.getDay());
        console.log(today);
        if(today !== 0 && today !== 6){
          $http.get('./dist/php/get_server_time.php').success(function(res){
            console.log(res);
            if(res == 1){
              self.closed = true;
              self.btnMsg = "Cerrado";
            } else {
              self.closed = false;
            }
          });
        }
        else {
          self.closed = true;
          self.btnMsg = "Cerrado";
        }
      }
      init();
    }
    function modalCtrl($scope,$state, $uibModalInstance,$sce,$compile,$rootScope){
     $scope.to_trusted = function(someHTML) {
      var compiledVal = $compile(someHTML)($scope);
      var compiledHTML = compiledVal[0].outerHTML;
      return $sce.trustAsHtml(compiledHTML);
    }
    if(sessionStorage.getItem('sskey')){
      $scope.isLogged = true;
      $scope.msg = "<span> El viaje ha sido solicitado satisfactoriamente, por favor espera la confirmaci&oacute;n de la reserva en tu correo.</span>";
      $scope.close = function(){
       $state.go('home',{},{reload:true});
       $uibModalInstance.dismiss('cancel');
     };
   }else{
    $scope.isLogged = false;

    $scope.msg = "<span>Debe ingresar en la aplicaci&oacute;n para poder solicitar un viaje.<br/> En caso de no poseer un usuario deber&aacute; <a ui-sref='home.register'>Registrarse</a>.</span>";
    $scope.toLogin = function(){
     $state.go("home.login",{},{reload:true});
     $uibModalInstance.dismiss('cancel');
   };
   $scope.cancel = function(){
     $uibModalInstance.dismiss('cancel');
   };
 }
 $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
  $uibModalInstance.dismiss('cancel');
});
}
};
module.exports = rateController;
},{}],30:[function(require,module,exports){
function uploadService(angular, app) {
	'use strict';
	app.service('uploadService', uploadService);
	uploadService.$inject = ["$http", "$q"];
	function uploadService($http, $q){
		this.uploadForm = function (form, url) {
			var deferred = $q.defer();
			var formData = new FormData();
			angular.forEach(form, function(key,value){
				formData.append(value,key);
			});
			return $http.post(url, formData, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (msg, code) {
				deferred.reject(msg);
			});
			return deferred.promise;
		}
	}
}
module.exports = uploadService;
},{}]},{},[1]);
