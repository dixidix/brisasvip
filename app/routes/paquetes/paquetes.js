function packageController(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('packageCtrl', packageCtrl);
    app.filter('rangeFilter',rangeFilter);
    packageCtrl.$inject = ['$http','$state','$filter','$sce'];

    function packageCtrl($http,$state,$filter,$sce){

        var self = this, data = {}  ; //jshint ignore:line
        $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: false  }).success(function (response){
          self.isAdmin = response.isAdmin;
          $('#openSidebar').on('click', function(){
            console.log('pen');
            $('.sidebar').css('display','inline-block');
          });
          $('#closeSidebar').on('click', function(){
            console.log('clsw');
            $('.sidebar').css('display','none');
          });
        });

        function remove(id, title){
          if(confirm("Esta seguro que desea eliminar el paquete '" + title + "' ?")){
            $http.post('./dist/php/delete_package.php', {
              id: id
            }).then(function (response){
              $state.go($state.current,{},{ reload: true });              
            });
          }
        }
        function edit(pkgedit){
          $state.go('home.editPackage', {pkgedit: pkgedit},{});
        }
        function getPackages(){
          $http.get('./dist/php/get_packages.php').then(function(response) {    
            self.packages = response.data.packages;
          });
        }
        function init(){ 

          self.minPrice = 0;
          self.maxPrice = 20000;
          self.userMinPrice = self.minPrice;
          self.userMaxPrice = self.maxPrice;
          self.airport = false;
          self.hotel = false;
          self.allInclusive = false;
          self.lunch = false;
          $('html, body').animate({ scrollTop: 450 }, 'slow');    
          self.remove = remove;        
          self.edit = edit;
          self.getPackages = getPackages;
          self.getPackages();
        }
        init();
      }
      function rangeFilter() {
        return function( items, rangeInfo ) {
          if(items !== undefined){
            var filtered = [];
            var min = parseInt(rangeInfo.userMinPrice);
            var max = parseInt(rangeInfo.userMaxPrice);
        // If time is with the range
        angular.forEach(items, function(item) {
          if(!item.porcentaje){
            if( item.price >= min && item.price <= max ) {
              filtered.push(item);
            }
          }else{
            var discount = item.price - ((item.price * item.porcentaje) / 100);
            if( discount >= min && discount <= max ) {
              filtered.push(item);
            }
          }
        });
        return filtered;
      } else {
        return items;
      };
    };
  }
};

module.exports = packageController;