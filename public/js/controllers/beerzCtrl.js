'use strict';

var app = angular.module('myApp');

app.controller('beerzCtrl', function($scope, $http, BeerService) {
  console.log('beerz');
  BeerService.getAll()
  .then(function(res) {
    $scope.beers = res.data;
    console.log('res:', res);
  }, function(err) {
    console.err('err:', err);
  })
  BeerService.getOne()
  .then(function(res) {
    $scope.beers = res.data;
    console.log('res:', res);
  }, function(err) {
    console.err('err:', err);
  })

});
