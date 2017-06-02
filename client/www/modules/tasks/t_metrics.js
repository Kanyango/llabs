angular.module('llabsApp.t_metrics', [])

.controller('TmetricsController', function($scope, $http , moment , auth){

	$scope.turn = 0;
	$scope.turn2 = 0;

	 $http.get('/org' ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.posns = res.data;
			console.log($scope.posns);
		});

  $scope.view = function()
   {
   	
	var a = moment($scope.start_date).format('YYYY-MM-DD');
	var a1 = a.split("-");
	var a2 = a1[0];
	var a3 = a1[1];
	var a4 = a1[2];

	var b = moment($scope.end_date).format('YYYY-MM-DD');
	var b1 = b.split("-");
	var b2 = b1[0];
	var b3 = b1[1];
	var b4 = b1[2];

	        $http.get('/task', {headers: {Authorization: 'Bearer '+auth.getToken()}})
    	   .then(function(res){
    		$scope.tasks = res.data;
    		console.log($scope.tasks);

    		var tasks = [];
    		var task = {};
    		for(var t = 0; t < $scope.tasks.length; t++)
	    		{
	    			

	    			var j = $scope.tasks[t].start_date.split("-");
	    			task.yr  = j[0];
	    			task.mm  = j[1];
	    			task.day = j[2];

	    			var k = $scope.tasks[t].dead.split("-");
	    			task.dyr  = k[0];
	    			task.dmm  = k[1];
	    			task.dday = k[2];
	    			task.done = $scope.tasks[t].done; 
	    			task.acc = $scope.tasks[t].acc;
	    			task.action = $scope.tasks[t].action;

	    			tasks.push(task);
	    			console.log(tasks);

	    			for(var h = 0; h < tasks.length; h++)
		    			{
		    				var tots = [];
		    				var comps = [];
		    				if((tasks[h].yr == a2) && (tasks[h].mm == a3)
		    					&& (tasks[h].day >= a4) && (tasks[h].dyr == b2)
		    					&& (tasks[h].dmm == b3) && (tasks[h].dday <= b4))
		    				{
		    					 
                                  	tots.push(tasks[h]);
                                  	console.log(tots.length);

                                  	for(var b = 0; b < tots.length; b++)
                                  	{
                                  		if(tots[b].done == 'complete')
                                  		{
                                  			comps.push(tots[b]);
                                  			console.log(comps.length);
                                  			var cumm = ( ( 1 + (comps.length - tots.length)/tots.length) * 100);
                                  			console.log(cumm);

                                  			$scope.turn = cumm;
                                  		}
                                  	}



		    				}
		    			}


	    		}
    	});

    }

   $scope.view2 = function()
   {
   	
   	console.log($scope.position);
   	
	var a = moment($scope.start_date2).format('YYYY-MM-DD');
	var a1 = a.split("-");
	var a2 = a1[0];
	var a3 = a1[1];
	var a4 = a1[2];

	var b = moment($scope.end_date2).format('YYYY-MM-DD');
	var b1 = b.split("-");
	var b2 = b1[0];
	var b3 = b1[1];
	var b4 = b1[2];

	        $http.get('/task', {headers: {Authorization: 'Bearer '+auth.getToken()}})
    	   .then(function(res){
    		$scope.tasks = res.data;
    		console.log($scope.tasks);

    		var tasks = [];
    		var task = {};
    		for(var t = 0; t < $scope.tasks.length; t++)
	    		{
	    			

	    			var j = $scope.tasks[t].start_date.split("-");
	    			task.yr  = j[0];
	    			task.mm  = j[1];
	    			task.day = j[2];

	    			var k = $scope.tasks[t].dead.split("-");
	    			task.dyr  = k[0];
	    			task.dmm  = k[1];
	    			task.dday = k[2];
	    			task.done = $scope.tasks[t].done; 
	    			task.acc = $scope.tasks[t].acc;
	    			task.action = $scope.tasks[t].action;

	    			tasks.push(task);
	    			console.log(tasks);

	    			for(var h = 0; h < tasks.length; h++)
		    			{
		    				var tots = [];
		    				var comps = [];
		    				if((tasks[h].yr == a2) && (tasks[h].mm == a3)
		    					&& (tasks[h].day >= a4) && (tasks[h].dyr == b2)
		    					&& (tasks[h].dmm == b3) && (tasks[h].dday <= b4)
		    					&& (tasks[h].acc == $scope.position))
		    				{
		    					 
                                  	tots.push(tasks[h]);
                                  	console.log(tots.length);

                                  	for(var b = 0; b < tots.length; b++)
                                  	{
                                  		if(tots[b].done == 'complete')
                                  		{
                                  			comps.push(tots[b]);
                                  			console.log(comps.length);
                                  			var cumm2 = ( ( 1 + (comps.length - tots.length)/tots.length) * 100);
                                  			console.log(cumm2);

                                  			$scope.turn2 = cumm2;
                                  		}
                                  	}



		    				}
		    			}


	    		}
    	});

    }


})