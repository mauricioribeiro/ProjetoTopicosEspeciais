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
		params: {denied: null},
		data: {
			requiresLogin: true
		}
	});
})
.controller( 'HomeCtrl', function HomeController( $scope, $http, $state, $stateParams, store, jwtHelper, RestService) {

	$scope.jwt = store.get('jwt');
	$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
	$scope.denied = $stateParams.denied;

	$scope.goToUsers = function(){
		$state.go('users');
	};

	$scope.goToLogin = function(){
		$state.go('login');
	}

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
