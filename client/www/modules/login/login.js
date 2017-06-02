angular.module('llabsApp.Login', ['llabsApp.dash'])

.controller('LoginController', function($scope, $http, auth, $state, $mdDialog){


	    $scope.user = {};
		
		$scope.login = function()
		{
			auth.login($scope.user)
			.then(function(res){
				console.log(res);
				$scope.response = res;
				if($scope.response.status == 401 || $scope.response.status == 500)
				{
					$mdDialog.show(
				      $mdDialog.alert()
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
		}

});