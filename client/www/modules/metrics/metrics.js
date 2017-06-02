angular.module('llabsApp.metrics', [])

.controller('MetricsController', function($scope, $http , moment , auth){

	$scope.view = function()
	  {

	  	$scope.performance = [];

	  	var fomatted_date  = moment($scope.start_date).format('YYYY-MM-DD');
        var s = fomatted_date.split("-");
        var start_date = s[0];

        var fomatted_date2 = moment($scope.end_date).format('YYYY-MM-DD');
        var e = fomatted_date2.split("-");
        var end_date = e[0];

	$http.get('/target' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
	.then(function(res){
		$scope.targets = res.data;

		//	console.log($scope.targets);
		
			for(var t = 0 ;  t < $scope.targets.length; t++)
			{
				 var id = $scope.targets[t]._id;
				 var acts = [];
				 

				 $http.get('/report/targ/' + id , {headers: {Authorization: 'Bearer '+auth.getToken()}})
				  .then(function(res){
					$scope.reports = res.data;
					 /*var last = $scope.reports[$scope.reports.length - 1];
					 acts.push(last);
					 console.log(acts);*/

					 for(var u = 0; u < $scope.reports.length; u++)
						 {
						 	if(($scope.reports[u].start_date == start_date)
						 		 && ($scope.reports[u].end_date == end_date))
						 	{
						 		var act = {};
						 		act.start_date = $scope.reports[u].start_date;
						 		act.id         = $scope.reports[u].obj;
						 		act.end_date   =  $scope.reports[u].end_date;
						 		act.value      = $scope.reports[u].rate;

						 		acts.push(act);
					            //console.log(acts);
						 	}

						 }
						 var sets = [];
					  for(var g = 0; g < $scope.targets.length; g++)
						 {
						 	
						 	for(var p = 0; p < $scope.targets[g].pery.length; p++)
						    {
						 	if(($scope.targets[g].pery[p].start_date == start_date)
						 		 && ($scope.targets[g].pery[p].end_date == end_date))
						 	{
						 		var set = {};

						 		set.id = $scope.targets[g]._id;
						 		set.start_date = $scope.targets[g].pery[p].start_date;
						 		set.end_date =  $scope.targets[g].pery[p].end_date;
						 		set.value   =  $scope.targets[g].pery[p].targ;
						 		set.kpi   =  $scope.targets[g].kpi;
						 		set.owner   =  $scope.targets[g].owner;
						 		sets.push(set);
					            console.log(sets);
						 	}
						 }

					}
					console.log(sets);
			        console.log(acts);
					var finale =[];
			    for(var n = 0 ;  n < sets.length; n++)
			        { 
			        	
					 for(var a = 0; a < acts.length; a++)
					 {
					 	if(acts[a].id == sets[n].id)
					 	{
					 		    var fin = {};    
					 			var cumm = ( ( 1 + (acts[a].value - sets[n].value)/sets[n].value) * 100);
					 			fin.val = Math.floor(cumm);
					 			fin.kpi = sets[n].kpi;
					 			fin.owner = sets[n].owner;

					 			finale.push(fin);
					 			console.log(finale);
						 	}
						 	console.log(finale);
						 }
						 $scope.performance =  finale;
						}


					})

				}			
			
		})

	}

});