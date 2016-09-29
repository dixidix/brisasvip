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