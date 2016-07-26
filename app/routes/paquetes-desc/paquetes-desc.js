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