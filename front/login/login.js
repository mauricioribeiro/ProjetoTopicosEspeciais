angular.module( 'sample.login', [
	'sample.services',
	'ui.router',
	'angular-storage'
	])
.config(function($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl',
		templateUrl: 'login/login.html'
	});
})
.controller( 'LoginCtrl', function LoginController( $scope, $http, store, $state, RestService) {

	$scope.user = {};

	$scope.login = function() {
		$http({
			url: RestService.getUrl() + '/login',
			method: 'POST',
			data: $scope.user
		}).then(function(response) {
			store.set('jwt', response.data.token);
			$state.go('home');
		}, function(error) {
			alert(error.data);
		});
	}

});
