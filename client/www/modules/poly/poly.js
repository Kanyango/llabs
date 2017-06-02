angular.module('llabsApp.poly', [])

.controller('PolyController', 
	function($scope , $http ,  $stateParams , moment ,$mdDialog , $state , auth){

	$scope.poly = {};
	$scope.pols = {};
	$scope.pol  = {};

	$http.get('/poly', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.policies = res.data;
			console.log($scope.policies);
		})

     $scope.add = function()
	   {
		$http.post('/poly', $scope.poly ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.res = res.data;

			$scope.policies.push($scope.res);

		})
		
	  }

	  $scope.addItems = function(id, pol)
	   {
	   	    $scope.id = id;
	   		$scope.pol = {};
	   	    $scope.pol.id = id;
	   	    $scope.pol.name = pol.name;
		   	console.log($scope.pol);

			$http.put('/poly/pols', $scope.pol ,
				 {headers: {Authorization: 'Bearer '+auth.getToken()}})
			     .then(function(res){
				 $scope.res = res.data;

		$http.get('/poly', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.polt = res.data;
			
			$scope.policies = [];		
		    $scope.policies = $scope.polt;
				
		   })
		})	
	  }

	  $scope.del = function(id, name)
	   {
	   	    var confirm = $mdDialog.confirm()
           .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

	   		$scope.del = {};
		   	$scope.del.id = id;
		   	$scope.del.name = name;
			$http.put('/poly/rem', $scope.del ,
				 {headers: {Authorization: 'Bearer '+auth.getToken()}})
			.then(function(res){
				$scope.res = res.data;

				for(var y = 0; y < $scope.policies.length; y++)
				{
					if($scope.policies[y].pols === 'undefined')
					{
						console.log('OOps')
					}
					else
					{	
										for(var c = 0; c < $scope.policies[y].pols.length; c++)
										{ 
						              		if($scope.policies[y].pols[c].id == $scope.del.id)
						              		{
						              			$scope.policies[y].pols.pop($scope.policies[y].pols[c]);
						              		}
										}
					}
				}

			});



		});
	  }

	   $scope.delItem = function(id)
	   {

	   	var confirm = $mdDialog.confirm()
           .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

		   	$scope.id = id;
			$http.delete('/poly/' + $scope.id ,
				{headers: {Authorization: 'Bearer '+auth.getToken()}})
			.then(function(res){
				$scope.res = res.data;
				ttp.get('/poly', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.polt = res.data;
			
			$scope.policies = [];		
		    $scope.policies = $scope.polt;
				
		   })
			})

			

		});
	  }
});