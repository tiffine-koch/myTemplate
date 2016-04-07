'use strict';

var app = angular.module('myApp');

app.service('AuthService', function($http, $state, UserService) {

  this.register = function(user) {
    return $http.post('/users/register', user)
    .then(function(res) {
      console.log('service res:', res);
      UserService.set(res.data);
      console.log('service user:', user);
    })
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
      .then(function(res) {
        console.log('service res:', res);
        UserService.set(res.data);
        console.log('service user:', user);
      })
    };

  this.logout = function() {
    $http.delete('/users/logout')
    .then(function() {
      console.log('logged out');
      UserService.destroy();
      $state.go('home');
    });
  };

  this.init = function() {
    $http.get('/users/profile')
      .then(function(res) {
        UserService.set(res.data);
    })
  };
});
