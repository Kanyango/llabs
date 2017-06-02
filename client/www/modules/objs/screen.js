angular.module('llabsApp.screen', [])

.controller('ScreenController', 
	function($scope, $http , $stateParams, moment , auth){

		var end = 0;
		var start = 0;
		var id = $stateParams.id;

		$http.get('/objs/' + id ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.wides = res.data;
			var wides = res.data;
		});
		$scope.view = function()
		{

			var d = $scope.end_date;
			var k = d.toISOString();
			var u = k.split("-");
			var end = u[0];
			console.log(end);

			var s = $scope.start_date;
			var p = s.toISOString();
			console.log(p);
			var r = p.split("-");
			console.log(r);
			var start = r[0];
			console.log(start);

            $scope.starter = start;
            $scope.ender = end;
	

		console.log(end);
		console.log(start);
		var id = $stateParams.id;

		$http.get('/objs/' + id ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.wides = res.data;
			var wides = res.data;
			$scope.series = ['Actual' , 'Set'];
			var id = wides._id;
			var wide_end = wides._end_date;

			$http.get('/targets/' + id ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
			.then(function(res){
						var targets = res.data;
						var targs = [];
						var rpts = [];
						$scope.labels = [];
						var serA = [];
						for(var t = 0; t < targets.length; t++)
						{
									for(var a = 0; a < targets[t].pery.length; a++)
									{  
										var targ = {};
										//var u = targets[t].pery[a].start_date.split("-");
										//var r = targets[t].pery[a].end_date.split("-");
										var j = targets[t].pery[a].start_date;
										var h = targets[t].pery[a].end_date;
										if((j == start) && (h == end))
										{

									    targ.id  = targets[t]._id;
										targ.val = targets[t].pery[a].targ;
										serA.push(targets[t].pery[a].targ);
										targs.push(targ);
										}
										else if((targets[t].start_date == start) && 
											(targets[t].end_date == end))
										{
									    targ.id  = targets[t]._id;
										targ.val = targets[t].value;
										serA.push(targets[t].value);
										targs.push(targ);
										}
										
									}

							
							$scope.labels.push(targets[t].kpi);
							console.log(targets[t].kpi);
							console.log(targs);
							
						}

				$http.get('/report/prog/' + id ,
					  {headers: {Authorization: 'Bearer '+auth.getToken()}})
				.then(function(res){
					var reports = res.data;
					var serb = [];
					for(var r = 0; r < reports.length; r++)
					{
					   var rpt = {};
                       //var q = reports[r].start_date.split("-");
                       //var t = reports[r].end_date.split("-");
                       var z = reports[r].start_date;
                       var b = reports[r].end_date;
						if((start == z) && (end == b))
						{
							 rpt.id  = reports[r].obj;
							 rpt.val = reports[r].rate;
							 serb.push(reports[r].rate);
						}
                       
                       rpts.push(rpt);
                       
					}
					console.log(rpts)
					$scope.data = [];
					$scope.data.push(serb);
					$scope.data.push(serA);
					console.log($scope.data);
					var finals = [];
					for(var m = 0; m < targs.length; m++)
					{
						console.log(targs);

							for(var o = 0; o < rpts.length; o++)
							{
										console.log(rpts);
									   if((rpts[o].id == targs[m].id))
									   {
									   	var cumm = ( ( 1 + (rpts[o].val - targs[m].val)/targs[m].val) * 100);
									   	finals.push(cumm);
									   	var sum = 0;
									   	var tot = finals.length;

									   	for(var x = 0; x < finals.length; x++)
									   	{
									   		sum += finals[x];
									   	}
									   	var g = sum/tot;
									   	console.log(g);
									   	console.log(finals);
									   	$scope.progress = Math.floor(g);
										$scope.max = finals.length * 100;
										console.log($scope.max);
								   }
					        }
					  }
				})
			})
        })
	



	var id = $stateParams.id;

	    $http.get('/objs/' + id , 
	    	{headers: {Authorization: 'Bearer '+auth.getToken()}})
		.then(function(res){
			$scope.wides = res.data;
			var wides = res.data;
			console.log(wides);

			var id = wides._id;

			$http.get('/targets/' + id ,
				{headers: {Authorization: 'Bearer '+auth.getToken()}})
			.then(function(res){
				var targets = res.data;
				console.log(targets);
				var rpts = [];
				var sets = [];
				
				for(var t = 0; t < targets.length; t++)
				{	
					var set = {};

					for(var a = 0; a < targets[t].pery.length; a++)
				     {
				     	//var g = targets[t].anns[a].start_date.split("-");
				     	//var k = targets[t].anns[a].end_date.split("-");
				     	var y = targets[t].pery[a].end_date;
				     	var u = targets[t].pery[a].start_date;

				     	if((start == u) && (end == y))
				     	{
				     	   set.val = targets[t].pery[a].targ;	
				     	   set.id = targets[t]._id;
					       set.strat = targets[t].strat;
					       sets.push(set);
				     	}
				     	else if((start == targets[t].start_date) && 
				     		   (end == targets[t].end_date))
				     	{
				     		set.val = targets[t].value;
				     		set.id = targets[t]._id;
					        set.strat = targets[t].strat;
					        sets.push(set);
				     	}
				     	
				     }

					
					
					

					var id = targets[t]._id;
					$http.get('/report/targ/' + id ,
						 {headers: {Authorization: 'Bearer '+auth.getToken()}})
					.then(function(res){
						var reports = res.data;
						console.log(reports);
						var actuals = [];
						for(var r = 0; r < reports.length; r++)
						   {
						   		rpts.push(reports[r]);
						   		console.log(rpts);
						   }
						   for(var c = 0; c < rpts.length; c++)
						   {
						   	     var acts = {};

                                 //var e =  rpts[c].start_date.split("-");
                                 //var o =  rpts[c].end_date.split("-");
                                 var s =  rpts[c].start_date;
                                 var t =  rpts[c].end_date;
								if((start == s) && (end == t))
								{
								 acts.val  = rpts[c].rate;
						   		 acts.id   = rpts[c].obj;
						   		 actuals.push(acts);
								}                                  
						   		 
						   }  
						   console.log(actuals); 
						   console.log(sets);
						   var finale = [];
						   for(var l = 0; l < actuals.length; l++)
						   {

							   for(var s = 0; s < sets.length; s++)
							   {
							   		if(actuals[l].id === sets[s].id)
							   		{
							   			var fin = {};
							   			var cul = ( ( 1 + (actuals[l].val - sets[s].val)/sets[s].val) * 100);
							   			//console.log(cul);
							   			fin.val = cul;
							   			fin.strat = sets[s].strat;
							   			finale.push(fin);
							   			//console.log(finale);
							   		}
							   	
							   }
							   
						   }
						   console.log(finale);

						   /*var temp = {};
							var obj = null;
							for(var i=0; i < finale.length; i++) {
							   obj=finale[i];
							  

							   if(!temp[obj.strat]) {
							       temp[obj.strat] = obj;

							   } else {
							       temp[obj.strat].val += obj.val;

							   }
							}
							var result = [];
							for (var strat in temp)
							    result.push(temp[strat]);
							    console.log(result);*/

							
						    var sums = {}, counts = {}, results = [], name;
						    for (var i = 0; i < finale.length; i++) {
						        name = finale[i].strat;
						        if (!(name in sums)) {
						            sums[name] = 0;
						            counts[name] = 0;
						        }
						        sums[name] += finale[i].val;
						        counts[name]++;

						    }

						    for(name in sums) {
						        results.push({ name: name, value: sums[name] / counts[name], counts : counts[name] });
						    }
						    console.log(results);

						    $scope.results = results;

						    

						    	$http.get('/strategies' ,
						    		{headers: {Authorization: 'Bearer '+auth.getToken()}})
						    	.then(function(res){
						    		var strats =res.data;
						    		console.log(strats);
							   for(var r = 0; r < results.length; r++)
							    {
						    		for(var t =0 ; t < strats.length; t++)
						    		{
						    			if(strats[t]._id === results[r].name)
						    			{
						    				strats[t].progress = results[r].value;
						    				strats[t].max      = results[r].counts * 100;
						    			}

						    		}
						      }
						      console.log(strats);
						      $scope.strats = strats;
						    	})
						 
					})
				}
			})
		})
 }

})