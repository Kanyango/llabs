angular.module('llabsApp.fin', [])

.controller('FinController', function($scope , $http) {

  $scope.f = {}
  $scope.finance = [];

  $http.get('/strategy')
    .then(function(res){
      $scope.finance = res.data;
    });

   $scope.add = function()
	  {
	    $scope.f.cat = 'finance';
	    $scope.finance.push($scope.f);
	    console.log($scope.finance);
	    

	    $http.post('/strategy', $scope.f)
	    .then(function(res){
	      $scope.strong = res.data;
	      console.log($scope.strong);
	    });
	    $scope.f = {};
	    $http.get('/strategy')
	    .then(function(res){
	      $scope.finance = res.data;
	    });
	  }   
	
});