'use strict';

var app = angular.module('myApp');

app.service('BeerService', function($http) {

  this.getAll = function() {
    return $http.get('/beers');
  };

  this.getRandom = function() {
    return $http.get('/beers/random');
  };

  this.create = function(beer) {
    return $http.post('/beers', beer);
  };

  this.update = function(beerId, updateObj) {
    return $http.put(`/beers/${beerId}`, updateObj);
  };

  this.toggleSampled = function(beerId) {
    return $http.put(`/beers/${beer._id}/sampled`);
  };

});
