angular.module( 'sample.users', [
	'sample.services',
	'ui.router',
	'angular-storage',
	'angular-jwt'
	])
.config(function($stateProvider) {
	$stateProvider.state('usuarios', {
		url: '/',
		controller: 'UserCtrl',
		templateUrl: 'users/users.html',
		data: {
			requiresLogin: true
		}
	});
})
.controller( 'UserCtrl', function UserController( $scope, $http, store, jwtHelper, RestService) {

	$scope.jwt = store.get('jwt');
	$scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);
	$scope.users = [];
}

});
