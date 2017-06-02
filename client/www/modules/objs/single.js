angular.module('llabsApp.single_wide', [])

.controller('SingleWideController', function($scope, $http ,
                        $stateParams , moment ,$mdDialog , $state , auth){

	var id = $stateParams.id;
	$scope.s = {};
	$scope.strats   = [];

	$scope.targets  = [];
	$scope.targ     = {};
	$scope.pery     = {};

	$scope.isCollapsed  = true;
	$scope.isCollapsed2 = true;
	$scope.isCollapsed3 = true;

	$scope.id = id;
	console.log(id);
    
    $http.get('/org' ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.posns = res.data;
			console.log($scope.posns);
		});
		
    $http.get('/target', {headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.targets = res.data;
	});

	$http.get('/strategy', {headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.strategies = res.data;
      
       for(var i = 0; i < $scope.strategies.length; i++)
	       {

	       	  if((typeof $scope.strategies[i].wide !== null) &&(typeof $scope.strategies[i].wide !== 'undefined'))
	       	  {
	       	  	 $scope.strats.push($scope.strategies[i]);
	       	  }

	       	    for(var s = 0; s < $scope.strats.length; s++)
			      {
			      	$scope.strats[s].targets= [];
			       	  for(var t = 0; t < $scope.targets.length; t++)
				      {
				      	  if($scope.targets[t].strat == $scope.strats[s]._id)
				      	  	 {
				      	  	 	$scope.strats[s].targets.push($scope.targets[t]);
				      	  	 }
			          }
		         }
	       }
	       console.log($scope.strats);

		});

	$http.get('/objs/' + $scope.id ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.obj = res.data;
		$scope.obj.strats = [];
		for(var x = 0; x < $scope.strats.length; x++)
		{	
			if($scope.strats[x].wide == $scope.obj._id)
			{
				$scope.obj.strats.push($scope.strats[x]);
			}
		}
		console.log($scope.obj);
	});



	$scope.addStrat = function(id)
	{
	
		$scope.s.wide = id;
		$http.post('/strategy', $scope.s ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.resp = res.data;

			if($scope.resp.wide == $scope.obj._id)
				{
					$scope.obj.strats.push($scope.resp);
				}

		})
	}

	$scope.save = function(strat, wide , obj)
	{

		$scope.targ.strat = strat;
		$scope.targ.start_date = obj.start_date;
		$scope.targ.end_date = obj.end_date;
		$scope.targ.wide  = wide;



		$http.post('/target', $scope.targ ,
			{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.targs = res.data;

			console.log($scope.obj);
			console.log($scope.targs);

			
		   for(var t = 0; t < $scope.obj.strats.length; t++)
			   {
			         	if($scope.targs.strat == $scope.obj.strats[t]._id)
			         	{
			         		$scope.obj.strats[t].targets.push($scope.targs);	
			         	}
			         
			   }

		 $scope.targ = {};	 

		})
		


	}

	$scope.update = function(item , obj , pers)
	{
	  $scope.item = {};
	  //$scope.item.pery = [];
	  $scope.item = item;
	  $scope.item.pery.push(pers);
	  $scope.item.start_date = obj.start_date;
	  $scope.item.end_date   = obj.end_date;

      console.log($scope.item);

      $http.put('/target', $scope.item ,
      	{headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      	$scope.tars = res.data
      });
      $scope.isCollapsed = false;
	}

	$scope.del = function(id)
	{

	   var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete this target?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

        $scope.id = id;
		$http.delete('/target/' + $scope.id ,
			{headers: {Authorization: 'Bearer '+auth.getToken()}});

		for(var t = 0; t < $scope.obj.strats.length; t++)
			  {
			   	for(var u = 0; u < $scope.obj.strats[t].targets.length; u++)
			    {
			         	if($scope.id == $scope.obj.strats[t].targets[u]._id)
			         	{
			         		$scope.obj.strats[t].targets.pop($scope.obj.strats[t].targets[u]);	
			         	}
			        }
			         
			   }

		

		 });
	}

	$scope.upery = function(id, pery)
	{
	    var fomatted_date2 = moment(pery.end_date).format('YYYY-MM-DD');
        var e = fomatted_date2.split("-");

        var fomatted_date = moment(pery.start_date).format('YYYY-MM-DD');
        var s = fomatted_date.split("-");

        $scope.pery.id = id;
        $scope.pery.start_date = s[0];
        $scope.pery.end_date   = e[0];
        console.log( $scope.pery);
		$http.put('/target/pery',  $scope.pery ,
			{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			

			$http.get('/target',
			{headers: {Authorization: 'Bearer '+auth.getToken()}})
		    .then(function(res){
			$scope.resp = res.data;

			console.log($scope.resp)

			for(var r = 0; r < $scope.obj.strats.length; r++)
				{
					for(var s = 0; s < $scope.obj.strats[r].targets.length; s++)
				     { 
				     	$scope.obj.strats[r].targets[s].pery = [];
				     	for(var m = 0; m < $scope.resp.length; m++)
				        {
				        	if(typeof $scope.resp[m].pery === 'undefined')
				        	{
				        		console.log('error')
				        	}
				        	else
					     	{for(var p = 0; p < $scope.resp[m].pery.length; p++)
					     						        { 
					     	
					     					        	if($scope.resp[m].pery[p].id == $scope.obj.strats[r].targets[s]._id)
					     					        	{
					     					        		$scope.obj.strats[r].targets[s].pery.push($scope.resp[m].pery[p]);
					     					        		console.log("Hurray");	
					     					        	}
					     	
					     					        }}
				        	
				        }	
				     }
					
				}
 		        console.log($scope.obj);	
			 });
         	
		})

	       

	}

	$scope.delPer = function(d , a, b, c)
	{
	  
	  var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

		$scope.dels = {};
		$scope.dels.id = d;
		$scope.dels.targ = a;
		$scope.dels.start_date = b;
		$scope.dels.end_date   = c;
		console.log($scope.dels);

		$http.put('/target/pery/del' , $scope.dels ,
			{headers: {Authorization: 'Bearer '+auth.getToken()}});

		for(var r = 0; r < $scope.obj.strats.length; r++)
				{
					for(var s = 0; s < $scope.obj.strats[r].targets.length; s++)
				     { 
				     	for(var m = 0; m < $scope.obj.strats[r].targets[s].pery.length; m++)
				        { 
				        	if(($scope.obj.strats[r].targets[s].pery[m].start_date == b) && 
				        		($scope.obj.strats[r].targets[s].pery[m].end_date == c)
				        		&& ($scope.obj.strats[r].targets[s].pery[m].targ == a ))
				        	{
				        		$scope.obj.strats[r].targets[s].pery.pop($scope.obj.strats[r].targets[s].pery[m]);
				        		
				        	}
				        }	
				     }
					
				}
		

		 });
	}


	$scope.delStrat = function(id)
	{
	  
      var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

        $scope.id = id;
        console.log($scope.id);

		$http.delete('/strategy/'  + $scope.id ,
			{headers: {Authorization: 'Bearer '+auth.getToken()}});

			for(var r = 0; r < $scope.obj.strats.length; r++)
				{
					if($scope.id == $scope.obj.strats[r]._id)
					{
						$scope.obj.strats.pop($scope.obj.strats[r]);						
					}
				}

		 });
	}


	$scope.editStrat = function(strat)
	{
		$scope.strat = {};
		$scope.strat = strat;
		$http.put('/strategy', $scope.strat ,
			 {headers: {Authorization: 'Bearer '+auth.getToken()}});

		$state.transitionTo($state.current, $stateParams, {
	         reload: true,
	         inherit: false,
	        notify: true
	         
	       });
	}



});