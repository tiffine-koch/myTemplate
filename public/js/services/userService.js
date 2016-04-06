'use strict';

var app = angular.module('myApp');

app.service('UserService', function($http) {

  this.getAll = function() {
    return $http.get('/users');
  };

  this.getOne= function(id) {
    return $http.get(`/users/${id}`);
  };

  this.create = function(user) {
    return $http.post('/users', user);
  };

  this.update = function(beerId, updateObj) {
    return $http.put(`/users/${beerId}`, updateObj);
  };

  // this.toggleSampled = function(userId) {
  //   return $http.put(`/users/${beer._id}/sampled`);
  // };

  this.addBeer = function(userId, beerId) {
    return $http.put(`/users/${userId}/addBeer/${beerId}`);
  }
});
