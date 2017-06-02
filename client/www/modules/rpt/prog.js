angular.module('llabsApp.progress', [])

.controller('ProgressController', 
	   function($scope, $http, auth , $stateParams, $state , moment){

	$scope.resp = {};

	var id = $stateParams.id;
	$scope.prog = {};
	$scope.id = id;

	$http.get('/target/' + $scope.id , {headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.resp = res.data;
		console.log($scope.resp);
	});

	$http.get('/report/targ/' + $scope.id , {headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.rpts = res.data;
		$scope.prog = $scope.rpts[$scope.rpts.length - 1];
		console.log($scope.prog);
	}); 

	$scope.save = function(strategy, wide)
	{	
		var start = moment($scope.prog.start_date).format('YYYY-MM-DD');
		var st    = start.split("-");
		var s     = st[0];

		var end = moment($scope.prog.end_date).format('YYYY-MM-DD');
		var en  = end.split("-");
		var e   = en[0];


		$scope.prog.obj = id;
		$scope.prog.start_date = s;
		$scope.prog.end_date   = e;
		$scope.prog.strategy   = strategy;
		$scope.prog.wide       = wide;

		console.log($scope.prog);
		$http.post('/report', $scope.prog ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.sponse = res.data;
			console.log($scope.sponse);
		});

		$state.go('dash.rpt');
	}

	

});