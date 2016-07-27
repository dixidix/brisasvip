function editUsersController(angular, app) {
  'use strict';

    'use angular template'; //jshint ignore:line

    app.controller('editUsersCtrl', editUsersCtrl);

    editUsersCtrl.$inject = ['$state','$scope','$http'];

    function editUsersCtrl($state, $scope,$http){
        var self = this; //jshint ignore:line
        self.user = {};
        function update(){
          $http.post('./dist/php/edit_user.php', {
            id: self.user.id,
            name:self.user.name,
            lastname:self.user.lastname,
            email:self.user.email,
            tel:self.user.tel,
            city:self.user.city,
            password:self.user.password || '',
            editUser: true
          }).then(function (response){
            $state.go('home',{},{reload:true});
          });
        }
        function init(){
          $('html, body').animate({ scrollTop: 500 }, 'slow'); 
          self.update = update;
          self.user = $state.params.user;
          var input1 = document.getElementById('country');
          var autocomplete = new google.maps.places.Autocomplete(input1);
        }
        init();
      }
    };
    module.exports = editUsersController;