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
