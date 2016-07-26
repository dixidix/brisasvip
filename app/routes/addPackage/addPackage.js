function addPackageController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('addPackageCtrl', addPackageCtrl);

    addPackageCtrl.$inject = ['$state','$scope','$sce','$http', '$filter','uploadService'];

    function addPackageCtrl($state, $scope, $sce, $http, $filter,uploadService,  fromState, fromParams){
        var self = this; //jshint ignore:line        
        self.package = {};
        self.editImg = [];
        function updatePackage(){
          if(self.editImg.length){
            self.package.editImg = JSON.stringify(self.editImg);
          }
          self.package.hasPromo = self.myPromo.value;
          self.package.zone = self.myZone;
          switch(self.package.hasPromo) {
            case 0: delete self.package.bonificado; delete self.package.porcentaje; break;            
            case 1: delete self.package.bonificado; break;            
            case 2: delete self.package.porcentaje;  break;       
          }
          
          uploadService.uploadForm(self.package, './dist/php/edit_package.php')
          .then(function () {
            $state.go('home.paquetes',{},{ reload: true });
          })
          .finally(function(){ });
        }
        function addPackage(){
          self.package.timestamp = (new Date).getTime();
          self.package.zone = self.myZone;
          uploadService.uploadForm(self.package, './dist/php/add_package.php')
          .then(function () {
            $state.go('home.paquetes',{},{ reload: true });
          })
          .finally(function(){ });
        }
        function submit(){
          if(self.isEditing){
            self.updatePackage();
          }else{
            self.addPackage();
          }
        }
        function changeImg(index, id){
          switch(index) {
            case 0: self.changeImg0 = true; self.editImg.push({img: 'img1', id:id}); break;            
            case 1: self.changeImg1 = true; self.editImg.push({img: 'img2', id:id}); break;            
            case 2: self.changeImg2 = true; self.editImg.push({img: 'img3', id:id}); break;            
            case 3: self.changeImg3 = true; self.editImg.push({img: 'img4', id:id}); break;           
          }
        }

        function init(){       
          self.promos = [
          {value:0, beneficio:"Seleccione un tipo de descuento"},
          {value:1, beneficio:"Porcentaje"},
          {value:2, beneficio:"Bonificado"}
          ];   
          self.zonas = [
          {value:'', name:"Seleccione una zona"},
          {value:'1', name:"Bodegas"},
          {value:'2', name:"Alta Monta&ntilde;a"},
          {value:'3', name:"City Tour"},
          {value:'4', name:"Sur Mendocino"},
          {value:'5', name:"Este Mendocino"},
          {value:'6', name:"D&iacute;a de campo"}
          ];  
          self.changeImg0 = false;
          self.changeImg1 = false;
          self.changeImg2 = false;       
          self.changeImg3 = false;
          self.isEditing = false;
          self.myPromo = self.promos[0];   
          self.myZone = self.zonas[0].value;

          self.actionLabel = "Crear Paquete";
          if( $state.params.packageId ){
            console.log($state.params.packageId);
            $http.get('./dist/php/get_packages.php').then(function(response) {           
              self.package = $filter('filter')(response.data.packages, {id: $state.params.packageId})[0];
              self.actionLabel = "Modificar Paquete";
              self.isEditing = true;
              self.myPromo = self.promos[self.package.hasPromo];
              self.myZone = self.zonas[self.package.zone].value;
            });
          }
          // $('html, body').animate({
          //   scrollTop: $("#addPackage").offset().top
          // }, 1000); 
          self.addPackage = addPackage;
          self.updatePackage = updatePackage;
          self.submit = submit;
          self.changeImg = changeImg;
        }
        init();
      }
    };
    module.exports = addPackageController;