angular.module('llabsApp.org', [])

.controller('OrgController', function($scope){

	$scope.posns = 
	     [  {
	     	 pos : 'C.O.O' ,
	         res : [{name : 'Reporting to shareholders'}] ,
	         kpi : [{name : 'No of reports to Shareholders'}]
	         },
	         {
	     	 pos : 'Vice President' ,
	         res : [{name : 'finding new customers'}] ,
	         kpi : [{name : 'No of customers created' , set: '50' , act: '30'  , period_start : '2014' , period_end: '2015' }]
	         } 
	     ]
  $scope.labels = ["finding new customers"];
  $scope.series = ["Actual", "Set"];
  $scope.data = [
    [30],
    [50]
  ];


})