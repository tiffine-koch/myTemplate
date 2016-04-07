'use strict';

var app = angular.module('myApp');

app.controller('profileCtrl', function($scope, $http, UserService, BeerService, $rootScope) {

  var allBeers = [];

  BeerService.getRandom()
  .then(function(res) {
    $scope.beer = res.data;
    var beer = $scope.beer;
    allBeers.push(beer);
  }, function(err) {
    console.err('err:', err);
  })

  var user = $rootScope.user;

  $scope.getRandom = function() {
    console.log('random click');
    BeerService.getRandom()
    .then(function(res) {
      $scope.beer = res.data;
      var beer = $scope.beer;
      allBeers.push(beer);
    }, function(err) {
      console.err('err:', err);
    })
  }

  $scope.getAll = function() {
    console.log('random click');
    BeerService.getAll()
    .then(function(res) {
      $scope.beerArray = res.data;
      var beers = $scope.beer;
    }, function(err) {
      console.err('err:', err);
    })
  }

  $scope.addBeer = function() {
    console.log('click');
    var beer = {name: $scope.beer.data.name, description: $scope.beer.data.description, comment: $scope.beer.comment, sampled: $scope.beer.true};
    console.log('beer', beer);
    BeerService.create(beer)
    .then(function(response){
        swal("Keep drinking!");
      }, function(err){
        console.error(err);
      })
    }

  $scope.getAll = function() {
    BeerService.getAll()
    .then(function(res) {
      $scope.beers = res.data;
      var beers = $scope.beers;
      console.log('res:', res);
    }, function(err) {
      console.err('err:', err);
    })
  };
});
