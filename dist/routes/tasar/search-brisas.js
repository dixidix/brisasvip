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