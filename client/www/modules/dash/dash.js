angular.module('llabsApp.dash',
	           [
	            'ui.bootstrap',
	            'llabsApp.main',
	           	'llabsApp.biz',
	           	'llabsApp.objs',
	           	'llabsApp.org',
	           	'llabsApp.inno',
	           	'llabsApp.manu',
	           	'llabsApp.mkt',
	           	'llabsApp.fin',
	           	'llabsApp.orgs',
	           	'llabsApp.ppl',
	           	'llabsApp.mkt',
	           	'llabsApp.tasks',
	           	'llabsApp.rpt',
	           	'llabs.sing_fin',
	           	'llabsApp.proc',
	           	'llabsApp.poly',
	           	'llabsApp.single_wide',
	           	'llabsApp.progress',
	           	'llabsApp.sett',
	           	'llabsApp.metrics',
	           	'llabsApp.t_metrics',
	           	'llabsApp.screen'

	           ]
	           )

.config(function($stateProvider , $urlRouterProvider , $httpProvider){

	$stateProvider
	.state('dash',
		    {
		     url: '/dash',
		     templateUrl: 'modules/dash/dash.html',
		     controller: 'DashController'
		  })
	.state('dash.main',
		    {
		     url: '/main',
		     templateUrl: 'modules/main/main.html',
		     controller: 'MainController'
		  })
	.state('dash.profile',
		    {
		     url: '/profile',
		     templateUrl: 'modules/biz/biz.html',
		     controller: 'BizController'
		  })
	.state('dash.objs',
		    {
		     url: '/obectives',
		     templateUrl: 'modules/objs/objs.html',
		     controller: 'ObjsController'
		  })
	.state('dash.org',
		    {
		     url: '/positions',
		     templateUrl: 'modules/org/org.html',
		     controller: 'OrgController'
		  })
	.state('dash.inno',
		    {
		     url: '/innovations',
		     templateUrl: 'modules/inno/inno.html',
		     controller: 'InnoController'
		  })
	.state('dash.fin',
		    {
		     url: '/financial',
		     templateUrl: 'modules/targs/fin/fin.html',
		     controller: 'FinController'
		  })
	.state('dash.orgs',
		    {
		     url: '/organisational',
		     templateUrl: 'modules/targs/org/org.html',
		     controller: 'OrgsController'
		  })
	.state('dash.mkt',
		    {
		     url: '/marketing',
		     templateUrl: 'modules/targs/mkt/mkt.html',
		     controller: 'MktController'
		  })
	.state('dash.ppl',
		    {
		     url: '/people',
		     templateUrl: 'modules/targs/ppl/ppl.html',
		     controller: 'PplController'
		  })
	.state('dash.tasks',
		    {
		     url: '/tasks',
		     templateUrl: 'modules/tasks/tasks.html',
		     controller: 'TasksController'
		  })
	.state('dash.rpt',
		    {
		     url: '/rpt',
		     templateUrl: 'modules/rpt/rpt.html',
		     controller: 'RptController'
		  })
	.state('dash.sing_fin',
		    {
		     url: '/single/:id',
		     templateUrl: 'modules/targs/fin/single.html',
		     controller: 'SingFinController'
		  })
	.state('dash.proc',
		    {
		     url: '/procedures',
		     templateUrl: 'modules/proc/proc.html',
		     controller: 'ProController'
		  })
	.state('dash.poly',
		    {
		     url: '/policies',
		     templateUrl: 'modules/poly/poly.html',
		     controller: 'PolyController'
		  })
	.state('dash.single_wide',
		    {
		     url: '/objs/:id',
		     templateUrl: 'modules/objs/single.html',
		     controller: 'SingleWideController'
		  })
	.state('dash.progress',
		    {
		     url: '/progress/:id',
		     templateUrl: 'modules/rpt/progress.html',
		     controller: 'ProgressController'
		  })
	.state('dash.settings',
		    {
		     url: '/settings',
		     templateUrl: 'modules/settings/settings.html',
		     controller: 'SettingsController'
		  })

	.state('dash.metrics',
		    {
		     url: '/metrics',
		     templateUrl: 'modules/metrics/metrics.html',
		     controller: 'MetricsController'
		  })
	.state('dash.tatrics',
		    {
		     url: '/tatrics',
		     templateUrl: 'modules/tasks/t_metrics.html',
		     controller: 'TmetricsController'
		  })
	.state('dash.screen',
		    {
		     url: '/screen/:id',
		     templateUrl: 'modules/objs/screen.html',
		     controller: 'ScreenController'
		  })

	$urlRouterProvider.otherwise('/dash');
 })

.controller('DashController', function($http, $scope , $mdSidenav , $state , auth){

		var tok = auth.getToken();
		if(typeof tok === 'undefined' || tok === 'null')
		{
			$state.go('login');	
		}
		else
		{
			$state.go('dash.main');
		}
		


    $scope.user = {};
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	//console.log($scope.currentUser);
	$scope.logOut = auth.logOut;

		$scope.toggleList = function()
		 {
	    $mdSidenav('left').toggle();
	     }

	  $scope.toggleLeft = function() {
	    $mdSidenav('left').toggle();
	  }

  		
  		


});