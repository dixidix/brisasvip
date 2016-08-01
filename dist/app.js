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
