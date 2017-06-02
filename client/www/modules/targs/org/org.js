angular.module('llabsApp.orgs', [])

.controller('OrgsController',
	function($scope , $http, $stateParams , moment ,$mdDialog , $state ,auth) {

	$scope.o = {};
	$scope.R = {};
	$scope.r = {};
	$scope.K = {};
    
    $scope.isCollapsed = true;
    $scope.isCollapsed1 = true;

	$scope.kpiss = [];
	$scope.resps = [];
	$scope.data = {};


	$http.get('/org', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.posns = res.data;
			console.log($scope.posns);
		});

	$http.get('/target', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.targets = res.data;
			console.log($scope.targets);
			for(var m = 0; m <$scope.targets.length; m++)
				{
					for(var p = 0; p <$scope.posns.length; p++)
				     {
				     	if (typeof $scope.posns === 'undefined')
					     	{
					     		$scope.posns[p].kpis = [];
					     	}
                        

                        var kpis = {};
                         if($scope.posns[p].posn == $scope.targets[m].owner)
                         {
                            kpis.kpis = $scope.targets[m].kpi;
                         	$scope.posns[p].kpis.push(kpis);	
                         }  
				      
				     } 

				}
				console.log($scope.posns);
		});

	$scope.resp = function()
	{
		$scope.data.resp = [];
		$scope.resps.push($scope.R);
        $scope.data.resp.push($scope.R);
        $scope.R ={};
	}

	$scope.kpis = function()
	{
		$scope.data.kpis = [];
		$scope.kpiss.push($scope.K);
		$scope.data.kpis.push($scope.K);
		$scope.K ={};

	}

	$scope.save = function()
	{
		$scope.data.posn = $scope.posn;
		console.log($scope.data);
		

		$http.post('/org', $scope.data , {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.psns = res.data;
			console.log($scope.psns);
		});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });
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
		$http.delete('/org/' + $scope.id, {headers: {Authorization: 'Bearer '+auth.getToken()}});
		$http.get('/org', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.posns = res.data;
			console.log($scope.posns);
		});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });

		 });
	}

	$scope.rem = function(id , resp)
	{
		var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

		$scope.dely = {};
		console.log(resp);

		$scope.dely.id = id;
		$scope.dely.resp = resp;
		console.log($scope.dely);
		$http.put('/org/rem/' ,  $scope.dely ,{headers: {Authorization: 'Bearer '+auth.getToken()}});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });

		 });
	}
	$scope.remk = function(id , kpis)
	{
		var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

		$scope.dely = {};
		console.log(kpis);

		$scope.dely.id = id;
		$scope.dely.kpis = kpis;
		console.log($scope.dely);
		$http.put('/org/remk/' ,  $scope.dely ,{headers: {Authorization: 'Bearer '+auth.getToken()}});
		
		
		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });

		 });
	}

	$scope.newR = function(id , r)
	{
		$scope.newResp = {};

		$scope.newResp.r = r;
		$scope.newResp.id = id;

		console.log($scope.newResp);

		for(var s = 0; s < $scope.posns.length; s++)
			{
				if(typeof $scope.posns === 'undefined')
				{
					$scope.posns[s].resp = [];
				}
				
				if($scope.posns[s]._id == $scope.newResp.id)
				{
					$scope.posns[s].resp.push($scope.r);
				}



			}

	$http.put('/org/resp', $scope.newResp , {headers: {Authorization: 'Bearer '+auth.getToken()}});
	$scope.r = {};
	$scope.newResp = {}; 


		

	}

	$scope.newK = function(id , K)
	{
		$scope.newKpi = {};

		$scope.newKpi.k = K;
		$scope.newKpi.id = id;

		console.log($scope.newKpi);

		for(var s = 0; s < $scope.posns.length; s++)
			{
				if(typeof $scope.posns === 'undefined')
				{
					$scope.posns[s].kpis = [];
				}
				
				if($scope.posns[s]._id == $scope.newKpi.id)
				{
					$scope.posns[s].kpis.push($scope.K);
				}



			}

	     $http.put('/org/kpis', $scope.newKpi ,{headers: {Authorization: 'Bearer '+auth.getToken()}});
	     $scope.K = {};
	      $scope.newKpi = {}; 
	}

	$scope.update = function(item)
	{
		$scope.item = item;

		console.log(item);

		$http.put('/org', $scope.item ,{headers: {Authorization: 'Bearer '+auth.getToken()}});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });
	}



})