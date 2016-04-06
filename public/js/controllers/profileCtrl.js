'use strict';

var app = angular.module('myApp');

app.controller('profileCtrl', function($scope, $http, UserService, BeerService) {
  console.log('profile');

  $scope.singleUser = function(user) {
    var id = user._id;
    UserService.getOne(id)
      .then(function(response){
        $rootScope.user = response.data;
        var user = $scope.user;
      }, function(error){
        console.log('error');
    });
  };

  $scope.showList = function() {

    BeerService.getAll()
    .then(function(res) {
      $rootScope.beers = res.data;
      console.log('res:', res);
    }, function(err) {
      console.err('err:', err);
    })
  };
});
