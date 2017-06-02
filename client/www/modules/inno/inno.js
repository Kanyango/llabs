angular.module('llabsApp.inno', [])

.controller('InnoController', 
	function($scope , $http , $stateParams , moment ,$mdDialog , $state , auth) {

	$scope.targ = {};
	$scope.e = {};
	$scope.inno = [];

	$scope.isCollapsed = true;
	$scope.isCollapsed2 = true;
	$scope.isCollapsed3 = true;

	   $http.get('/procs', {headers: {Authorization: 'Bearer '+auth.getToken()}})
	   .then(function(res){
	   	$scope.procs = res.data;
	   });

	   $http.get('/poly', {headers: {Authorization: 'Bearer '+auth.getToken()}})
	   .then(function(res){
	   	$scope.policies = res.data;
	   });

	   $http.get('/org', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.posns = res.data;
			console.log($scope.posns);
		});


		$http.get('/inno',{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.inno = res.data;
			for(var m = 0; m < $scope.inno.length; m++)
			{
				$scope.value = ((1 + ($scope.inno[m].evaluate - $scope.inno[m].target)/$scope.inno[m].target) * 100 ); 
				$scope.inno[m].status = Math.floor($scope.value);
			}
		});

	$scope.save = function()
	{
		$scope.inno.push($scope.targ);

		$http.post('/inno', $scope.targ , 
			{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.resp = res.data;
		});
		$scope.targ = {};
	}

	$scope.eval = function(id)
	{
		$scope.e.id = id;
		$http.put('/inno/eval', $scope.e ,
			 {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.inns = res.data;
		});
		$scope.targ = e;

	}

	$scope.del = function(id)
	{
		var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

		$scope.id = id;
		$http.delete('/inno/' + $scope.id ,
			  {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.inno = res.data;
		});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });
	  });
	}
	$scope.update = function(item)
	{

	  
		$scope.item = {};
		$scope.item = item;
		console.log($scope.item);	
		$http.put('/inno' , $scope.item ,
			 {headers: {Authorization: 'Bearer '+auth.getToken()}});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });

	}

	$scope.addProc = function(id, action)
	{
		 $scope.data = {};
         $scope.data.id = id;
         $scope.data.name = action;

         $http.put('/procs', $scope.data , 
         	 {headers: {Authorization: 'Bearer '+auth.getToken()}})
         .then(function(res){
         	$scope.reddy = res.data;
         })
	}

	$scope.addPoly = function(id, action)
	{
		 $scope.pols = {};
         $scope.pols.id = id;
         $scope.pols.name = action;

         $http.put('/poly/pols', $scope.pols , 
         	 {headers: {Authorization: 'Bearer '+auth.getToken()}})
         .then(function(res){
         	$scope.reddy = res.data;
         })
	}

});