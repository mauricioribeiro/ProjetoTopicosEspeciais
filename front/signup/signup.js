angular.module( 'sample.signup', [
	'sample.services',
	'ui.router',
	'angular-storage'
	])
.config(function($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		controller: 'SignupCtrl',
		templateUrl: 'signup/signup.html'
	});
})
.controller( 'SignupCtrl', function SignupController( $scope, $http, store, $state, RestService) {

	$scope.user = {};

	$scope.createUser = function() {
		$http({
			url: RestService.getUrl() + '/users',
			method: 'POST',
			data: $scope.user
		}).then(function(response) {
			store.set('jwt', response.data.id_token);
			$state.go('home');
		}, function(error) {
			alert(error.data);
		});
	}

});
