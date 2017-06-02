angular.module('llabsApp.mkt', ['jkAngularRatingStars'])

.controller('MktController', function($scope , $http) {

	$scope.p = {};
	$scope.c = {};
	$scope.s = {};
	$scope.w = {};
	$scope.cap = {};
	$scope.caps = [];
	$scope.strengths = [];
	$scope.weakness = [];
	$scope.compe = {};
	$scope.custs = [];
	$scope.competitors = [];
	$scope.bens = [];
	$scope.data = [];
	

	$http.get('/bens')
		.then(function(res){
			$scope.bens = res.data;
		});
	$http.get('/cust')
		.then(function(res){
			$scope.custs = res.data;
			console.log($scope.custs);
		});

		$http.get('/compe')
		.then(function(res){
			$scope.competitors = res.data;
		});

		$http.get('/caps')
		.then(function(res){
			$scope.caps = res.data;
		});


	$scope.addBen = function()
	{
		$scope.bens.push($scope.p);

		$http.post('/bens', $scope.p)
		.then(function(res){
			$scope.dar = res.data;
		});

		$scope.p = {};

	}
	
	$scope.del = function(id)
	{
		$scope.id = id;

		$http.delete('/bens/' + $scope.id)
		.then(function(res){
			$scope.dar = res.data;
		});

		$http.get('/bens')
		.then(function(res){
			$scope.bens = res.data;
		});


		$scope.p = {};

	}

	$scope.newCust = function()
	{
		$scope.custs.push($scope.c);
		$http.post('/cust', $scope.c)
		.then(function(res){
			$scope.dar = res.data;
		});

		$scope.c = {};

	}


	$scope.onItemRating = function(rating, desc , id){
      alert('On Rating: ' + rating + 'Benefit' + desc);

      $scope.in4 = {};

      $scope.in4.ben = desc;
      $scope.in4.rate = rating;
      $scope.in4.id = id;
      $scope.data.push($scope.in4);
      console.log($scope.data);

      $http.put('/cust', $scope.in4)
      .then(function(res){
      	$scope.resp = res.data;
      	console.log($scope.resp);
      });
    };

    $scope.remBen = function(id , ben , rate)
	{
		$scope.rem = {};
		$scope.rem.id = id;
		$scope.rem.ben = ben;
		$scope.rem.rate = rate;
        console.log($scope.rem);

		$http.put('/cust/ben/', $scope.rem)
		.then(function(res){
			
		});

		$http.get('/cust')
		.then(function(res){
			$scope.custs = res.data;
		});

		$scope.p = {};
	}


		$scope.addCompe = function()
		{
			$scope.competitors.push($scope.compe);
			$http.post('/compe', $scope.compe)
			.then(function(res){
				$scope.rd = res.data;
			})
		}

		$scope.addStr = function(id)
		{
			$scope.s.id = id;
			$scope.strengths.push($scope.s);
			console.log($scope.strengths)
			$http.put('/compe/strength', $scope.s)
			.then(function(res){
				$scope.rd = res.data;
				console.log($scope.rd);
			})
		}

		$scope.delStr = function(id, str)
		{
			$scope.delS = {};
			$scope.delS.id = id;
			$scope.delS.str = str;

			$http.put('/compe/del/str', $scope.delS)
			.then(function(res){
				$scope.rd = res.data;
				console.log($scope.rd);
			})

			$http.get('/compe')
		.then(function(res){
			$scope.competitors = res.data;
		});

		}

		$scope.addWeak = function(id)
		{
			$scope.w.id = id;
			$scope.weakness.push($scope.w);
			console.log($scope.weakness)
			$http.put('/compe/weak', $scope.w)
			.then(function(res){
				$scope.rd = res.data;
				console.log($scope.rd);
			})
			http.get('/compe')
		.then(function(res){
			$scope.competitors = res.data;
		});

			$scope.w = {};
		}

		$scope.addCap = function()
		{
			$scope.caps.push($scope.cap);
			$http.post('/caps', $scope.cap)
			.then(function(res){
				$scope.rd = res.data;
				console.log($scope.rd);
			})
			$http.get('/caps')
		.then(function(res){
			$scope.caps = res.data;
		});

			$scope.w = {};
		}

		$scope.delWeak = function(id, str)
		{
			$scope.delW = {};
			$scope.delW.id = id;
			$scope.delW.str = str;

			$http.put('/compe/del/weak', $scope.delW)
			.then(function(res){
				$scope.rd = res.data;
				console.log($scope.rd);
			})

			$http.get('/compe')
		    .then(function(res){
			$scope.competitors = res.data;
		});

		}

		$scope.delCap = function(id)
		{
			$scope.id = id;

			$http.delete('/caps/' + $scope.id)
			.then(function(res){
				$scope.dar = res.data;
			});

			$http.get('/caps')
			.then(function(res){
				$scope.caps = res.data;
			});

		}


	
})