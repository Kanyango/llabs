angular.module('llabsApp.register', ['llabsApp.dash'])

.controller('RegisterController', function($scope, $http, $state , auth , $mdDialog){

	$scope.user = {};

	$scope.signup = function()
	   {
	   	    $scope.visible = "hide"
			auth.register($scope.user)
			.then(function(res){
				$scope.response = res.data;
				console.log($scope.response.status);
				if($scope.response.status == 400 || $scope.response.status == 500)
				{
					$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        .clickOutsideToClose(true)
				        .title('OOps !!')
				        .textContent($scope.response.message)
				        .ariaLabel('Error')
				        .ok('OK')

				    );
				}
				else
				{
					$state.go('dash');
				}
			});
		};
});