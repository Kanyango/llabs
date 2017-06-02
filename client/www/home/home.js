angular.module('llabsApp.home', ['llabsApp.dash'])

.controller('HomeController', function($scope, $http){

	

	$scope.now = new Date();

});