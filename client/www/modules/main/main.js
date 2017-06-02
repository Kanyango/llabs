angular.module('llabsApp.main', [])

.controller('MainController', function($scope, $http , auth){

	$scope.targets = [];
	$scope.reports = [];
  $scope.todays = [];
  $scope.tomms = [];
  $scope.pending = [];
  $scope.laters = [];
  $scope.complete = [];

  var today = new Date();
    var day   = today.getDate();
    var month = today.getMonth() + 1;
    var year =  today.getFullYear();

	    $http.get('/target' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
  		.then(function(res){
  			$scope.targets = res.data;
  		});

      $http.get('/strength' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
            $scope.strengths = res.data;
            $scope.slen = $scope.strengths.length;
      });

      $http.get('/weak' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      $scope.weakness = res.data;
      $scope.wlen = $scope.weakness.length;
      });

      $http.get('/opport' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
        $scope.opports = res.data;
        $scope.olen = $scope.opports.length;
      });

       $http.get('/threat' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      $scope.threats = res.data;
      $scope.tlen = $scope.threats.length;
      });

      $http.get('/task' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
        $scope.tasks = res.data;
        console.log($scope.tasks);

        
            
            for(var i = 0; i < $scope.tasks.length; i++)
            {  
              var groups = [];
              var group = {};
              var tdate = $scope.tasks[i].dead.split("-");
               group.year = tdate[0];
               group.day  = tdate[2];
               group.month = tdate[1];
               group.id    = $scope.tasks[i]._id; 
               group.dead = $scope.tasks[i].dead;
               group.acc = $scope.tasks[i].acc;
               group.title = $scope.tasks[i].acc;
               group.action = $scope.tasks[i].action;
               group.done = $scope.tasks[i].done;

               groups.push(group);
                 console.log(groups);
               for(var g = 0; g < groups.length; g++)
               {
                console.log('Day ' + day + ' month ' + month + ' year ' + year );
                if( groups[g].done === 'complete')
                {
                  $scope.complete.push(groups[g])
                }
                if((groups[g].day < day ) && (groups[g].month <= month )
                    && (groups[g].year <= year ) && (groups[g].done == 'empty'))
                {

                  $scope.pending.push(groups[g]);
                  
                }
                if((groups[g].day == day ) && (groups[g].month == month )
                    && (groups[g].year == year ) && (groups[g].done == 'empty'))
                {

                  $scope.todays.push(groups[g]);
                  console.log($scope.todays);
                  console.log((parseInt(day) + 1));
                }

                else if(((groups[g].day > day) && ( groups[g].day == (parseInt(day) + 1)) ) && (groups[g].month == month )
                    && (groups[g].year == year ) && (groups[g].done == 'empty'))
                {

                  $scope.tomms.push(groups[g]);
                  

                }
                else if(((groups[g].day > day) && ( groups[g].day > (day + 1)) ) && (groups[g].month == month )
                         && (groups[g].year == year ) && (groups[g].done == 'empty'))
                {
                  $scope.laters.push(groups[g]);
                }
               }

            }
              

      });

      
    $http.get('/inno' ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
    .then(function(res){
      $scope.inno = res.data;
    });


  		$http.get('/report' , {headers: {Authorization: 'Bearer '+auth.getToken()}})
  		.then(function(res){
  			$scope.reports = res.data;
            console.log($scope.reports);
            $scope.finale  = [];
  	   for(var t = 0; t < $scope.targets.length; t++)
  		{
  			for(var r = 0; r < $scope.reports.length; r++)
  		    {


  		    	if($scope.targets[t]._id == $scope.reports[r].obj)
  		    	{

  		    		if(($scope.reports[r].start_date == $scope.targets[t].start_date)
  		    			&& ($scope.reports[r].end_date == $scope.targets[t].end_date))
  		    		{
  		    			console.log('hurray');
  		    		}
  		    	
  		    	else
  		    	{
  		    		
  		    		if($scope.targets[t]._id == $scope.reports[r].obj)
  		    	   {
  		    	   	     
  		    		 for(var p = 0; p < $scope.targets[t].pery.length; p++)
  		                 { 

  		                if(($scope.reports[r].start_date == $scope.targets[t].pery[p].start_date)
  		    			&& ($scope.reports[r].end_date == $scope.targets[t].pery[p].end_date))
  		                 	{
  		                 		
  		                 		$scope.fin = {};

  		                 		var cul = ( ( 1 + ($scope.reports[r].rate - $scope.targets[t].pery[p].targ)/$scope.targets[t].pery[p].targ) * 100);

  		                 		$scope.fin.value = Math.floor(cul);
  		                 		$scope.fin.kpi   = $scope.targets[t].kpi;
  		                 		$scope.finale.push($scope.fin);
  		                 		console.log($scope.finale);
  		                 	}
  		                 }
                    }
  		    	}

  		       }

  		    }
  			
  		}


  		});
       
       


});