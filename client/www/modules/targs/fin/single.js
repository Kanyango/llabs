angular.module('llabs.sing_fin', [])

.controller('SingFinController', function($scope, $http , $stateParams, $state){

	 $scope.isCollapsed = true;
     $scope.isCollapsed2 = true;
     $scope.item = {};

     var id = $stateParams.id;
     $scope.targ = {};
     $scope.targets = [];

      $http.get('/targets/strategy/' + id)
        .then(function(res){
        	$scope.targets = res.data;
        })

     $http.get('/strategy/single/' + id)
     .then(function(res){
       $scope.strat = res.data;
     });

     $scope.save = function(id)
     {
        $scope.targ.strategy = id;
        $scope.targets.push( $scope.targ);
        $http.post('/target', $scope.targ)
        .then(function(res){
        	$scope.trad = res.data;
        })
        $scope.targ = {};
     }

      $scope.update = function(item)
     {
     	console.log(item);
       	$scope.item = item;
        $http.put('/target', $scope.item)
        .then(function(res){
        	
     		$state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
         
       });
        })

        $scope.isCollapsed2 = true;
     }

     $scope.del = function(id)
     {
     	$scope.id = id;
     	$http.delete('/target/' + $scope.id)
     	.then(function(res){

     		$state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
         
       });

     	})
     	 
     }

});