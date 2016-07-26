function sessionService(angular, app) {
	'use strict';
	app.service('sessionService', sessionService);
	sessionService.$inject = ["$http", "$q"];
	function sessionService($http, $q){
		self = this;
		self.session = {};
		self.get_session = function () {
            if(sessionStorage.getItem('sskey')){
                session.isLogged = true;
            }
            $http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey') }).then(function (response){
                self.session.isAdmin = response.data.isAdmin;
            });
            if(self.session.isLogged){
               self.session.username = sessionStorage.getItem('username');
            }
            return self.session;
		}
	}
}
module.exports = sessionService;