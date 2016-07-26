function rateController(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('rateCtrl', rateCtrl);
    rateCtrl.$inject = ['$state','$scope','$http','$filter','$uibModal'];
    app.controller('modalCtrl', modalCtrl);
    modalCtrl.$inject = ['$scope','$state','$uibModalInstance','$sce','$compile','$rootScope'];


    function rateCtrl($state, $scope,$http,$filter,$uibModal){
        var self = this; //jshint ignore:line

        var options = {
        	componentRestrictions: {country: "ar"}
        };
        var rendererOptions = {
        	'map': map,
        	'draggable':false
        };
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

        var input1 = document.getElementById('from');
        var input2 = document.getElementById('to');
        var autocomplete = new google.maps.places.Autocomplete(input1,options);
        var autocomplete = new google.maps.places.Autocomplete(input2,options);
        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
        var directionsService = new google.maps.DirectionsService();
        var map;


        function initMap() {
        	var options = {
        		componentRestrictions: {country: "ar"}
        	};
        	google.maps.event.addListener(directionsDisplay, 'directions_changed', function () {        
        		computeTotalDistance(directionsDisplay.directions);
        	});
        }
        function resetAll() {
        	map.setZoom(13);
        	map.panTo(new google.maps.LatLng(-32.888810, -68.850378));
        	$("#from").val(null);
        	$("#to").val(null);
        	$("#dist").val("0 km");
        	$("#total_price_ht_0").val("$0.00");
        	$("#tarifa").val('default');
        	directionsDisplay.setDirections({routes: []});
        };
        function calcRoute() {
        	var start =  $state.params.from;
        	var end = $state.params.to;
        	var request = {
        		origin: start,
        		destination: end,
        		travelMode: google.maps.DirectionsTravelMode.DRIVING
        	};
        	directionsService.route(request, function (response, status) {
        		if (status == google.maps.DirectionsStatus.OK) {
        			directionsDisplay.setDirections(response);
        			var dist = response.routes[0].legs[0].distance.text;
        			stripint(dist);
        			recalc();
        		}
        	});
        }
        function computeTotalDistance(result) {
        	var total = 0;
        	var myroute = result.routes[0];
        	for (var i = 0; i < myroute.legs.length; i++) {
        		total += myroute.legs[i].distance.value;
        	}
        	total = total/1000;

        	document.getElementById('total').innerHTML = total + ' km';
        }

        google.maps.event.addDomListener(window, 'load', initMap);
        function stripint(val) {

        	$('#dist').val(val);
        }
        function recalc() {
        	var calculatedDistance = $('#dist').val().replace(",", "");
        	var calculatedDistance = parseFloat(calculatedDistance);
        	var selection = $('#tarifa').val();

        	$http.post('./dist/php/get_fares.php', {
        		daytime: selection
        	}).then(function (response){
        		if(response.data.fares.length){
        			var total = ((calculatedDistance * parseFloat(response.data.fares[0].km)) + parseFloat(response.data.fares[0].bajada_bandera)).toFixed(2);
        			$('#totalPrice').val(total);
        		}
        	});
        }

        google.maps.event.addDomListener(window, 'load', initMap);
        function openModal(size){
        	var modalInstance = $uibModal.open({
        		templateUrl: 'myModal.html',
        		controller: 'modalCtrl',
        		size: size

        	});
        }
        function reserve(){

          self.reserved.from = $state.params.from;
          self.reserved.to = $state.params.to;
          self.reserved.distance = parseFloat($('#dist').val().replace(",", ""));
          self.reserved.price = $('#totalPrice').val();
          self.reserved.date =  $filter('date')($scope.dt,'dd-MM-yyyy');
          self.reserved.time = $filter('date')($scope.mytime,'HH:mm');
          self.reserved.user = sessionStorage.getItem('username');
          if(sessionStorage.getItem('sskey')){
            if(self.reserved.from  == "" || self.reserved.to == ""){
              self.noSearch = true;
            }else{
              self.btnMsg = "Solicitando...";
              self.sending = true;
              self.noSearch = false;
              $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey'), getuserinfo: true }).success(function (response){
                self.userId = response.userId;
                self.userEmail = response.userEmail;
                self.userTel = response.userTel;
                console.log(self.userId,self.userEmail,self.userTel);
                $http.post('./dist/php/sendMail.php', {
                 from : $state.params.from,
                 to : $state.params.to,
                 distance : parseFloat($('#dist').val().replace(",", "")),
                 price : $('#totalPrice').val(),
                 date :  $filter('date')($scope.dt,'dd-MM-yyyy'),
                 time : $filter('date')($scope.mytime,'HH:mm'),
                 user : sessionStorage.getItem('username'),
                 userId : self.userId,
                 userEmail: self.userEmail,
                 userTel: self.userTel,
                 rateForm: true
               }).then(function (response){ self.openModal('md');self.sending = false; self.btnMsg = "Solicitar Viaje"; });
              });
            }
          } else {
            self.openModal('md');
          }
        }

        function init(){
         self.reserved = {
          'from':'',
          'to':'',
          'price':'',
          'distance':'',
          'date':'',
          'time':'',
          'user':''
        };
        self.btnMsg = "Solicitar Viaje";
        self.sending = false;
        $('#from').val($state.params.from);
        $('#to').val($state.params.to);
        $('#tarifa').val($state.params.time);
        self.data = $state.params;
        self.data.price = "0.00";
        self.reserve = reserve;
        self.openModal = openModal;
        $('html, body').animate({ scrollTop: 340 }, 'slow');    
        google.maps.event.addDomListener(window, 'load', initMap);
        var myLatlng = new google.maps.LatLng(-32.888810, -68.850378);
        var mapOptions = {
          zoom: 13,
          center: myLatlng,
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);

        calcRoute();
        directionsDisplay.setMap(map); 
      }
      init();
    }
    function modalCtrl($scope,$state, $uibModalInstance,$sce,$compile,$rootScope){
     $scope.to_trusted = function(someHTML) {
      var compiledVal = $compile(someHTML)($scope);
      var compiledHTML = compiledVal[0].outerHTML;
      return $sce.trustAsHtml(compiledHTML);
    }
    if(sessionStorage.getItem('sskey')){
      $scope.isLogged = true;
      $scope.msg = "<span> El viaje ha sido solicitado satisfactoriamente, por favor espera la confirmaci&oacute;n de la reserva en tu correo.</span>";
      $scope.close = function(){
       // $state.go('home',{},{reload:true});
       $uibModalInstance.dismiss('cancel');
     };
   }else{
    $scope.isLogged = false;

    $scope.msg = "<span>Debe ingresar en la aplicaci&oacute;n para poder solicitar un viaje.<br/> En caso de no poseer un usuario deber&aacute; <a ui-sref='home.register'>Registrarse</a>.</span>";
    $scope.toLogin = function(){
     $state.go("home.login",{},{reload:true});
     $uibModalInstance.dismiss('cancel');
   };
   $scope.cancel = function(){
     $uibModalInstance.dismiss('cancel');
   };
 }
 $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
  $uibModalInstance.dismiss('cancel');
});
}
};
module.exports = rateController;