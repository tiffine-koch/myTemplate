'use strict';

var app = angular.module('myApp');

app.controller('profileCtrl', function($scope, $http, UserService, BeerService, $rootScope) {
  console.log('profile');

  BeerService.getRandom()
  .then(function(res) {
    $scope.beer = res.data;
    var beer = $scope.beer;
    console.log('res:', res);
    console.log('beer', beer);
    console.log('beer.name', beer.data.name);
  }, function(err) {
    console.err('err:', err);
  })

  // var id = user._id;
  UserService.getOne()
    .then(function(response){
      $rootScope.user = response.data;
      console.log($rootScope.user);
      // var user = $rootScope.user;
    }, function(error){
      console.log('error');
  });

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
