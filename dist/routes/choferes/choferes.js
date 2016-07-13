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