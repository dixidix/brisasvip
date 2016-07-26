function dashboardController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$state','$scope','$rootScope','$http','$sce'];

    function dashboardCtrl($state, $scope,$rootScope,$http){
        var self = this; //jshint ignore:line

        function init(){
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