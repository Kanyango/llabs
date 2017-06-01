angular.module('llabsApp',
	['ui.router',
	 'angularMoment',
	 'ngSanitize',
	 'ngAnimate',
	 'ngAria',
	 'ngMessages',
	 'ui.bootstrap',
	 'ngMaterial',
	 "chart.js",
	 'llabsApp.auth',
	 'llabsApp.register',
	 'llabsApp.Login',
	 'llabsApp.home',
	 'llabsApp.dash'
	 ])
.config(function($stateProvider , $urlRouterProvider , $httpProvider){

	$stateProvider
	.state('login',
		  {
		    url: '/login',
		    templateUrl : 'modules/login/login.html',
		    controller  : 'LoginController',
		    onEnter     : ['$state', 'auth' , function($state , auth){
		      if(auth.isLoggedIn()){
		          $state.go('dash');
		      }
		    }]
		  })
	.state('signup',
		  {
		    url: '/signup',
		    templateUrl : 'modules/register/register.html',
		    controller  : 'RegisterController',
		    onEnter     :  ['$state' , 'auth' , function($state , auth){
		      if(auth.isLoggedIn())
		      {
		        $state.go('dash');
		      }
		    }]
		  })
	
	$urlRouterProvider.otherwise('/login');
});
