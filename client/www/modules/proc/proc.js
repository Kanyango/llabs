angular.module('llabsApp.proc', [])

.controller('ProController', 
	function($scope, $http , $stateParams , moment ,$mdDialog , $state , auth){

	$scope.posns = [];
	$scope.procs = [];
	$scope.pro  = {};
	$scope.p     = {};

	$http.get('/procs', {headers: {Authorization: 'Bearer '+auth.getToken()}})
				.then(function(res){
					$scope.infor = res.data;
				});

	$http.get('/org', {headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.posns = res.data;
			console.log($scope.posns);

			for(var t = 0; t < $scope.posns.length; t++)
			{
				$scope.posns[t].procs = [];
				for(var r = 0; r < $scope.infor.length; r++)
					{

						if($scope.infor[r].owner === $scope.posns[t]._id)
						{
						   $scope.posns[t].procs.push($scope.infor[r]);       
						}

					}

			}

			console.log($scope.posns);


		});

    $scope.add = function(id)
    {

    	
    	$scope.p.owner = id;
    	$http.post('/procs', $scope.p ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.rec = res.data;
			console.log($scope.posns);

			for(var t = 0; t < $scope.posns.length; t++)
			{
						if($scope.rec.owner === $scope.posns[t]._id)
						{
						   $scope.posns[t].procs.push($scope.rec);       
						}		

			}
			$scope.p = {};


		});

		
    }

    $scope.addProc = function(id)
    {
    	
    	$scope.pro.id = id;
    	console.log($scope.pro);

    	$http.put('/procs', $scope.pro ,{headers: {Authorization: 'Bearer '+auth.getToken()}});

    	$http.get('/procs', {headers: {Authorization: 'Bearer '+auth.getToken()}})
				.then(function(res){
					$scope.infor = res.data;
					console.log($scope.infor);
			for(var r = 0 ; r < $scope.posns.length; r++)
			{
				for(var y = 0 ; y < $scope.posns[r].procs.length; y++)
				{
					$scope.posns[r].procs[y].procs = [];
					for(var e = 0 ; e < $scope.infor.length; e++)
					{

						if( $scope.infor[e].owner == $scope.posns[r]._id)
						{

							for(var k = 0 ; k < $scope.infor[e].procs.length; k++)
					        {

					        	if($scope.posns[r].procs[y]._id == $scope.infor[e].procs[k].id)
					        	{

					        		$scope.posns[r].procs[y].procs.push($scope.infor[e].procs[k]);
					        		console.log('Hurray');


					        	}
					        }

						}
						
					}	
				}	

			}

				});
				$scope.pro = {};
   
    }


    $scope.del = function(id , name)
    {
    	var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

       	$scope.id = id;
       		$scope.name = name;
       		
    	$scope.rem = {};
    	$scope.rem.id = id;
    	$scope.rem.name = name;
    	$http.put('/procs/rem', $scope.rem ,{headers: {Authorization: 'Bearer '+auth.getToken()}});

    	for(var r = 0 ; r < $scope.posns.length; r++)
			{
				for(var y = 0 ; y < $scope.posns[r].procs.length; y++)
				{
					for(var f = 0 ; f < $scope.posns[r].procs[r].procs.length; f++)
				    {

				    	if(($scope.posns[r].procs[r].procs[f].id == $scope.id) 
				    		&&
				    		 $scope.posns[r].procs[r].procs[f].name == $scope.name)
				    	{
				    		$scope.posns[r].procs[r].procs.pop($scope.posns[r].procs[r].procs[f]);	
				    	}
				    }
							
				}	

			}

		
	  });
    }

    $scope.delProc = function(id)
    {
    	var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

    	$scope.id = id;
    	console.log(id);

    	$http.delete('/procs/' + $scope.id , {headers: {Authorization: 'Bearer '+auth.getToken()}});
			

			console.log($scope.posns);

			for(var t = 0; t < $scope.posns.length; t++)
			{
				for(var r = 0; r < $scope.posns[t].procs.length; r++)
			     { 

			     	if($scope.posns[t].procs[r]._id == $scope.id)
			     	{
			     		$scope.posns[t].procs.pop($scope.posns[t].procs[r]);
			     		console.log('hurray');
			     	}

			     }
			}
		

	  });
    }


});