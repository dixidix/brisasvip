function sessionService(angular, app) {
	'use strict';
	app.service('sessionService', sessionService);
	sessionService.$inject = ["$http", "$q"];
	function sessionService($http, $q){
		
		this.get_session = function () {
			var session = {};
			$http.post('./dist/php/check_session.php',{ sskey: sessionStorage.getItem('sskey') }).success(function (response){
				session.isAdmin = response.isAdmin;
			}).finally(function(){
				if(sessionStorage.getItem('sskey')){
					session.isLogged = true;
				} else {
					session.isLogged = false;
				}
				if(session.isLogged){
					session.username = sessionStorage.getItem('username');
				}
				return session;
			});			
		}		
	}
}
module.exports = sessionService;