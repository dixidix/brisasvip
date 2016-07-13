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