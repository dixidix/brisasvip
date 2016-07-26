function uploadService(angular, app) {
	'use strict';
	app.service('uploadService', uploadService);
	uploadService.$inject = ["$http", "$q"];
	function uploadService($http, $q){
		this.uploadForm = function (form, url) {
			var deferred = $q.defer();
			var formData = new FormData();
			angular.forEach(form, function(key,value){
				formData.append(value,key);
			});
			return $http.post(url, formData, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			}).success(function (res) {
				deferred.resolve(res);
			}).error(function (msg, code) {
				deferred.reject(msg);
			});
			return deferred.promise;
		}
	}
}
module.exports = uploadService;