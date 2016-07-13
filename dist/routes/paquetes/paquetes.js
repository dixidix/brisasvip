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