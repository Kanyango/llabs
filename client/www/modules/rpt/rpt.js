angular.module('llabsApp.rpt', [])

.controller('RptController', function($scope , $http , auth) {

	$http.get('/report', {headers: {Authorization: 'Bearer '+auth.getToken()}})
	        .then(function(res){
		     $scope.reports = res.data;
		     console.log($scope.reports);
		     });

	$http.get('/target', {headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.actions = res.data;
		//console.log($scope.actions);

		for(var m = 0; m < $scope.actions.length; m++)
		{

			for(var f = 0; f < $scope.reports.length; f++)
		       {

	        if($scope.actions[m]._id == $scope.reports[f].obj)
			     {
			     	$scope.actions[m].progress = $scope.reports[f].progress;
			      }
		      console.log($scope.actions);
		  }
			
		}
		$scope.items = $scope.actions;
		console.log($scope.items);
	});

	
})