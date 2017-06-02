angular.module('llabsApp.tasks', [])

.controller('TasksController', function($scope , $mdSidenav , $http , moment ,
        $stateParams , $mdDialog , $state , auth) {

	$scope.tasks = [];
	$scope.task  = {};
	$scope.todays = [];
	$scope.tomms = [];
	$scope.pending = [];
	$scope.laters = [];
	$scope.complete = [];
	$scope.isCollapsed  = true;
	$scope.isCollapsed1 = true;

	$scope.task.done  = 'empty';
	var today = new Date();
    var day   = today.getDate();
    var month = today.getMonth() + 1;
    var year =  today.getFullYear();

    //console.log('Day ' + day + ' month ' + month + ' year ' + year );

	    $http.get('/task', {headers: {Authorization: 'Bearer '+auth.getToken()}})
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


		$scope.toggleList = function()
		 {
	    $mdSidenav('right').toggle();
	     }

	  $scope.toggleLeft = function()
	   {
	    $mdSidenav('right').toggle();
	  }

    $scope.save = function()
    {
    	console.log($scope.task);

    	var fomatted_date = moment($scope.task.dead).format('YYYY-MM-DD');
        var fomatted_date2 = moment($scope.task.start_date).format('YYYY-MM-DD'); 

    	console.log(fomatted_date);
        
    	$scope.task.dead = fomatted_date;
        $scope.task.start_date = fomatted_date2;

    	$scope.tasks.push($scope.task);
    	$http.post('/task' , $scope.task , {headers: {Authorization: 'Bearer '+auth.getToken()}})
    	.then(function(res){
    		$scope.tasky = res.data;
    	});
    	$scope.task = {};
    }

    $scope.del = function (id) {

       var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {
     
      $http.delete('/task/' + id , {headers: {Authorization: 'Bearer '+auth.getToken()}});

      $state.transitionTo($state.current, $stateParams, {
             reload: true,
             inherit: false,
            notify: true
             
           });
      });
     
    };

    $scope.done = function (id)
    {

      var confirm = $mdDialog.confirm()
      .title('Mark task as complete ?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {
     
      $scope.data = {};
   	  $scope.data.done = 'complete';
      var day = new Date();
      var comp_date = moment(day).format('YYYY-MM-DD');
      $scope.data.comp_date = comp_date;
   	  $scope.data.id = id;
      $http.put('/task/done/', $scope.data ,{headers: {Authorization: 'Bearer '+auth.getToken()}});


      $state.transitionTo($state.current, $stateParams, {
             reload: true,
             inherit: false,
            notify: true
             
           });
      });
     
    };


	
})