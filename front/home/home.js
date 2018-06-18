angular.module( 'sample.home', [
	'sample.services',
	'ui.router',
	'angular-storage',
	'angular-jwt'
	])
.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		controller: 'HomeCtrl',
		templateUrl: 'home/home.html',
		data: {
			requiresLogin: true
		}
	});
})
.controller( 'HomeCtrl', function HomeController( $scope, $http, store, jwtHelper, RestService) {

	$scope.jwt = store.get('jwt');
	$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

	$scope.goToUsers = function(){
		
	};

	$scope.callAnonymousApi = function() {
    // Just call the API as you'd do using $http
    callApi('Anonymous', RestService.getUrl() + '/api/random-quote');
}

$scope.callSecuredApi = function() {
	callApi('Secured', RestService.getUrl() + '/api/protected/random-quote');
}

function callApi(type, url) {
	$scope.response = null;
	$scope.api = type;
	$http({
		url: url,
		method: 'GET'
	}).then(function(quote) {
		$scope.response = quote.data;
	}, function(error) {
		$scope.response = error.data;
	});
}

});
