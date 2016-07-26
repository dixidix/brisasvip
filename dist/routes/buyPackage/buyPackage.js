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