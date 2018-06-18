angular.module('sample.services', [])
.service('RestService', function RestService() {

	this.getUrl = function() {
		return 'http://localhost:8090';
	}

	return this;

});
