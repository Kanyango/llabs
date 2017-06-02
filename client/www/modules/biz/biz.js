angular.module('llabsApp.biz', [])

.controller('BizController', function($scope , $http , auth , $mdDialog) {

      $scope.s = {};
      $scope.story = {};
      $scope.us = {};
      $scope.strengths = [];
      $scope.w = {};
      $scope.weakness = [];
      $scope.o = {};
      $scope.opports = [];
      $scope.t = {};
      $scope.threats = [];
      $scope.biz = {};
      $scope.bizz;



      $scope.isCollapsed  = true;

      $http.get('/strength', {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
            $scope.strengths = res.data;
            console.log($scope.strengths);
      });

      $http.get('/weak', {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      $scope.weakness = res.data;
      console.log($scope.weakness);
      });

      $http.get('/opport', {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      $scope.opports = res.data;
      });

       $http.get('/threat', {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      $scope.threats = res.data;
      });

      $http.get('/story', {headers: {Authorization: 'Bearer '+auth.getToken()}})
      .then(function(res){
      $scope.story = res.data[0];
     
      console.log($scope.story);
      });

     

      $scope.strength = function()
      {
            
            console.log($scope.strengths);
            

            $http.post('/strength', $scope.s ,
                {headers: {Authorization: 'Bearer '+auth.getToken()}})
            .then(function(res){
                  $scope.strong = res.data;
                     $scope.strengths.push($scope.strong);
            });
            $scope.s = {};
      };
      console.log($scope.weakness);

      $scope.weak = function()
      {
            $http.post('/weak', $scope.w ,
               {headers: {Authorization: 'Bearer '+auth.getToken()}})
            .then(function(res){
                  $scope.weaks = res.data;
                  console.log($scope.weaks);
                  $scope.weakness.push($scope.weaks);
            });
            $scope.w = {};
      };

       $scope.opport = function()
      {
            
            

            $http.post('/opport', $scope.o , 
               {headers: {Authorization: 'Bearer '+auth.getToken()}})
            .then(function(res){
                  $scope.ports = res.data;
                  console.log($scope.ports);
                  $scope.opports.push($scope.ports);
            });
            $scope.o = {};
      };

      $scope.threat = function()
      {
            
            $http.post('/threat', $scope.t , 
               {headers: {Authorization: 'Bearer '+auth.getToken()}})
            .then(function(res){
                  $scope.tret = res.data;

                  $scope.threats.push( $scope.tret);
                  
            });
             $scope.t = {};
      }
      $scope.delS = function(id)
      {
         var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

         $scope.id = id;
         console.log($scope.id);
         $http.delete('/strength/' + $scope.id ,
            {headers: {Authorization: 'Bearer '+auth.getToken()}})
         .then(function(res){

            for(var t = 0; t < $scope.strengths.length; t++)
               {
                  if($scope.id == $scope.strengths[t]._id)
                  {
                     $scope.strengths.pop($scope.strengths[t]);
                  }
               }

         })
     });

      }

      $scope.delW = function(id)
      {
         var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

         $scope.id = id;
         console.log($scope.id);
         $http.delete('/weak/' + $scope.id, {headers: {Authorization: 'Bearer '+auth.getToken()}});
         

         for(var t = 0; t < $scope.weakness.length; t++)
               {
                  if($scope.id == $scope.weakness[t]._id)
                  {
                     $scope.weakness.pop($scope.weakness[t]);
                  }
               }
         


     });

      }
      $scope.delO = function(id)
      {
          var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

         $scope.id = id;
         console.log($scope.id);
         $http.delete('/opport/' + $scope.id ,
            {headers: {Authorization: 'Bearer '+auth.getToken()}});
         
         for(var t = 0; t < $scope.opports.length; t++)
               {
                  if($scope.id == $scope.opports[t]._id)
                  {
                     $scope.opports.pop($scope.opports[t]);
                  }
               }

         
     });

      }
      $scope.delT = function(id)
      {
         var confirm = $mdDialog.confirm()
      .title('Are You Sure you Want to delete?')
      .targetEvent(id)
      .ok('Okay!')
      .cancel('Cancel');
       $mdDialog.show(confirm).then(function() {

         $scope.id = id;
         console.log($scope.id);
         $http.delete('/threat/' + $scope.id ,
         {headers: {Authorization: 'Bearer '+auth.getToken()}});
         
         for(var t = 0; t < $scope.threats.length; t++)
               {
                  if($scope.id == $scope.threats[t]._id)
                  {
                     $scope.threats.pop($scope.threats[t]);
                  }
               }


        
     });

      }
      	
})