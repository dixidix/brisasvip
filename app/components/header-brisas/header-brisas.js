function BrisasHeaderDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line 
    

    app.directive('brisasHeader', brisasHeaderDirective);
    brisasHeaderDirective.$inject = ['$state'];
    function brisasHeaderDirective($window,$state){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: './dist/components/header-brisas/header-brisas.template.html',
    		link: link,
    		controllerAs: 'headerCtrl',
    		controller: controller
    	};

    	function link(scope,ctrl, element, attrs) {
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();   
            });
        }
        function controller($state){
          var self = this,
            enviado = false; //jshint
            self.data = {
                from:'',
                to:'',
                time:''
            };
            var from = document.getElementById('from');
            var autocomplete1 = new google.maps.places.Autocomplete(from);
            autocomplete1.setComponentRestrictions({'country': 'ar'});
            var to = document.getElementById('to');
            var autocomplete2 = new google.maps.places.Autocomplete(to);
            autocomplete2.setComponentRestrictions({'country': 'ar'});

            self.search = function(){
                self.data.from = $('#from').val();
                self.data.to = $('#to').val();
                $state.go('home.tasar',{ from: self.data.from, to: self.data.to,  time: self.data.time }, {reload:true});
            }
            angular.element($window).bind("scroll", function() {
                if($('body').scrollTop() > 0){
                    self.scrolling = true;  
                } else {
                    self.scrolling = false;  
                }
            });
            self.searchData = function() {
               return self.enviado = true;
           }
       }
   }
}

module.exports = BrisasHeaderDirective;