function registerController(angular, app) {
    'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('registerCtrl', registerCtrl);

    registerCtrl.$inject = ['$state','$scope','$http'];

    function registerCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line        
        self.user = {};
        function register(){
            self.user.country = $('#country').val();
            $http.post('./dist/php/register.php', {
                name: self.user.name,
                lastname: self.user.lastname,
                email: self.user.email,
                tel: self.user.tel,
                city: self.user.country,
                password: self.user.password
            })
            .then(function (response){
                self.error = '';
                if(!response.data.errors){
                  self.registerForm.$setPristine();
                  self.user = {};
                  $state.go("home",{},{reload: true});
              } else {
                  self.error = response.data.errors;
                  self.registerForm.$setPristine();
                  self.user = {};
              }
          });
        }
        function init(){         
           $('html, body').animate({
            scrollTop: $("#register").offset().top
        }, 1000); 
           self.register = register;
         var input1 = document.getElementById('country');
         var autocomplete = new google.maps.places.Autocomplete(input1);
     }

     init();
 }
};
module.exports = registerController;