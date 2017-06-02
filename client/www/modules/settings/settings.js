angular.module('llabsApp.sett', [])

.controller('SettingsController', function($scope, $http){

	$scope.user = {};
	$scope.users = [];


	$http.get('/settings')
	  	.then(function(res){
	  		$scope.users = res.data;
	  		console.log($scope.users);
	  	});
  	
  	  $scope.save = function()
	  	{
		  	$scope.users.push($scope.user);

		  	$http.post('/session/avas', $scope.user)
		  	.then(function(res){
		  		$scope.uses = res.data;
		  		console.log($scope.uses);
		  	});

		  	$scope.user = {};
	  }

	  $scope.del = function(id)
	  	{
		  	$scope.id = id;
		  	console.log($scope.id);
		  	$http.delete('/settings/' + $scope.id);

		  	$http.get('/settings')
		  	.then(function(res){
		  		$scope.users = res.data;
		  	});

	  }
})