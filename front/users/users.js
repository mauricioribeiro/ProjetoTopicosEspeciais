angular.module( 'sample.users', [
	'sample.services',
	'ui.router',
	'angular-storage',
	'angular-jwt'
	])
.config(function($stateProvider) {
	$stateProvider.state('users', {
		url: '/usuarios',
		controller: 'UserCtrl',
		templateUrl: 'users/users.html',
		data: {
			requiresLogin: true
		}
	});
})
.controller( 'UserCtrl', function UserController( $scope, $http, $state, store, jwtHelper, RestService) {

	$scope.jwt = store.get('jwt');
	$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
	$scope.users = [];

	$scope.goToHome = function(){
		$state.go('home');
	};

	$scope.goToLogin = function(){
		$state.go('login');
	}

	$scope.getUsers = function() {
		$scope.loading = true;

		$http({
			url: RestService.getUrl() + '/users',
			method: 'GET'
		}).then(function(response) {
			$scope.users = response.data;
			$scope.loading = false;
		}, function(response) {
			if(response.status === 401){
				$state.go('home', {denied: true});
			} else {
				alert('API indisponível. Tente mais tarde');
				$scope.loading = false;
			}
		});
	}

	$scope.getUsers();

});
