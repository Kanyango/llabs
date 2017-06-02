angular.module('llabsApp.auth',[])

.factory('auth', ['$http','$window','$location', function($http , $window , $location){

 		//var base = "http://localhost:8100";

	function redirect(url)
	{
		url = url || '/';
		$location.path(url);
	}
	
	var auth = {};
    
    var deferredCurrentUser;

	auth.saveToken = function(token)
	{
		$window.localStorage['llabs-app-token'] = token;
	};
	auth.getToken = function()
	{
		return $window.localStorage['llabs-app-token'];
	};

	auth.isLoggedIn = function()
	{
		var token = auth.getToken();

		if(token)
		{
			var payload = JSON.parse($window.atob(token.split('.')[1]));
		    return payload.exp > Date.now() / 1000;

		}
		else{

			return false;
		}
	};

	auth.currentUser = function()
	{

		if(auth.isLoggedIn()){
		var token = auth.getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.username;
      }
	};

	auth.register = function(user)
	{
		return $http.post('/session/create', user)
		.then(function(res){
			auth.saveToken(res.data.token);
			return res;
		    },
		    function(res){

		    	return res;
		    });
	};
	auth.login = function(user)
	{
		return $http.post('/login', user).then(function(res){
			auth.saveToken(res.data.token)
		},
		function(res){

			return res;
		});
	};

	auth.logOut = function(redirectTo)
	{
		//return $http.post('/logout').success(function(){
			$window.localStorage.removeItem('llabs-app-token');
			redirect(redirectTo);
		//});
	};

	return auth;
}]);