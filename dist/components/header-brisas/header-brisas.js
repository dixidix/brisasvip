function BrisasHeaderDirective(angular, app) {
	'use strict';

    'use angular template'; //jshint ignore:line 
    

    app.directive('brisasHeader', brisasHeaderDirective);

    function brisasHeaderDirective($window){
    	return {
    		restrict: "E",
    		replace: true,
    		templateUrl: 'components/header-brisas/header-brisas.template.html',
    		link: link,
    		controllerAs: 'headerCtrl',
    		controller: controller
    	};

    	function link(scope,ctrl, element, attrs) {
            $(document).ready(function(){
                $('[data-toggle="tooltip"]').tooltip();   
            });
        }
        function controller(){
          var self = this,
            enviado = false; //jshint
            self.data = {
                from:'',
                to:'',
                time:''
            };
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