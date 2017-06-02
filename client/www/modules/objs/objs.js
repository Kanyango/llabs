angular.module('llabsApp.objs', [])

.controller('ObjsController', 
  function($scope, $http , moment , $state , $stateParams , $mdDialog , auth){

    $scope.isCollapsed = true;

	  $scope.obs = [];
    $scope.o = {};
    $scope.strong = [];

    $http.get('/objs' ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
    .then(function(res){
    	$scope.obs = res.data;
      console.log($scope.obs);
    });

	  $scope.add = function()
	  {
        var fomatted_date  = moment($scope.o.start_date).format('YYYY-MM-DD');
        var s = fomatted_date.split("-");
        var start_date = s[0];

        var fomatted_date2 = moment($scope.o.end_date).format('YYYY-MM-DD');
        var e = fomatted_date2.split("-");
        var end_date = e[0];

	
        $scope.o.start_date = start_date;
        $scope.o.end_date   = end_date;

        console.log($scope.o);
        
	    $http.post('/objs', $scope.o ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
	    .then(function(res){
	      $scope.strong = res.data;

              $scope.obs.push( $scope.strong);
          
	    });
        
         $scope.o = {};

       

	  }

	  $scope.del = function(id)
      {
         $scope.id = id;
         console.log($scope.id);
         var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

        var id = $scope.id;
        console.log(id);

         $http.delete('/objs/' + $scope.id , {headers: {Authorization: 'Bearer '+auth.getToken()}});



         $http.get('/objs' ,{headers: {Authorization: 'Bearer '+auth.getToken()}})
         .then(function(res){
         $scope.obs = res.data;
          });
       }, function() {
      $scope.status = 'Wise Choice.';
      });
    }

});